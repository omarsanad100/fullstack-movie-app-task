# 🎬 Favorite Movie App – Tech Stack Overview

A responsive and dynamic Movie App where users can browse popular movies, search by title, and save favorites to their personal Watchlist. Built with React, TypeScript, and TMDb API integration.

---

## 🧰 Core Technologies

- **Framework:** React (with Vite)
- **Language:** TypeScript
- **Styling:** TailwindCSS + Shadcn UI
- **API Integration:** TMDb (The Movie Database) API && React Query
- **State Management:** React Hooks

---

## 🧩 App Structure

### 1. Frontend

- Built with **React Functional Components**
- Styled using **TailwindCSS** and **Shadcn UI**
- Main Pages:
  - Movie Details
- Reusable components:
  - `<MovieCard />`
  - `<Navbar />`
  - `<SearchBar />`
  - `<WatchlistItem />`

### 2. API & Logic

- Movie details fetched dynamically
- Watchlist stored per user (can be extended to backend or local storage)
- Conditional rendering based on auth state
- Loading and error states handled gracefully

---

## ✅ Key Features

- 📝 **Watchlist**: Save and manage your favorite movies
- ⚡ **Optimized UX**: Smooth transitions, loading skeletons, and fallback UIs
- 📱 **Responsive Design**: Mobile-first, works on all screen sizes
