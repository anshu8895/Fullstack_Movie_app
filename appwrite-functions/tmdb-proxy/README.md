# TMDB Proxy Function

This Appwrite function acts as a proxy for TMDB API requests to bypass ISP blocking.

## Setup

1. Create a new function in your Appwrite console
2. Set the runtime to Node.js 18.0+
3. Add environment variable: `TMDB_API_KEY` with your TMDB API key
4. Deploy this function
5. Enable HTTP requests and copy the function URL

## Environment Variables

- `TMDB_API_KEY`: Your TMDB API key (38bd6d8c1feb7cb89f8242e799e838b4)

## Request Format

```json
{
  "endpoint": "/search/movie",
  "params": {
    "query": "spider-man"
  }
}
```

## Response Format

```json
{
  "success": true,
  "data": {
    // TMDB API response
  }
}
```
