import { destinations } from './destinations.js';
import { initQuizView } from './components/quiz.js';
import { initDetailsView } from './components/details.js';
import { initCompareView } from './components/compare.js';
import { initPlannerView } from './components/planner.js';
import { initAboutView } from './components/about.js';
import { initContactView } from './components/contact.js';

// Global Application State
export const state = {
  wishlist: new Set(JSON.parse(localStorage.getItem('wl-wishlist') || '[]')),
  compareList: new Set(JSON.parse(localStorage.getItem('wl-compare') || '[]')),
  quizResults: JSON.parse(localStorage.getItem('wl-quiz-results') || 'null'), // Format: { scores: { id: percentage } }
  activeFilters: {
    search: '',
    category: 'all',
    budget: 'all',
    climate: 'all',
    activityLevel: 'all'
  }
};

// Toast notification helper
export function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Global Wishlist Sync Functions
export function toggleWishlist(destId) {
  if (state.wishlist.has(destId)) {
    state.wishlist.delete(destId);
    showToast(`Removed from Wishlist`);
  } else {
    state.wishlist.add(destId);
    showToast(`Added to Wishlist!`);
  }
  localStorage.setItem('wl-wishlist', JSON.stringify(Array.from(state.wishlist)));
  updateWishlistUI();
  // Re-render current view to sync heart states
  const hash = window.location.hash || '#home';
  if (hash.startsWith('#home') || hash === '') {
    renderHomeView();
  } else if (hash.startsWith('#destination/')) {
    const id = hash.split('/')[1];
    initDetailsView(id);
  }
}

function updateWishlistUI() {
  const countBadge = document.getElementById('wishlist-count');
  countBadge.textContent = state.wishlist.size;
  
  const container = document.getElementById('wishlist-items-container');
  if (state.wishlist.size === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        <p>No saved destinations yet. Explore and tap the heart icon to save your favorites!</p>
      </div>
    `;
    return;
  }

  const itemsHTML = Array.from(state.wishlist).map(id => {
    const dest = destinations.find(d => d.id === id);
    if (!dest) return '';
    return `
      <div class="wishlist-item" data-id="${dest.id}">
        <img class="wishlist-item-img" src="${dest.image}" alt="${dest.name}">
        <div class="wishlist-item-info">
          <h4>${dest.name}</h4>
          <p>${dest.country} &bull; ${dest.budget} &bull; ${dest.category}</p>
        </div>
        <button class="wishlist-item-remove" aria-label="Remove ${dest.name} from wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>
        </button>
      </div>
    `;
  }).join('');

  container.innerHTML = itemsHTML;

  // Add click events to remove buttons
  container.querySelectorAll('.wishlist-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const item = e.target.closest('.wishlist-item');
      toggleWishlist(item.dataset.id);
    });
  });

  // Add click to item to navigate directly
  container.querySelectorAll('.wishlist-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.wishlist-item-remove')) return;
      window.location.hash = `#destination/${item.dataset.id}`;
      toggleDrawer(false);
    });
  });
}

