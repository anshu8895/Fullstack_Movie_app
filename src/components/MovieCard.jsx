import PropTypes from 'prop-types';

// Safely build a poster URL: if path is already a full URL (OMDb), use it as-is.
// If it's a relative path (TMDB), prepend the CDN base.
const getPosterUrl = (path) => {
    if (!path) return './no-movie.png';
    if (path.startsWith('http')) return path; // already a full URL
    return `https://image.tmdb.org/t/p/w500${path}`;
};

const MovieCard = ({ movie, onSelectMovie }) => {
    const { title, vote_average, release_date, original_language, poster_path } = movie;

    return (
        <div className='movie-card' onClick={() => onSelectMovie(movie)}>
            <img src={getPosterUrl(poster_path)} alt={title} />

            <div className="mt-4">
                <h3>{title}</h3>

                <div className="content">
                    <div className="rating">
                        <img src="./star.svg" alt="" />
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>

                    <span>.</span>
                    <p className='lang'>{original_language}</p>
                    <span>.</span>
                    <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        title: PropTypes.string.isRequired,
        vote_average: PropTypes.number,
        release_date: PropTypes.string,
        original_language: PropTypes.string,
        poster_path: PropTypes.string,
    }).isRequired,
    onSelectMovie: PropTypes.func.isRequired,
};

export default MovieCard;
