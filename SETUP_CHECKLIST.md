# ✅ Appwrite Proxy Setup Checklist

Use this checklist to track your progress!

---

## 📋 Before You Start

- [ ] I have an Appwrite account (https://cloud.appwrite.io)
- [ ] I can login to Appwrite Console
- [ ] I have my project open in Appwrite
- [ ] I have 5-10 minutes available

---

## 🚀 Setup Steps

### Step 1: Create Function
- [ ] Clicked "Functions" in sidebar
- [ ] Clicked "Create Function"
- [ ] Named it "tmdb-proxy"
- [ ] Selected "Node.js 18.0" or higher as runtime
- [ ] Set "Execute Access" to "Any"
- [ ] Clicked "Create"

### Step 2: Add Environment Variable
- [ ] Went to "Settings" tab
- [ ] Found "Environment Variables" section
- [ ] Clicked "Add Variable"
- [ ] Added key: `TMDB_API_KEY`
- [ ] Added value: `38bd6d8c1feb7cb89f8242e799e838b4`
- [ ] Clicked "Create"

### Step 3: Add Code - package.json
- [ ] Went to "Source" tab
- [ ] Deleted any existing files
- [ ] Clicked "Add File"
- [ ] Named it `package.json`
- [ ] Copied content from `appwrite-functions/tmdb-proxy/package.json`
- [ ] Pasted into editor
- [ ] Saved

### Step 4: Add Code - src/main.js
- [ ] Clicked "Add Folder"
- [ ] Named it `src`
- [ ] Clicked inside `src` folder
- [ ] Clicked "Add File"
- [ ] Named it `main.js`
- [ ] Copied content from `appwrite-functions/tmdb-proxy/src/main.js`
- [ ] Pasted into editor
- [ ] Saved

### Step 5: Deploy
- [ ] Clicked "Deploy" button (top right)
- [ ] Waited for deployment to complete
- [ ] Saw "Deployment successful" message
- [ ] Green checkmark appeared

### Step 6: Get Function URL
- [ ] Went to "Settings" tab
- [ ] Scrolled to "Domains" section
- [ ] Copied the function URL

### Step 7: Update Local Project
- [ ] Opened `.env` file in project
- [ ] Added line: `VITE_APPWRITE_FUNCTION_URL=<copied-url>`
- [ ] Saved `.env` file

### Step 8: Test Locally
- [ ] Stopped dev server (Ctrl+C)
- [ ] Started dev server: `npm run dev`
- [ ] Opened app in browser
- [ ] Searched for a movie
- [ ] Movies loaded successfully
- [ ] Checked browser console (no errors)

### Step 9: Verify Proxy is Working
- [ ] Opened browser DevTools (F12)
- [ ] Went to "Network" tab
- [ ] Searched for a movie
- [ ] Saw requests going to `cloud.appwrite.io` (not `api.themoviedb.org`)

### Step 10: Check Appwrite Logs
- [ ] Went back to Appwrite Console
- [ ] Clicked on function
- [ ] Clicked "Executions" tab
- [ ] Saw execution records appearing
- [ ] All executions show "Success" status

---

## 🎯 Final Deployment

### Deploy to GitHub Pages
- [ ] Committed changes: `git add . && git commit -m "Add Appwrite proxy"`
- [ ] Pushed to GitHub: `git push`
- [ ] Deployed to GH Pages: `npm run deploy`
- [ ] Waited for deployment
- [ ] Visited live site
- [ ] Tested search functionality
- [ ] Everything works! 🎉

---

## ✅ Success Criteria

All these should be true:

- [ ] Function shows in Appwrite Console
- [ ] Environment variable is set in function
- [ ] Code is deployed (green checkmark)
- [ ] Function URL is in my `.env` file
- [ ] Local app runs without errors
- [ ] Searching for movies works
- [ ] Movie details modal opens
- [ ] Trending movies are clickable
- [ ] Browser console has no errors
- [ ] Appwrite Executions tab shows success
- [ ] Production site works (after deploying)

---

## 🆘 If Something Doesn't Work

### Function deployment failed
- [ ] Check that code was copied correctly
- [ ] Check for syntax errors in editor
- [ ] Try deploying again

### Movies not loading
- [ ] Check `.env` has function URL
- [ ] Check dev server was restarted
- [ ] Check browser console for errors
- [ ] Check Appwrite Executions for errors

### Still using direct API
- [ ] Verify `VITE_APPWRITE_FUNCTION_URL` in `.env`
- [ ] Verify dev server was restarted
- [ ] Check Network tab shows `cloud.appwrite.io`

### Function shows errors
- [ ] Check environment variable is set
- [ ] Check variable name is exactly `TMDB_API_KEY`
- [ ] Check variable value is correct
- [ ] Check Executions tab for specific error

---

## 📞 Getting Help

If you're stuck:

1. **Check the guides**:
   - QUICK_START_PROXY.md (simple)
   - APPWRITE_PROXY_SETUP.md (detailed)

2. **Check Appwrite logs**:
   - Functions > Your Function > Executions

3. **Check browser console**:
   - F12 > Console tab

4. **Verify environment variables**:
   - Appwrite: Function > Settings
   - Local: Check `.env` file

---

## 🎉 When Complete

Congratulations! You've successfully:

✅ Created an Appwrite serverless function
✅ Configured environment variables
✅ Deployed backend code
✅ Integrated frontend with backend
✅ Bypassed ISP blocking
✅ Deployed to production

**Your movie app now works everywhere!** 🌍🎬

---

**Print this checklist and tick items as you complete them!** ✓
