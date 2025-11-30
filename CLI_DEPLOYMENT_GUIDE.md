# 🚀 CLI Deployment Guide - Simplest Method

## ✅ Good News!

Your function already exists in Appwrite! 
- Function ID: `692ac1c900071ee30cda`
- Function Name: `tmdb-proxy`
- Environment Variable: Already set ✅

---

## 🎯 Easiest Solution: Use GitHub Deployment

Since your code is already committed to GitHub, let's use that:

### Step 1: Go to Appwrite Console

1. Open: https://cloud.appwrite.io
2. Go to your project: **Fullstack_Movie_app**
3. Click **Functions** → Click **tmdb-proxy**

### Step 2: Create GitHub Deployment

1. Click **"Deployments"** tab
2. Click **"Create deployment"** (pink/red button, top right)
3. Choose **"GitHub"** as the source
4. **Connect your GitHub** (if not already connected)
5. Select repository: **`Fullstack_Movie_app`**
6. Set the **Root directory**: `appwrite-functions/tmdb-proxy`
7. Click **"Create"** or **"Deploy"**

### Step 3: Wait for Build

- Deployment will start automatically
- Takes about 20-30 seconds
- Status will show "Building..." then "Active"

---

## 🎉 That's It!

The function will deploy automatically from your GitHub repo!

---

## ✅ Verify Deployment

1. Go to **"Executions"** tab
2. Click **"Execute now"** button
3. Use this test body:
```json
{
  "endpoint": "/search/movie",
  "params": {
    "query": "batman"
  }
}
```
4. Click **"Execute"**
5. Should return movie data ✅

---

## 🔄 Alternative: Manual .tar.gz Upload

If GitHub doesn't work, create a deployment package:

```bash
# Go to function directory
cd appwrite-functions/tmdb-proxy

# Create deployment archive
tar -czf deployment.tar.gz package.json src/

# Then upload this file in Appwrite Console:
# Deployments → Create deployment → Manual → Upload deployment.tar.gz
```

---

## 📝 Your Function is Ready!

Your function URL is already in your `.env`:
```
VITE_APPWRITE_FUNCTION_URL=https://692ac1c9002ff61030fa.fra.appwrite.run
```

**Just test your app now:**
```bash
npm run dev
```

Then search for a movie - it should work! 🎬
