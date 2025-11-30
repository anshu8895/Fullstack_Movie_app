# 🔧 Deployment Troubleshooting Guide

## Issue: Deployment Status "Failed" ❌

### What You're Seeing

In Appwrite Console, under your function's Deployments tab:
```
Status: 🔴 failed
Build duration: 10s
```

Click on the deployment to see logs showing:
```
tar: Ignoring unknown extended header keyword 'LIBARCHIVE.xattr.com.apple.provenance'
```

---

## Why This Happens

**Root Cause**: macOS's default `tar` command includes extended file attributes (metadata) that Linux servers (like Appwrite) can't process.

**Technical Details**:
- macOS stores extra metadata (extended attributes, resource forks)
- When you run `tar -czf file.tar.gz folder/`, it includes this metadata
- Appwrite's Linux environment doesn't recognize these attributes
- Build fails with tar extraction errors

---

## ✅ Solution: Use ZIP Instead

ZIP format doesn't have this issue and is fully compatible with Appwrite.

### Step-by-Step Fix

1. **Navigate to your project**
   ```bash
   cd /Users/anshumanpadhi/Documents/Fullstack_Movie_app
   ```

2. **Go to functions directory**
   ```bash
   cd appwrite-functions
   ```

3. **Remove old tar.gz file (if exists)**
   ```bash
   rm tmdb-proxy.tar.gz
   ```

4. **Create clean ZIP file**
   ```bash
   zip -r tmdb-proxy.zip tmdb-proxy/ -x "*/node_modules/*" "*/.*"
   ```

   **What this does**:
   - `-r` = recursive (include all subdirectories)
   - `tmdb-proxy.zip` = output filename
   - `tmdb-proxy/` = folder to compress
   - `-x "*/node_modules/*"` = exclude node_modules (will be installed during build)
   - `-x "*/.*"` = exclude hidden files (.DS_Store, .git, etc.)

5. **Verify ZIP contents**
   ```bash
   unzip -l tmdb-proxy.zip
   ```

   **Expected output**:
   ```
   Archive:  tmdb-proxy.zip
     Length      Date    Time    Name
   ---------  ---------- -----   ----
           0  11-29-2025 15:00   tmdb-proxy/
        4567  11-29-2025 15:00   tmdb-proxy/package.json
         123  11-29-2025 15:00   tmdb-proxy/src/
        3456  11-29-2025 15:00   tmdb-proxy/src/main.js
        2345  11-29-2025 15:00   tmdb-proxy/README.md
   ```

   **✅ Good**: Has package.json and src/main.js  
   **❌ Bad**: Missing package.json or src/ folder

6. **Upload to Appwrite**
   - Go to your function in Appwrite Console
   - Click **Deployments** tab
   - Click **Create deployment**
   - Upload `tmdb-proxy.zip`
   - Set **Entrypoint**: `src/main.js`
   - Set **Build commands**: `npm install`
   - Click **Create**

7. **Wait for build** (30-60 seconds)

8. **Check status should be**: ✅ Active

9. **Click Activate** button

---

## Alternative: Fix TAR Command (Advanced)

If you prefer using tar.gz, use this macOS-compatible command:

```bash
cd appwrite-functions
COPYFILE_DISABLE=1 tar --no-xattrs -czf tmdb-proxy.tar.gz tmdb-proxy/
```

**What this does**:
- `COPYFILE_DISABLE=1` = Don't copy resource forks
- `--no-xattrs` = Don't include extended attributes
- Rest is standard tar compression

---

## Verification Steps

### After Upload, Check These:

1. **File uploaded successfully**
   - Size should be ~4-5 KB
   - Name should show in deployment form

2. **Build starts**
   - Status changes to "Building..."
   - Progress indicator appears

3. **Build completes**
   - Status: ✅ Active (green)
   - Build duration: ~10-60 seconds
   - No errors in logs

