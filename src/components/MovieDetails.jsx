import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const MovieDetails = ({ movie, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movie) return;
      
      setLoading(true);
      setError('');
      try {
        const response = await fetch(
          `${API_BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&append_to_response=credits,videos`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie?.id]);

  if (!movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="movie-details-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : movieDetails ? (
          <div className="movie-details-content">
            <div className="movie-poster">
              <img 
                src={movieDetails.poster_path 
                  ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` 
                  : './no-movie.png'} 
                alt={movieDetails.title} 
              />
            </div>
            
            <div className="movie-info">
              <h2>{movieDetails.title}</h2>
              {movieDetails.tagline && <p className="tagline">{movieDetails.tagline}</p>}
              
              <div className="meta-info">
                <span className="rating">
                  <img src="./star.svg" alt="Rating" />
                  {movieDetails.vote_average ? movieDetails.vote_average.toFixed(1) : 'N/A'}
                </span>
                <span className="year">{movieDetails.release_date?.split('-')[0] || 'N/A'}</span>
                <span className="runtime">{movieDetails.runtime ? `${movieDetails.runtime} min` : 'N/A'}</span>
              </div>
              
              <div className="genres">
                {movieDetails.genres?.map(genre => (
                  <span key={genre.id} className="genre">{genre.name}</span>
                ))}
              </div>
              
              <div className="overview">
                <h3>Overview</h3>
                <p>{movieDetails.overview}</p>
              </div>
              
              {movieDetails.credits?.cast?.length > 0 && (
                <div className="cast">
                  <h3>Cast</h3>
                  <div className="cast-list">
                    {movieDetails.credits.cast.slice(0, 5).map(actor => (
                      <div key={actor.id} className="cast-member">
                        <img 
                          src={actor.profile_path 
                            ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}` 
                            : './no-movie.png'} 
                          alt={actor.name} 
                        />
                        <p>{actor.name}</p>
                        <p className="character">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {movieDetails.videos?.results?.length > 0 && (
                <div className="trailers">
                  <h3>Trailers</h3>
                  <div className="trailer">
                    {movieDetails.videos.results.filter(video => video.type === "Trailer").slice(0, 1).map(video => (
                      <div key={video.id} className="trailer-container">
                        <iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title={video.name}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    poster_path: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default MovieDetails;