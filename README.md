# WanderLoom ✈️
### Weave Your Perfect Journey: Bespoke Travel Discovery & Itinerary Designer

WanderLoom is a premium, client-side single-page application (SPA) travel discovery engine. It helps explorers discover destinations matching their preferences, plan daily itineraries, calculate realistic budgets using researched typical costs, generate climate-smart checklists, and compare travel options side-by-side.

---

## 🌟 Key Features

* **Interactive Discovery Engine**: Filter, search, and sort curated destinations by trip type (adventure, culture, beach, nature, city), climate (tropical, temperate, cold, desert), budget, and activity level.
* **Match Preference Quiz**: Answer a series of curated questions to calculate custom match percentages for all 12 destinations in the database.
* **Researched Travel Budgets**: Beyond basic tiers (`$`, `$$`, `$$$`), each destination features a typical cost profile (Flights, Lodging, Food/Transit, Activities).
* **Interactive Travel Dashboard**:
  * **Smart Packing List**: Automatically compiles packing items based on duration and the destination's climate profile.
  * **Dynamic Budget Calculator**: Pre-populates with researched templates and displays cost-allocation breakdowns (with interactive percentage indicators).
* **Side-by-Side Comparison**: Select and compare up to 3 destinations side-by-side including detailed cost breakdowns, climate, highlights, and ratings.
* **Interactive Itinerary Designer**: Explore day-by-day recommendations, schedule custom activities, and export custom itineraries to plain-text files.

---

## 🛠️ Technology Stack & Architecture

Built with a modern, vanilla frontend stack prioritizing high performance, seamless transitions, and rich visual aesthetics:

1. **Markup & Structure**: Semantic HTML5 elements and accessibility-oriented attributes (`aria-` compliance, relative headings).
2. **Styling & Motion**: Pure CSS with glassmorphism presets, custom scrollbars, and dynamic CSS view transitions for smooth page loads.
3. **Logic & Routing**: Clean ES Modules architecture coordinates views, local storage caching, and lightweight routing without heavy dependencies.

### Project Layout

* [index.html](file:///Users/nikhilkumar/Documents/Travel-Guide/index.html) — Core container and layout shell.
* [index.css](file:///Users/nikhilkumar/Documents/Travel-Guide/index.css) — Global stylesheets, responsive grids, and variables.
* [destinations.js](file:///Users/nikhilkumar/Documents/Travel-Guide/destinations.js) — The curated database of destinations.
* [app.js](file:///Users/nikhilkumar/Documents/Travel-Guide/app.js) — Routing coordinator and global state synchronization.
* [components/](file:///Users/nikhilkumar/Documents/Travel-Guide/components/)
  * [details.js](file:///Users/nikhilkumar/Documents/Travel-Guide/components/details.js) — Immersive cover, reviews, and timeline designer.
  * [planner.js](file:///Users/nikhilkumar/Documents/Travel-Guide/components/planner.js) — Budget calculator and checklist compiler.
  * [compare.js](file:///Users/nikhilkumar/Documents/Travel-Guide/components/compare.js) — Side-by-side matrix rendering.
  * [quiz.js](file:///Users/nikhilkumar/Documents/Travel-Guide/components/quiz.js) — Interactive preference matchmaking logic.
  * [about.js](file:///Users/nikhilkumar/Documents/Travel-Guide/components/about.js) / [contact.js](file:///Users/nikhilkumar/Documents/Travel-Guide/components/contact.js) — Support pages.

---

## 🚀 Running Locally

Because WanderLoom is structured around Native ES Modules, a local web server is required to bypass browser CORS policies.

### Option 1: Python HTTP Server (Built-in)
Run the following in your shell within the project directory:
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000`.

### Option 2: Live Server or static npm packages
If you have NodeJS installed, you can launch a hot-reloading server:
```bash
npx serve
```
