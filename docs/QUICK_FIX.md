# 🚨 QUICK FIX: Deployment Failed

## Your Error
```
Status: 🔴 failed
Logs: tar: Ignoring unknown extended header keyword
```

## The Fix (2 minutes)

### 1. Create proper tar.gz file (macOS-compatible)
```bash
cd /Users/anshumanpadhi/Documents/Fullstack_Movie_app/appwrite-functions
COPYFILE_DISABLE=1 tar --no-xattrs --exclude='node_modules' --exclude='.DS_Store' --exclude='.git' --exclude='.gitignore' -czf tmdb-proxy.tar.gz tmdb-proxy/
```

**Verify (CRITICAL - must show package.json!):**
```bash
# Check file size (should be ~3KB, not 2MB+)
ls -lh tmdb-proxy.tar.gz

# IMPORTANT: Verify package.json is included
tar -tzf tmdb-proxy.tar.gz | grep package.json
```
Should output: `tmdb-proxy/package.json` ✅

### 2. Upload in Appwrite
- Deployments tab → Create deployment
- Upload: `tmdb-proxy.tar.gz` (located in `appwrite-functions/` folder)
- Entrypoint: `src/main.js`
- Build commands: `npm install`
- Click Create

### 3. Wait & Activate
- Wait 30-60 seconds for build
- Status should turn green ✅
- Click "Activate" button

## ✅ Success Looks Like
```
Status: ✅ Active
Build duration: 10s
Runtime: Node-22
Source: Manual
```

## 📁 tar.gz File Location
The proper tar.gz file has been created here:
```
/Users/anshumanpadhi/Documents/Fullstack_Movie_app/appwrite-functions/tmdb-proxy.tar.gz
```

**File size**: ~3 KB ✅ (if it's 2+ MB, node_modules was included - recreate!)  
**Contains**:
- ✅ package.json
- ✅ src/main.js
- ✅ README.md
- ❌ NO node_modules (correct!)

## 🔍 Verify Before Upload
```bash
tar -tzf tmdb-proxy.tar.gz
```

Should show these files:
- `tmdb-proxy/package.json` ✅
- `tmdb-proxy/src/main.js` ✅
- `tmdb-proxy/README.md` ✅
- NO node_modules (will be installed during build) ✅

---

**Full guide**: See [DEPLOYMENT_TROUBLESHOOTING.md](./DEPLOYMENT_TROUBLESHOOTING.md)
