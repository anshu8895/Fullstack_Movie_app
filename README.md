# 🎬 Fullstack Movie App

A modern, full-stack movie discovery application built with React, Vite, Tailwind CSS, and Appwrite. Search for movies, view details, and save your favorites!

## ✨ Features

- 🔍 **Search Movies** - Search millions of movies from TMDB database
- 📊 **Trending Movies** - See what's trending with beautiful poster displays
- 💾 **Save Favorites** - Save your favorite movies to Appwrite database
- 🎯 **Movie Details** - View comprehensive movie information including ratings, cast, and synopsis
- 🌐 **ISP Bypass** - Appwrite proxy function to bypass ISP restrictions on TMDB API
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ⚡ **Fast & Modern** - Built with Vite for lightning-fast development and builds

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📚 Documentation

Complete documentation is available in the [`docs/`](./docs/) folder:

- **[Getting Started](./docs/START_HERE.md)** - Begin here!
- **[Quick Start Guide](./docs/QUICK_START_PROXY.md)** - 5-minute Appwrite proxy setup
- **[Setup Checklist](./docs/SETUP_CHECKLIST.md)** - Complete setup guide
- **[Testing Guide](./docs/TESTING_GUIDE.md)** - How to test the app
- **[Troubleshooting](./docs/DEPLOYMENT_TROUBLESHOOTING.md)** - Fix common issues

**[→ View All Documentation](./docs/README.md)**

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Appwrite (BaaS)
- **API**: TMDB API (via Appwrite proxy)
- **Deployment**: GitHub Pages

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_FUNCTION_URL=your_function_url
```

## 📦 Project Structure

```
├── docs/                      # Documentation files
├── public/                    # Static assets
├── src/
│   ├── components/           # React components
│   ├── appwrite.js          # Appwrite configuration
│   ├── tmdbAPI.js           # TMDB API helper with proxy
│   └── App.jsx              # Main app component
├── appwrite-functions/       # Appwrite proxy function
└── package.json
```

## 🎯 Key Features Explained

### ISP Bypass with Appwrite Proxy
Some ISPs block direct access to TMDB API. Our Appwrite proxy function acts as a middleware, making requests on your behalf. See [QUICK_START_PROXY.md](./docs/QUICK_START_PROXY.md) for setup.

### Trending Movies
Displays trending movies with:
- ✅ Poster images only (no poster = filtered out)
- ✅ Clickable cards that open detailed modal
- ✅ Hover effects and tooltips
- ✅ Responsive grid layout

### Movie Search & Details
- Real-time search with debouncing
- Comprehensive movie details modal
- Save/unsave functionality
- Error handling and loading states

## 🐛 Bug Fixes

This project includes fixes for 10+ critical bugs. See [BUG_FIXES.md](./docs/BUG_FIXES.md) for complete list.

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please read the documentation before making changes.

---

Built with ❤️ using React + Vite + Appwrite