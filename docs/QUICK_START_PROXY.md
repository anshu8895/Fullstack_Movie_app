# 🎯 QUICK START: Deploy Appwrite Proxy in 5 Minutes

## ⚡ Super Fast Setup Guide

---

## Step 1️⃣: Login to Appwrite (30 seconds)

1. Go to: **https://cloud.appwrite.io**
2. Login with your account
3. Click on your project: **"Fullstack_Movie_app"**

---

## Step 2️⃣: Create Function (1 minute)

1. Click **"Functions"** in left sidebar
2. Click **"Create Function"** button (top right)
3. Fill in:
   - **Name**: `tmdb-proxy`
   - **Runtime**: Select `Node.js 18.0` or `Node.js 20.0`
   - **Execute Access**: Select `Any`
4. Click **"Create"** button

---

## Step 3️⃣: Add API Key (30 seconds)

1. In your new function, click **"Settings"** tab
2. Scroll down to **"Environment Variables"**
3. Click **"Add Variable"**
4. Enter:
   - **Key**: `TMDB_API_KEY`
   - **Value**: `38bd6d8c1feb7cb89f8242e799e838b4`
5. Click **"Create"**

---

## Step 4️⃣: Add Code (2 minutes)

### Option A: Upload Pre-built Archive (Easiest & Recommended)

1. Click **"Deployments"** tab (at the top)
2. Click **"Create deployment"** button (top right, pink/red button)
3. Choose **"Manual"** as deployment source
4. You'll see an upload interface

5. **Upload the deployment file**:
   - Click **"Browse"** or drag-and-drop area
   - Navigate to your project folder: `appwrite-functions/tmdb-proxy/`
   - Select the file: **`deployment.tar.gz`**
   - Click **"Open"** to upload

6. The file will upload automatically (takes 5-10 seconds)

### Option B: Using Manual Code Entry (Alternative)

If you don't have the .tar.gz file, you can manually create the files:

1. Click **"Deployments"** tab
2. Click **"Create deployment"** → Choose **"Manual"**
3. In the code editor:
   
   **First, create `package.json`:**
   - Rename from `index.js` to `package.json`
   - Paste:
   ```json
   {
     "name": "tmdb-proxy",
     "version": "1.0.0",
     "description": "TMDB API proxy",
     "main": "src/main.js",
     "type": "module",
     "dependencies": {
       "node-fetch": "^3.3.2"
     }
   }
   ```
   
   **Then, add `src/main.js`:**
   - Click **"+ Add file"**
   - Name it: `src/main.js`
   - Copy all code from `appwrite-functions/tmdb-proxy/src/main.js`
   - Paste into editor

### Option C: Using GitHub (Advanced)

1. Click **"Deployments"** tab
2. Click **"Create deployment"** → Choose **"GitHub"**
3. Connect your repository
4. Set path to: `appwrite-functions/tmdb-proxy`
5. Click deploy

---

## Step 5️⃣: Deploy (1 minute)

1. After adding both files, click **"Create"** or **"Deploy"** button (bottom of the editor)
2. Wait for deployment (you'll see a progress indicator)
3. Deployment status will change to **"Active"** with a green dot
4. This takes about 10-20 seconds

---

## Step 6️⃣: Get Function URL (30 seconds)

1. Go to **"Domains"** tab (at the top)
2. You'll see a domain like: `[FUNCTION_ID].[REGION].appwrite.run`
3. Copy the **full URL** (example: `692ac1c9002ff61030fa.fra.appwrite.run`)
4. Add `https://` before it if needed

---

## Step 7️⃣: Update Your .env File (30 seconds)

1. Open your project's `.env` file
2. Add this line (replace with your actual URL):
```env
VITE_APPWRITE_FUNCTION_URL=https://cloud.appwrite.io/v1/functions/[YOUR_FUNCTION_ID]/executions
```
3. Save the file

---

## Step 8️⃣: Test It! (30 seconds)

1. Restart your dev server:
```bash
npm run dev
```

2. Open your app in browser
3. Try searching for a movie
4. **It works!** 🎉

---

## ✅ That's It!

Your app now bypasses ISP blocking and works everywhere!

---

## 🔍 How to Verify It's Working

### Check Browser Console:
- You should see network requests going to `cloud.appwrite.io` instead of `api.themoviedb.org`

### Check Appwrite Console:
1. Go to your function
2. Click **"Executions"** tab
3. You should see executions appearing when you search

---

## 🆘 Troubleshooting

### "Failed to fetch movies"
- Make sure function URL is correct in `.env`
- Make sure you restarted dev server after adding URL
- Check function Executions tab for errors

### Still using direct API
- Verify `.env` file has `VITE_APPWRITE_FUNCTION_URL`
- Restart dev server: `Ctrl+C` then `npm run dev`
- Clear browser cache

### Function shows errors
- Check that `TMDB_API_KEY` environment variable is set in function
- Check that code was copied correctly
- Check Executions tab for specific error messages

---

## 📱 Deploy to Production

Once it works locally:

```bash
# Commit changes
git add .
git commit -m "Add Appwrite proxy for ISP bypass"
git push

# Deploy to GitHub Pages
npm run deploy
```

---

## 🎊 Success Indicators

✅ Dev server runs without errors
✅ Searching for movies works
✅ Movie details load properly
✅ Trending movies show up
✅ No console errors

---

**Total Time: ~5 minutes** ⚡

You're all set! Your movie app now works regardless of ISP blocking! 🚀