// Drawer Visibility Toggle
function toggleDrawer(open) {
  const drawer = document.getElementById('wishlist-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const toggleBtn = document.getElementById('wishlist-toggle');

  if (open) {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    // Accessibility: Focus close button inside drawer
    document.getElementById('wishlist-close').focus();
  } else {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.focus();
  }
}

// Global Compare Sync Functions
export function toggleCompare(destId) {
  if (state.compareList.has(destId)) {
    state.compareList.delete(destId);
    showToast(`Removed from comparison`);
  } else {
    if (state.compareList.size >= 3) {
      showToast(`You can compare a maximum of 3 destinations at once.`);
      // Sync checkbox back to unchecked in UI
      const cb = document.querySelector(`.compare-checkbox[data-id="${destId}"]`);
      if (cb) cb.checked = false;
      return;
    }
    state.compareList.add(destId);
    showToast(`Added to comparison!`);
  }
  localStorage.setItem('wl-compare', JSON.stringify(Array.from(state.compareList)));
}

// SPA Routing Engine
export function navigate(hash) {
  // Navigation active links highlight
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkHash = link.getAttribute('href');
    if (hash.startsWith(linkHash)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const viewport = document.getElementById('app-viewport');

  // Progressive Enhancement check for View Transitions
  if (!document.startViewTransition) {
    updateDOM(hash);
    viewport.focus();
  } else {
    document.startViewTransition(() => {
      updateDOM(hash);
      viewport.focus();
    });
  }
}

function updateDOM(hash) {
  const viewport = document.getElementById('app-viewport');
  
  if (hash === '' || hash === '#home') {
    renderHomeView();
  } else if (hash === '#about') {
    initAboutView();
  } else if (hash === '#contact') {
    initContactView();
  } else if (hash === '#quiz') {
    initQuizView();
  } else if (hash.startsWith('#destination/')) {
    const id = hash.split('/')[1];
    initDetailsView(id);
  } else if (hash === '#compare') {
    initCompareView();
  } else if (hash === '#planner') {
    initPlannerView();
  } else {
    // 404/Fallback to Home
    renderHomeView();
  }
}

// ----------------------------------------------------
// VIEW RENDERING: HOME / DISCOVERY VIEW
// ----------------------------------------------------
function renderHomeView() {
  const viewport = document.getElementById('app-viewport');
  
  viewport.innerHTML = `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title" id="home-heading">WanderLoom: <span>Weave Your Perfect Journey</span></h1>
        <p class="hero-tagline">
          Welcome to WanderLoom, a bespoke travel discovery engine. We help travelers explore curated destinations that align precisely with their unique taste, budget, and climate preferences. Through visual displays, detailed profiles, and real-time planning tools, WanderLoom guides you to make confident travel choices and structure memorable, stress-free adventures.
        </p>
        <a href="#quiz" class="primary-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.886L4.202 9l5.887 1.911L12 17l1.912-5.887L19.798 11l-5.887-1.912L12 3Z"/></svg>
          Take Preference Quiz
        </a>
      </div>
    </section>

    <!-- Featured Spotlights (Beach, Temple, Country) -->
    <section class="main-container" style="margin-bottom: 5rem;" aria-labelledby="featured-heading">
      <h2 id="featured-heading" style="font-family: var(--font-family-serif); font-size: 2.5rem; text-align: center; margin-bottom: 3rem;">
        Bespoke Featured Spotlights
      </h2>
      
      <div style="display: flex; flex-direction: column; gap: 4rem;">
        
        <!-- Beach Recommendation: Santorini -->
        <article class="featured-spotlight-card details-card-box">
          <div class="spotlight-text">
            <span class="details-hero-tag" style="background: var(--secondary); color: var(--text-dark);">Featured Beach Destination</span>
            <h3 style="font-family: var(--font-family-serif); font-size: 2rem; margin: 10px 0;">Santorini, Greece</h3>
            <p class="text-muted" style="line-height: 1.6; margin-bottom: 1.5rem;">
              Famed for its white-washed cliffside villages and spectacular caldera views, Santorini offers an exquisite island getaway. Experience black volcanic sand beaches, crystal clear catamaran cruises, and romantic sunsets melting into the Aegean Sea.
            </p>
            <a href="#destination/santorini" class="secondary-btn">Explore Santorini</a>
          </div>
          <div class="spotlight-images">
            <img src="assets/images/santorini.png" alt="Santorini Caldera Sunset" class="spotlight-img">
            <img src="assets/images/santorini_catamaran.png" alt="Santorini Catamaran Sailing" class="spotlight-img">
          </div>
        </article>

        <!-- Temple Recommendation: Kyoto -->
        <article class="featured-spotlight-card details-card-box">
          <div class="spotlight-text">
            <span class="details-hero-tag" style="background: var(--primary); color: var(--text-main);">Featured Temple Destination</span>
            <h3 style="font-family: var(--font-family-serif); font-size: 2rem; margin: 10px 0;">Kyoto, Japan</h3>
            <p class="text-muted" style="line-height: 1.6; margin-bottom: 1.5rem;">
              Immerse yourself in traditional Japanese culture. Kyoto is home to thousands of classical Buddhist temples, peaceful Zen gardens, historic geisha districts, and iconic paths lined with vermilion shrines and towering bamboo.
            </p>
            <a href="#destination/kyoto" class="secondary-btn">Explore Kyoto</a>
          </div>
          <div class="spotlight-images">
            <img src="assets/images/kyoto.png" alt="Kyoto Temple and Autumn Leaves" class="spotlight-img">
            <img src="assets/images/kyoto_gates.png" alt="Kyoto Torii Gates Pathway" class="spotlight-img">
          </div>
        </article>

        <!-- Country Recommendation: Iceland -->
        <article class="featured-spotlight-card details-card-box">
          <div class="spotlight-text">
            <span class="details-hero-tag" style="background: var(--accent-gold); color: var(--text-dark);">Featured Country Destination</span>
            <h3 style="font-family: var(--font-family-serif); font-size: 2rem; margin: 10px 0;">Reykjavik & Beyond, Iceland</h3>
            <p class="text-muted" style="line-height: 1.6; margin-bottom: 1.5rem;">
              Discover a land of fire and ice. Iceland hosts spectacular waterfalls, black sand beaches, and active geysers. Rejuvenate in mineral-rich geothermal spas and gaze up at the celestial green dances of the Northern Lights.
            </p>
            <a href="#destination/iceland" class="secondary-btn">Explore Iceland</a>
          </div>
          <div class="spotlight-images">
            <img src="assets/images/iceland.png" alt="Iceland Waterfall and Northern Lights" class="spotlight-img">
            <img src="assets/images/iceland_lagoon.png" alt="Iceland Blue Lagoon Geothermal Spa" class="spotlight-img">
          </div>
        </article>

      </div>
    </section>

    <!-- Interactive Filters Panel -->
    <section class="filters-panel" aria-label="Filters">
      <h2 style="font-family: var(--font-family-serif); font-size: 2rem; text-align: center; margin-bottom: 1.5rem;">Interactive Discovery Engine</h2>
      <div class="search-filters-grid">
        <div class="search-bar">
          <input type="text" id="search-input" placeholder="Search by name, country, or keyword..." value="${state.activeFilters.search}">
        </div>
        <div class="filter-group">
          <label for="filter-category">Type of Trip</label>
          <select id="filter-category">
            <option value="all" ${state.activeFilters.category === 'all' ? 'selected' : ''}>All Categories</option>
            <option value="Adventure" ${state.activeFilters.category === 'Adventure' ? 'selected' : ''}>Adventure</option>
            <option value="Culture" ${state.activeFilters.category === 'Culture' ? 'selected' : ''}>Culture</option>
            <option value="Beach" ${state.activeFilters.category === 'Beach' ? 'selected' : ''}>Beach</option>
            <option value="Nature" ${state.activeFilters.category === 'Nature' ? 'selected' : ''}>Nature</option>
            <option value="City" ${state.activeFilters.category === 'City' ? 'selected' : ''}>City</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="filter-budget">Budget</label>
          <select id="filter-budget">
            <option value="all" ${state.activeFilters.budget === 'all' ? 'selected' : ''}>Any Budget</option>
            <option value="$" ${state.activeFilters.budget === '$' ? 'selected' : ''}>$ Budget (Value)</option>
            <option value="$$" ${state.activeFilters.budget === '$$' ? 'selected' : ''}>$$ Budget (Moderate)</option>
            <option value="$$$" ${state.activeFilters.budget === '$$$' ? 'selected' : ''}>$$$ Budget (Premium)</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="filter-climate">Climate</label>
          <select id="filter-climate">
            <option value="all" ${state.activeFilters.climate === 'all' ? 'selected' : ''}>Any Climate</option>
            <option value="Tropical" ${state.activeFilters.climate === 'Tropical' ? 'selected' : ''}>Tropical & Warm</option>
            <option value="Temperate" ${state.activeFilters.climate === 'Temperate' ? 'selected' : ''}>Temperate & Mild</option>
            <option value="Cold" ${state.activeFilters.climate === 'Cold' ? 'selected' : ''}>Cool & Alpine</option>
            <option value="Desert" ${state.activeFilters.climate === 'Desert' ? 'selected' : ''}>Dry & Desert</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="filter-activity">Activity Level</label>
          <select id="filter-activity">
            <option value="all" ${state.activeFilters.activityLevel === 'all' ? 'selected' : ''}>Any Activity</option>
            <option value="Relaxed" ${state.activeFilters.activityLevel === 'Relaxed' ? 'selected' : ''}>Relaxed & Chill</option>
            <option value="Moderate" ${state.activeFilters.activityLevel === 'Moderate' ? 'selected' : ''}>Moderate Walking</option>
            <option value="High" ${state.activeFilters.activityLevel === 'High' ? 'selected' : ''}>High / Adventurous</option>
          </select>
        </div>
      </div>
      
      <!-- Tags showing active filters and clear button -->
      <div class="active-filters" id="active-filters-tags" style="display: none;"></div>
    </section>

    <!-- Grid of Recommendations -->
    <section class="destinations-section">
      <div class="section-header">
        <h2>All Curated Recommendations</h2>
        <span class="text-muted" id="results-count">Showing 12 destinations</span>
      </div>
      <div class="cards-grid" id="destinations-grid">
        <!-- Rendered by JS -->
      </div>
    </section>
  `;

  // Attach Filter Listeners
  const searchInput = document.getElementById('search-input');
  const catSelect = document.getElementById('filter-category');
  const budSelect = document.getElementById('filter-budget');
  const cliSelect = document.getElementById('filter-climate');
  const actSelect = document.getElementById('filter-activity');

  const onFilterChange = () => {
    state.activeFilters.search = searchInput.value;
    state.activeFilters.category = catSelect.value;
    state.activeFilters.budget = budSelect.value;
    state.activeFilters.climate = cliSelect.value;
    state.activeFilters.activityLevel = actSelect.value;
    applyFilters();
  };

  searchInput.addEventListener('input', onFilterChange);
  catSelect.addEventListener('change', onFilterChange);
  budSelect.addEventListener('change', onFilterChange);
  cliSelect.addEventListener('change', onFilterChange);
  actSelect.addEventListener('change', onFilterChange);

  applyFilters();
}

function applyFilters() {
  const grid = document.getElementById('destinations-grid');
  const countText = document.getElementById('results-count');
  const tagsContainer = document.getElementById('active-filters-tags');

  // Filter & Score Destinations
  let items = destinations.map(dest => {
    let score = null;
    // Calculate match percentage if quiz results exist
    if (state.quizResults && state.quizResults.scores) {
      score = state.quizResults.scores[dest.id] || 0;
    }
    return { ...dest, score };
  });

  // Apply basic dropdown/input filters
  items = items.filter(dest => {
    const matchSearch = state.activeFilters.search === '' || 
      dest.name.toLowerCase().includes(state.activeFilters.search.toLowerCase()) ||
      dest.country.toLowerCase().includes(state.activeFilters.search.toLowerCase()) ||
      dest.tagline.toLowerCase().includes(state.activeFilters.search.toLowerCase());

    const matchCategory = state.activeFilters.category === 'all' || dest.category === state.activeFilters.category;
    const matchBudget = state.activeFilters.budget === 'all' || dest.budget === state.activeFilters.budget;
    const matchClimate = state.activeFilters.climate === 'all' || dest.climate === state.activeFilters.climate;
    const matchActivity = state.activeFilters.activityLevel === 'all' || dest.activityLevel === state.activeFilters.activityLevel;

    return matchSearch && matchCategory && matchBudget && matchClimate && matchActivity;
  });

  // Sort: If Quiz scores exist, sort by score descending. Otherwise sort by rating descending.
  if (state.quizResults) {
    items.sort((a, b) => b.score - a.score);
  } else {
    items.sort((a, b) => b.rating - a.rating);
  }

  // Update counts
  countText.textContent = `Showing ${items.length} destination${items.length === 1 ? '' : 's'}`;

  // Update Tags Bar
  updateFilterTags(tagsContainer);

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; height: 300px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <h3>No matching destinations found</h3>
        <p>Try loosening your search query or filters to discover other possibilities!</p>
      </div>
    `;
    return;
  }

  // Render cards
  grid.innerHTML = items.map(dest => {
    const isWished = state.wishlist.has(dest.id);
    const isCompared = state.compareList.has(dest.id);
    
    // Build badge element
    let matchBadgeHTML = '';
    if (dest.score !== null) {
      matchBadgeHTML = `<span class="dest-card-badge match">${dest.score}% Match</span>`;
    } else {
      matchBadgeHTML = `<span class="dest-card-badge">${dest.category}</span>`;
    }

    return `
      <article class="dest-card" data-id="${dest.id}">
        <div class="dest-card-image-wrapper">
          <img class="dest-card-image" src="${dest.image}" alt="${dest.name} Landscape" loading="lazy">
          <div class="dest-card-overlay">
            ${matchBadgeHTML}
            <button class="dest-card-fav-btn ${isWished ? 'active' : ''}" aria-label="${isWished ? 'Remove from favorites' : 'Add to favorites'}" data-id="${dest.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
          </div>
        </div>
        <div class="dest-card-content">
          <div class="dest-card-title-row">
            <h3>${dest.name}</h3>
            <span class="dest-card-rating">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${dest.rating}
            </span>
          </div>
          <p class="dest-card-location">${dest.country}</p>
          <p class="dest-card-tagline">${dest.tagline}</p>
          
          <div class="dest-card-meta">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              ${dest.duration} Days
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              ${dest.budget}
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/><path d="M12 2v20M2 12h20M12 12h8"/></svg>
              ${dest.climate}
            </span>
          </div>

          <div class="dest-card-actions">
            <button class="secondary-btn view-details-btn" data-id="${dest.id}">Explore</button>
            <label class="compare-checkbox-label">
              <input type="checkbox" class="compare-checkbox" data-id="${dest.id}" ${isCompared ? 'checked' : ''}>
              <span>Compare</span>
            </label>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach Event Listeners on cards
  grid.querySelectorAll('.dest-card-fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(btn.dataset.id);
    });
  });

  grid.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Setup dynamic transition name on the card image we are navigating to
      const card = e.target.closest('.dest-card');
      const img = card.querySelector('.dest-card-image');
      img.style.viewTransitionName = 'hero';
      
      window.location.hash = `#destination/${btn.dataset.id}`;
    });
  });

  grid.querySelectorAll('.compare-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      toggleCompare(cb.dataset.id);
    });
  });
}

