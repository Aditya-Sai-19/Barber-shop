# PRO TOOLS | Cinematic E-Commerce Platform

A production-grade, Apple-quality e-commerce platform featuring a cinematic scrollytelling engine, built with Next.js 15, TypeScript, Tailwind v4, and Framer Motion.

## 🚀 Key Features

*   **Cinematic Scroll Engine**: High-performance canvas-based image sequence player with smart preloading, mobile fallback, and DPR support.
*   **Production Architecture**: Modular file structure with clean separation of concerns (`features`, `components/ui`, `app` route groups).
*   **Full Commerce Flow**:
    *   **Shop**: Filterable product grid (Category, Price - stub), Search.
    *   **Product**: Rich detail pages with galleries and specification lists.
    *   **Cart**: Slide-out drawer with persistent state (Zustand) and local storage.
    *   **Checkout**: Multi-step checkout form (Shipping -> Payment -> Success).
*   **Design System**: Reusable, accessible UI components (Button, Input, Slider, etc.) using Tailwind v4 variables.
*   **Responsive**: Fully optimized for Mobile, Tablet, and Desktop.

## 🛠️ Tech Stack

*   **Framework**: Next.js 15 (App Router)
*   **Language**: TypeScript (Strict Mode)
*   **Styling**: Tailwind CSS v4 + Design Tokens
*   **Animation**: Framer Motion
*   **State Management**: Zustand (Persisted)
*   **Icons**: Lucide React

## 📂 Project Structure

```text
app/
├── (marketing)/       # Landing page (Cinematic Hero)
├── (shop)/            # Shop routes (Catalog, Search)
├── product/[id]/      # Product Details
├── checkout/          # Checkout Flow
├── layout.tsx         # Root layout & providers
components/
├── ui/                # Core Design System (Button, Input...)
├── scroll/            # Scroll Engine Components
├── commerce/          # Commerce UI (HeroOverlay)
├── product/           # Product Cards & Displays
├── cart/              # Cart Drawer & Logic
features/
├── products/          # Product domains (Grid, Filters)
lib/                   # Utilities & Constants
store/                 # Global State (Zustand)
styles/                # Global CSS & Theme
```

## 🔧 Getting Started

1.  **Install Dependencies** (if not already):
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open**: `http://localhost:3000`

## 🎨 Customization

*   **Theme**: Edit `styles/globals.css` to update CSS variables for colors, fonts, and sizing.
*   **Products**: Update `lib/products.ts` to manage the catalog.
*   **Scroll Sequence**: Replace images in `public/Frames/` and update `lib/scroll-config.ts`.

## ⚠️ Notes

*   **Images**: The project relies on a sequence of 240+ frames in `public/Frames/` for the hero animation. Ensure these exist for the scroll engine to work.
*   **Checkout**: The payment processing is currently mocked for demonstration purposes.

---

Built by AntiGravity / Google Deepmind
