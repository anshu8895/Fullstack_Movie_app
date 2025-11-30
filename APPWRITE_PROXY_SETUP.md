# 🚀 Appwrite TMDB Proxy Setup Guide

This guide will help you set up an Appwrite function to proxy TMDB API requests, bypassing ISP blocking.

---

## 📋 Prerequisites

- Appwrite account (https://cloud.appwrite.io)
- Appwrite CLI installed (optional, for command-line deployment)
- Your TMDB API Key: `38bd6d8c1feb7cb89f8242e799e838b4`

---

## 🎯 Step 1: Create Appwrite Function

### Option A: Using Appwrite Console (Recommended)

1. **Login to Appwrite Console**
   - Go to https://cloud.appwrite.io
   - Login to your account
   - Select your project

2. **Create New Function**
   - Click on "Functions" in the left sidebar
   - Click "Create Function" button
   - Choose "Create from scratch"
   
3. **Configure Function**
   - **Name**: `tmdb-proxy`
   - **Runtime**: Select `Node.js 18.0` or higher
   - **Execute Access**: Set to `Any` (to allow requests from your frontend)
   - **Events**: Leave empty
   - **Schedule**: Leave empty
   - **Timeout**: 15 seconds (default is fine)
   
4. **Click "Create"**

---

## 🔧 Step 2: Add Environment Variable

1. In your function, go to "Settings" tab
2. Scroll to "Environment Variables" section
3. Click "Add Variable"
4. Add the following:
   - **Key**: `TMDB_API_KEY`
   - **Value**: `38bd6d8c1feb7cb89f8242e799e838b4`
5. Click "Create"

---

## 📦 Step 3: Deploy Function Code

### Method 1: Using Appwrite Console (Easiest)

1. **Go to "Source" tab** in your function
2. **Create file structure**:
   - Delete any existing files
   - Create `package.json`
   - Create folder `src`
   - Inside `src`, create `main.js`

3. **Copy package.json content**:
```json
{
  "name": "tmdb-proxy",
  "version": "1.0.0",
  "description": "TMDB API proxy to bypass ISP blocking",
  "main": "src/main.js",
  "type": "module",
  "scripts": {
    "test": "echo \"No tests\" && exit 0"
  },
  "dependencies": {
    "node-fetch": "^3.3.2"
  }
}
```

4. **Copy src/main.js content** (see file in `appwrite-functions/tmdb-proxy/src/main.js`)

5. **Click "Deploy"** button at the top

6. **Wait for deployment** (should take 30-60 seconds)

### Method 2: Using Appwrite CLI

```bash
# Install Appwrite CLI (if not already installed)
npm install -g appwrite-cli

# Login to Appwrite
appwrite login

# Deploy the function
cd appwrite-functions/tmdb-proxy
appwrite functions deploy --function-id <YOUR_FUNCTION_ID>
```

---

## 🌐 Step 4: Get Function URL

1. After deployment, go to "Settings" tab
2. Scroll to "Domains" section
3. Copy the function URL (it will look like):
   ```
   https://cloud.appwrite.io/v1/functions/[FUNCTION_ID]/executions
   ```
4. You can also create a custom domain if you want

---

## ⚙️ Step 5: Configure Frontend

1. **Add the function URL to your `.env` file**:
```env
VITE_APPWRITE_FUNCTION_URL=https://cloud.appwrite.io/v1/functions/[YOUR_FUNCTION_ID]/executions
```

2. **Enable proxy mode** (already done in `src/tmdbAPI.js`):
   - The `USE_PROXY` flag is set to `true`
   - If `VITE_APPWRITE_FUNCTION_URL` is set, it will use the proxy
   - Otherwise, it falls back to direct TMDB API calls

---

## 🧪 Step 6: Test the Proxy

### Test from Appwrite Console

1. Go to your function > "Execute" tab
2. Click "Execute Now"
3. Use this test body:
```json
{
  "endpoint": "/search/movie",
  "params": {
    "query": "spider-man"
  }
}
```
4. Click "Execute"
5. You should see a successful response with movie data

### Test from Your App

1. Make sure your `.env` file has the function URL
2. Run your app: `npm run dev`
3. Search for a movie
4. Check the browser console - you should see proxy requests working

---

## 🔍 Troubleshooting

### Function Returns Error

**Check:**
- Environment variable `TMDB_API_KEY` is set correctly
- Function has "Execute Access" set to "Any"
- Function deployment was successful (check Executions tab for errors)

### Frontend Still Uses Direct API

**Check:**
- `.env` file has `VITE_APPWRITE_FUNCTION_URL` set
- Restart dev server after adding env variable
- Check browser console for proxy errors

### CORS Errors

**Solution:**
- The function already includes CORS headers
- Make sure you're using POST method (not GET)
- Check that the function URL is correct

---

## 📊 How It Works

```
User Browser
    ↓ (1) Search request
Frontend App (React)
    ↓ (2) POST to Appwrite Function
Appwrite Function (Node.js)
    ↓ (3) Fetch from TMDB API
TMDB API
    ↓ (4) Return data
Appwrite Function
    ↓ (5) Return data to frontend
Frontend App
    ↓ (6) Display movies
User Browser
```

**Benefits:**
- ✅ Bypasses ISP blocking (requests come from Appwrite servers)
- ✅ Hides API key from frontend
- ✅ Automatic fallback to direct API if proxy fails
- ✅ Works in all regions

---

## 🎯 Quick Reference

### API Request Format

```javascript
// Search movies
POST https://cloud.appwrite.io/v1/functions/[FUNCTION_ID]/executions
Content-Type: application/json

{
  "endpoint": "/search/movie",
  "params": {
    "query": "batman"
  }
}

// Discover movies
{
  "endpoint": "/discover/movie",
  "params": {
    "sort_by": "popularity.desc"
  }
}

// Movie details
{
  "endpoint": "/movie/550",
  "params": {
    "append_to_response": "credits,videos"
  }
}
```

### Response Format

```json
{
  "success": true,
  "data": {
    // TMDB API response
  }
}
```

---

## 🚀 Next Steps

1. ✅ Deploy the Appwrite function
2. ✅ Add function URL to `.env`
3. ✅ Test the app
4. ✅ Deploy to GitHub Pages

Your app will now work even if TMDB is blocked by your ISP! 🎉

---

## 💡 Tips

- The proxy automatically falls back to direct API if it fails
- You can toggle proxy mode by changing `USE_PROXY` in `src/tmdbAPI.js`
- Monitor function executions in Appwrite Console > Functions > Executions
- Check logs for debugging in the Executions tab

---

Need help? Check the Appwrite documentation: https://appwrite.io/docs/functions
