# 🚀 Getting Started with VibeUp CMS

## Quick Start (One Command!)

```bash
npm run dev
```

That's it! Everything runs on **one port (3000)** with Next.js!

---

## ⚠️ IMPORTANT: Setup .env.local file!

### Step 1: Create .env.local

Copy the example file and create your environment file:

**Windows (PowerShell):**
```powershell
Copy-Item env.example .env.local
```

**Mac/Linux:**
```bash
cp env.example .env.local
```

Or manually create `.env.local` in the project root with:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Step 2: Get Your Gemini API Key

1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Step 3: Add Your API Key

Open `.env.local` and replace `your_gemini_api_key_here` with your actual API key:

```
GEMINI_API_KEY=AIzaSyC_your_actual_key_here_1234567890
```

**Save the file!**

---

## 🎯 Open http://localhost:3000

✨ AI Generator will work automatically!

---

## 🏗️ Architecture (Just Like Mito-Website!)

**Next.js App Router** - Everything on port 3000:
- ✅ Frontend + Backend unified
- ✅ API routes in `app/api/`
- ✅ No separate server needed
- ✅ Auto-loads `.env.local`
- ✅ Single `npm run dev` command

**API Routes:**
- `/api/health` - Health check
- `/api/generate-text` - AI article generation
- `/api/generate-image` - AI thumbnail generation
- `/api/posts` - Blog posts CRUD

---

## 🔧 Troubleshooting

### Issue: "Gemini API key not configured"

**Problem:** The API key is missing or invalid.

**Solution:**
1. Check `.env.local` exists in project root
2. Verify it contains `GEMINI_API_KEY=...`
3. Make sure there are no spaces around the `=` sign
4. Make sure the key has no quotes around it
5. Restart Next.js after creating/editing `.env.local`

**Correct format:**
```
GEMINI_API_KEY=AIzaSyC_your_key_here
```

**Incorrect formats:**
```
GEMINI_API_KEY = AIzaSyC_your_key_here  ❌ (spaces)
GEMINI_API_KEY="AIzaSyC_your_key_here" ❌ (quotes)
```

### Issue: Port 3000 is already in use

**Problem:** Another app is using port 3000.

**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001

# Then access: http://localhost:3001
```

### Issue: Module not found errors

**Problem:** Dependencies need to be installed.

**Solution:**
```bash
npm install
```

### Issue: Generated posts not saving

**Problem:** "Save to Library" fails.

**Solution:**
1. Check that `server/data/posts.json` exists
2. Check browser console and terminal for errors

**Manually create the file if needed:**
```bash
# PowerShell
New-Item -ItemType Directory -Path server/data -Force
Set-Content -Path server/data/posts.json -Value "[]"

# Mac/Linux
mkdir -p server/data
echo "[]" > server/data/posts.json
```

### Issue: Images not generating

**Problem:** Thumbnail generation fails or returns errors.

**Common causes & solutions:**
1. **API key issue** - Verify your Gemini API key is valid
2. **Safety filter** - Try refining your article topic to be more specific
3. **Network issue** - Check your internet connection
4. **Model availability** - Gemini 2.5 Flash Image may have temporary outages

**If images keep failing:**
- The app will continue without images
- You can add images manually after generation
- Check the terminal console for detailed error messages

### Issue: TypeScript errors

**Problem:** Type errors when running `npm run dev`.

**Solution:**
1. Make sure all dependencies are installed: `npm install`
2. Check `tsconfig.json` is configured for Next.js
3. Restart the dev server

### Issue: Need to reinstall dependencies

**Problem:** After the conversion, things aren't working.

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json  # Mac/Linux
# OR
Remove-Item -Recurse -Force node_modules, package-lock.json  # PowerShell

# Reinstall
npm install
```

---

## 📝 Usage Guide

### Generating Articles

1. Open http://localhost:3000
2. Click "AI Generator" in the sidebar
3. Enter your topic (50-500 characters)
4. Select a category
5. Click "Generate with AI"
6. Wait 20-40 seconds for generation
7. Review the generated article
8. Click "Save to Library" to store it
9. Or click "Edit" to make changes before saving

### Managing Posts

1. Click "Blog Posts" in the sidebar
2. Use search and filters to find posts
3. Click "View" to preview a post
4. Click "Edit" to modify a post
5. Click delete icon to remove a post

### Features

✅ AI-powered article generation (Gemini 2.0 Flash)
✅ AI-powered thumbnail generation (Gemini 2.5 Flash Image)
✅ JSON file-based storage (no database needed)
✅ Rich text editing
✅ Search and filter posts
✅ Category management
✅ Draft/Published status
✅ **Next.js architecture** - just like mito-website!

---

## 🆘 Still Having Issues?

1. Check the terminal console for detailed error messages
2. Check the browser console (F12) for frontend errors
3. Try deleting `node_modules` and `.next` and running `npm install` again
4. Make sure you're using Node.js v18 or higher
5. Restart the server (Ctrl+C and run `npm run dev` again)

**Check your Node.js version:**
```bash
node --version  # Should be v18 or higher
```

**Clean everything and start fresh:**
```bash
# Remove build artifacts
rm -rf .next node_modules package-lock.json

# Reinstall
npm install

# Start dev server
npm run dev
```

---

## ✨ What Changed from Vite?

We converted from **Vite + Express (2 ports)** to **Next.js (1 port)** to match mito-website exactly:

| Before (Vite + Express) | After (Next.js) |
|------------------------|-----------------|
| 2 servers (ports 3000 + 3001) | 1 server (port 3000) |
| `npm run dev:full` | `npm run dev` |
| Separate Express backend | Built-in API routes |
| Manual `.env` loading | Auto-loads `.env.local` |
| Vite proxy config | Direct API calls |

**Everything works the same, but simpler!** 🎉
