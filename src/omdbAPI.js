/**
 * OMDb API Client
 * Free alternative to TMDB - no ISP blocks, works globally
 * Get your free API key: http://www.omdbapi.com/apikey.aspx
 */

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const OMDB_BASE_URL = 'https://www.omdbapi.com';

// Check if API key is available
if (!OMDB_API_KEY) {
  console.warn('Warning: OMDb API key is missing. Please add VITE_OMDB_API_KEY to your .env file.');
  console.log('Get your free key at: http://www.omdbapi.com/apikey.aspx');
}

/**
 * Search for movies
 * @param {string} query - Search term
 * @returns {Promise<Array>} Array of movie results
 */
export const searchMovies = async (query) => {
  if (!OMDB_API_KEY) {
    throw new Error('OMDb API key is missing. Please check your .env file.');
  }

  if (!query || query.trim() === '') {
    return [];
  }

  try {
    const url = `${OMDB_BASE_URL}/?s=${encodeURIComponent(query)}&type=movie&apikey=${OMDB_API_KEY}`;
    console.log('Fetching from OMDb:', url.replace(OMDB_API_KEY, 'API_KEY_HIDDEN'));
    
    const response = await fetch(url);

    const data = await response.json();
    console.log('OMDb Response:', data);

    if (data.Response === 'False') {
      // No results found or error
      return [];
    }

    // Convert OMDb format to match existing app format
    return data.Search.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      poster_path: movie.Poster !== 'N/A' ? movie.Poster : null,
      release_date: movie.Year,
      vote_average: null, // OMDb doesn't provide rating in search results
      original_language: 'en', // OMDb doesn't provide language in search
    }));
  } catch (error) {
    console.error('OMDb search error:', error);
    throw new Error('Failed to search movies. Please try again.');
  }
};

/**
 * Discover/browse popular movies
 * Note: OMDb doesn't have a discover endpoint, so we'll search for popular terms
 * @returns {Promise<Array>} Array of movie results
 */
export const discoverMovies = async () => {
  // Since OMDb doesn't have a "discover" endpoint, we'll search for popular movies
  // You can customize this list based on what you want to show
  const popularSearchTerms = [
    'Marvel', 'Star Wars', 'Batman', 'Spider', 'Avengers',
    'Lord of the Rings', 'Harry Potter', 'Inception', 'Interstellar', 'Matrix'
  ];
  
  const randomTerm = popularSearchTerms[Math.floor(Math.random() * popularSearchTerms.length)];
  
  try {
    return await searchMovies(randomTerm);
  } catch (error) {
    console.error('OMDb discover error:', error);
    // Return empty array instead of throwing to prevent app crash
    return [];
  }
};

/**
 * Get detailed information about a movie
 * @param {string} imdbId - IMDb ID (e.g., 'tt1375666')
 * @returns {Promise<Object>} Movie details
 */
export const getMovieDetails = async (imdbId) => {
  if (!OMDB_API_KEY) {
    throw new Error('OMDb API key is missing. Please check your .env file.');
  }

  try {
    const response = await fetch(
      `${OMDB_BASE_URL}/?i=${imdbId}&plot=full&apikey=${OMDB_API_KEY}`
    );

    const movie = await response.json();

    if (movie.Response === 'False') {
      throw new Error(movie.Error || 'Movie not found');
    }

    // Convert OMDb format to match existing app format
    return {
      id: movie.imdbID,
      title: movie.Title,
      tagline: movie.Plot && movie.Plot.length > 100 ? movie.Plot.substring(0, 100) + '...' : null,
      overview: movie.Plot !== 'N/A' ? movie.Plot : 'No overview available.',
      poster_path: movie.Poster !== 'N/A' ? movie.Poster : null,
      backdrop_path: movie.Poster !== 'N/A' ? movie.Poster : null, // OMDb doesn't have backdrop
      release_date: movie.Released !== 'N/A' ? movie.Released : null,
      vote_average: movie.imdbRating !== 'N/A' ? parseFloat(movie.imdbRating) : null,
      vote_count: movie.imdbVotes !== 'N/A' ? parseInt(movie.imdbVotes.replace(/,/g, '')) : null,
      runtime: movie.Runtime !== 'N/A' ? parseInt(movie.Runtime) : null,
      
      // Parse genres
      genres: movie.Genre !== 'N/A' 
        ? movie.Genre.split(', ').map(name => ({ id: name, name }))
        : [],
      
      // Parse cast from Actors field
      credits: {
        cast: movie.Actors !== 'N/A'
          ? movie.Actors.split(', ').map((name, index) => ({
              id: index,
              name: name,
              character: 'Actor',
              profile_path: null // OMDb doesn't provide actor images
            }))
          : []
      },
      
      // Additional OMDb-specific data
      director: movie.Director !== 'N/A' ? movie.Director : null,
      writer: movie.Writer !== 'N/A' ? movie.Writer : null,
      awards: movie.Awards !== 'N/A' ? movie.Awards : null,
      country: movie.Country !== 'N/A' ? movie.Country : null,
      language: movie.Language !== 'N/A' ? movie.Language : null,
      production_companies: movie.Production !== 'N/A' 
        ? [{ id: 1, name: movie.Production }]
        : [],
      
      // Note: OMDb doesn't provide video/trailer info
      videos: {
        results: []
      }
    };
  } catch (error) {
    console.error('OMDb details error:', error);
    throw error;
  }
};

export default {
  searchMovies,
  discoverMovies,
  getMovieDetails
};