4. **Deployment logs look good**
   ```
   Extracting code...
   Installing dependencies...
   npm install
   added 15 packages
   Build successful!
   ```

5. **Activate button appears**
   - Click it to make this deployment active

---

## Common Mistakes

### ❌ Mistake 1: Uploading from wrong location
```bash
# Wrong - compressing from inside the folder
cd appwrite-functions/tmdb-proxy
zip -r ../tmdb-proxy.zip .

# Right - compressing the folder itself
cd appwrite-functions
zip -r tmdb-proxy.zip tmdb-proxy/
```

### ❌ Mistake 2: Including node_modules in ZIP
This makes the file huge and upload slow.
```bash
# Wrong
zip -r tmdb-proxy.zip tmdb-proxy/

# Right - exclude node_modules
zip -r tmdb-proxy.zip tmdb-proxy/ -x "*/node_modules/*"
```

### ❌ Mistake 3: Wrong entrypoint
```
Wrong: main.js
Right: src/main.js
```

### ❌ Mistake 4: Forgetting build commands
```
Empty = Won't install dependencies
Correct = npm install
```

---

## Still Failing? Check These

### 1. Package.json Issues

**Check if package.json exists:**
```bash
cat appwrite-functions/tmdb-proxy/package.json
```

Should see:
```json
{
  "name": "tmdb-proxy",
  "version": "1.0.0",
  "type": "module",
  ...
}
```

**Important**: Must have `"type": "module"` for ES6 imports!

### 2. Main.js Issues

**Check if main.js exists:**
```bash
cat appwrite-functions/tmdb-proxy/src/main.js
```

Should start with:
```javascript
export default async ({ req, res, log, error }) => {
```

### 3. File Permissions

Sometimes file permissions cause issues:
```bash
chmod -R 755 appwrite-functions/tmdb-proxy/
```

### 4. Corrupted ZIP

Delete and recreate:
```bash
cd appwrite-functions
rm tmdb-proxy.zip
zip -r tmdb-proxy.zip tmdb-proxy/ -x "*/node_modules/*" "*/.*"
```

---

## Quick Fix Checklist

- [ ] Using ZIP format (not tar.gz)
- [ ] Created from `appwrite-functions/` directory
- [ ] Excluded node_modules in ZIP command
- [ ] ZIP contains `tmdb-proxy/package.json`
- [ ] ZIP contains `tmdb-proxy/src/main.js`
- [ ] Entrypoint set to `src/main.js`
- [ ] Build commands set to `npm install`
- [ ] Waited for build to complete
- [ ] Clicked "Activate" after build succeeds

---

## Success Indicators

You'll know it worked when:

✅ **Deployment status**: Active (green)  
✅ **Build duration**: 10-60 seconds  
✅ **Deployment logs**: "Build successful!"  
✅ **Runtime**: Node-22  
✅ **Source**: Manual  
✅ **Activate button**: Clicked and deployment is active  

---

## Next Steps After Successful Deployment

1. **Copy Function ID** from the top of the function page
2. **Add to .env**:
   ```bash
   echo "VITE_TMDB_PROXY_FUNCTION_ID=your_function_id_here" >> .env
   ```
3. **Restart dev server**:
   ```bash
   npm run dev
   ```
4. **Test in browser** - movies should load without VPN!

---

## Need More Help?

1. **Check deployment logs** in Appwrite Console
2. **Verify file structure**:
   ```bash
   tree appwrite-functions/tmdb-proxy/
   ```
   Should see:
   ```
   tmdb-proxy/
   ├── package.json
   ├── src/
   │   └── main.js
   └── README.md
   ```

3. **Contact support** with:
   - Screenshot of deployment logs
   - Output of `ls -la appwrite-functions/tmdb-proxy/`
   - Output of `unzip -l tmdb-proxy.zip`

---

**Bottom Line**: Use ZIP format on macOS, and your deployment will succeed! 🎉
