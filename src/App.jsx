import { useEffect, useState } from 'react';
import './App.css'; // Add this import for the CSS styles
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import Footer from './components/Footer';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Check if API key is available
if (!API_KEY) {
  console.warn('Warning: TMDB API key is missing. Please check your .env file.');
}

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const handleTrendingMovieClick = async (trendingMovie) => {
    // Fetch full movie details from TMDB using the movie_id
    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/${trendingMovie.movie_id}?api_key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      
      const movieData = await response.json();
      handleSelectMovie(movieData);
    } catch (error) {
      console.error('Error fetching trending movie details:', error);
      // Fallback: create a basic movie object from trending data
      handleSelectMovie({
        id: trendingMovie.movie_id,
        title: trendingMovie.title,
        poster_path: trendingMovie.poster_url?.replace('https://image.tmdb.org/t/p/w500', ''),
      });
    }
  };

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    // Check if API key is available
    if (!API_KEY) {
      setErrorMessage('API key is missing. Please check your .env file.');
      setIsLoading(false);
      return;
    }

    try {
      // Append api_key as a query parameter instead of using Authorization header
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}` 
        : `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
      
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Error fetching movies: ${data.status_message || response.status}`);
      }

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Error fetching movies');
        setMoviesList([]);
        return;
      }

      setMoviesList(data.results || []);

      if (query && data.results && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies || []);
    } catch (error) {
      console.error(`Error loading trending movies: ${error}`);
      setTrendingMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="" />
          <h1>Find <span className='text-gradient'>Movies</span> You&apos;ll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies && trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li 
                  key={movie.$id} 
                  onClick={() => handleTrendingMovieClick(movie)}
                  style={{ cursor: 'pointer' }}
                  title={`Click to see details: ${movie.title || 'Movie'}`}
                >
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {moviesList.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onSelectMovie={handleSelectMovie}
                />
              ))}
            </ul>
          )}
        </section>
      </div>

      {selectedMovie && (
        <MovieDetails 
          movie={selectedMovie}
          onClose={handleCloseModal}
        />
      )}
      
      <Footer />
    </main>
  );
};

export default App;