function updateFilterTags(container) {
  const activeTags = [];
  const filters = state.activeFilters;

  if (filters.search) activeTags.push({ key: 'search', val: `"${filters.search}"` });
  if (filters.category !== 'all') activeTags.push({ key: 'category', val: filters.category });
  if (filters.budget !== 'all') activeTags.push({ key: 'budget', val: `Budget: ${filters.budget}` });
  if (filters.climate !== 'all') activeTags.push({ key: 'climate', val: filters.climate });
  if (filters.activityLevel !== 'all') activeTags.push({ key: 'activityLevel', val: `${filters.activityLevel} Activity` });
  
  if (state.quizResults) activeTags.push({ key: 'quiz', val: 'Quiz Match Applied' });

  if (activeTags.length === 0) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'flex';
  container.innerHTML = activeTags.map(t => `
    <span class="filter-tag">
      ${t.val}
      <button data-key="${t.key}" aria-label="Remove filter">&times;</button>
    </span>
  `).join('') + '<button class="secondary-btn" id="clear-all-filters-btn" style="padding: 2px 10px; font-size: 0.75rem; border-radius: 20px;">Clear All</button>';

  // Listeners to remove specific tags
  container.querySelectorAll('button[data-key]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      if (key === 'quiz') {
        state.quizResults = null;
        localStorage.removeItem('wl-quiz-results');
      } else {
        state.activeFilters[key] = key === 'search' ? '' : 'all';
        // Sync DOM inputs
        if (key === 'search') document.getElementById('search-input').value = '';
        else if (key === 'category') document.getElementById('filter-category').value = 'all';
        else if (key === 'budget') document.getElementById('filter-budget').value = 'all';
        else if (key === 'climate') document.getElementById('filter-climate').value = 'all';
        else if (key === 'activityLevel') document.getElementById('filter-activity').value = 'all';
      }
      applyFilters();
    });
  });

  container.querySelector('#clear-all-filters-btn').addEventListener('click', () => {
    state.quizResults = null;
    localStorage.removeItem('wl-quiz-results');
    state.activeFilters = { search: '', category: 'all', budget: 'all', climate: 'all', activityLevel: 'all' };
    
    // Sync values in DOM
    document.getElementById('search-input').value = '';
    document.getElementById('filter-category').value = 'all';
    document.getElementById('filter-budget').value = 'all';
    document.getElementById('filter-climate').value = 'all';
    document.getElementById('filter-activity').value = 'all';

    applyFilters();
  });
}

// ----------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Wishlist UI init
  updateWishlistUI();

  // Wishlist Drawer Toggles
  const drawerToggle = document.getElementById('wishlist-toggle');
  const drawerClose = document.getElementById('wishlist-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const compareWishlistBtn = document.getElementById('compare-wishlist-btn');

  drawerToggle.addEventListener('click', () => toggleDrawer(true));
  drawerClose.addEventListener('click', () => toggleDrawer(false));
  drawerBackdrop.addEventListener('click', () => toggleDrawer(false));
  
  compareWishlistBtn.addEventListener('click', () => {
    if (state.wishlist.size === 0) {
      showToast("Add some items to your wishlist first!");
      return;
    }
    // Set comparison items to be wishlist items (up to 3)
    state.compareList = new Set(Array.from(state.wishlist).slice(0, 3));
    localStorage.setItem('wl-compare', JSON.stringify(Array.from(state.compareList)));
    toggleDrawer(false);
    window.location.hash = '#compare';
  });

  // Watch hash changes
  window.addEventListener('hashchange', () => {
    navigate(window.location.hash);
  });

  // Trigger initial routing
  navigate(window.location.hash);
});
