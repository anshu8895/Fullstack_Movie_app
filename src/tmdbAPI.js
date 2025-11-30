// TMDB API proxy configuration
const USE_PROXY = true; // Set to true to use Appwrite proxy, false for direct TMDB calls

// Your Appwrite function URL (you'll need to update this after deploying the function)
// Get this from: Appwrite Console > Functions > tmdb-proxy > Settings > Domains
const APPWRITE_FUNCTION_URL = import.meta.env.VITE_APPWRITE_FUNCTION_URL || '';

const DIRECT_API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

/**
 * Fetch data from TMDB API through Appwrite proxy or directly
 * @param {string} endpoint - TMDB API endpoint (e.g., '/search/movie')
 * @param {object} params - Query parameters (e.g., {query: 'spider-man'})
 * @returns {Promise<object>} - API response data
 */
export const fetchFromTMDB = async (endpoint, params = {}) => {
  if (USE_PROXY && APPWRITE_FUNCTION_URL) {
    // Use Appwrite proxy
    try {
      const response = await fetch(APPWRITE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint,
          params
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Proxy request failed');
      }

      return result.data;
    } catch (error) {
      console.error('Proxy error, falling back to direct API:', error);
      // Fallback to direct API if proxy fails
      return fetchDirect(endpoint, params);
    }
  } else {
    // Use direct TMDB API
    return fetchDirect(endpoint, params);
  }
};

/**
 * Direct fetch from TMDB API (fallback or when proxy is disabled)
 */
const fetchDirect = async (endpoint, params = {}) => {
  const urlParams = new URLSearchParams({
    api_key: API_KEY,
    ...params
  });

  const url = `${DIRECT_API_BASE_URL}${endpoint}?${urlParams}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

/**
 * Search for movies
 */
export const searchMovies = async (query) => {
  return fetchFromTMDB('/search/movie', { query });
};

/**
 * Discover popular movies
 */
export const discoverMovies = async () => {
  return fetchFromTMDB('/discover/movie', { sort_by: 'popularity.desc' });
};

/**
 * Get movie details by ID
 */
export const getMovieDetails = async (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}`, { append_to_response: 'credits,videos' });
};
