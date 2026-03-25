import fetch from 'node-fetch';

// Shared CORS headers applied to every response
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Appwrite-Project, X-Appwrite-Key',
};

export default async ({ req, res, log, error }) => {
  // Handle CORS preflight — must be 204 with empty body, NOT JSON
  if (req.method === 'OPTIONS') {
    return res.empty
      ? res.empty(corsHeaders)                          // Appwrite SDK ≥ 4 provides res.empty()
      : res.send('', 204, corsHeaders);                 // fallback for older runtimes
  }

  try {
    // Get TMDB API key from environment variable
    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    if (!TMDB_API_KEY) {
      error('TMDB_API_KEY is not set in environment variables');
      return res.json({
        success: false,
        error: 'TMDB API key not configured'
      }, 500, corsHeaders);
    }

    // Parse the request body to get the endpoint and query params
    const body = req.bodyText ? JSON.parse(req.bodyText) : {};
    const { endpoint, params = {} } = body;

    if (!endpoint) {
      return res.json({
        success: false,
        error: 'Endpoint is required'
      }, 400, corsHeaders);
    }

    // Build the TMDB API URL
    const baseUrl = 'https://api.themoviedb.org/3';
    const urlParams = new URLSearchParams({
      api_key: TMDB_API_KEY,
      ...params
    });

    const tmdbUrl = `${baseUrl}${endpoint}?${urlParams}`;

    log(`Fetching: ${tmdbUrl.replace(TMDB_API_KEY, 'API_KEY_HIDDEN')}`);

    // Make request to TMDB
    const tmdbResponse = await fetch(tmdbUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    const data = await tmdbResponse.json();

    if (!tmdbResponse.ok) {
      error(`TMDB API error: ${tmdbResponse.status}`);
      return res.json({
        success: false,
        error: data.status_message || 'TMDB API error',
        statusCode: tmdbResponse.status
      }, tmdbResponse.status, corsHeaders);
    }

    // Return successful response
    return res.json({
      success: true,
      data: data
    }, 200, corsHeaders);

  } catch (err) {
    error(`Error in proxy function: ${err.message}`);
    return res.json({
      success: false,
      error: err.message
    }, 500, corsHeaders);
  }
};
