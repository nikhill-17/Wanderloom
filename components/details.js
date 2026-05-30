import { destinations } from '../destinations.js';
import { state, toggleWishlist, showToast } from '../app.js';

let activeDay = 1;
let currentDest = null;

export function initDetailsView(id) {
  const viewport = document.getElementById('app-viewport');
  const dest = destinations.find(d => d.id === id);
  
  if (!dest) {
    viewport.innerHTML = `<div class="main-container"><p style="padding: 4rem 0; text-align: center;">Destination not found. <a href="#home">Return Home</a></p></div>`;
    return;
  }

  currentDest = dest;
  activeDay = 1;

  const isWished = state.wishlist.has(dest.id);
  const matchPct = state.quizResults && state.quizResults.scores ? state.quizResults.scores[dest.id] : null;

  viewport.innerHTML = `
    <div class="details-wrapper">
      <!-- Immersive Cover -->
      <section class="details-hero" style="background-image: url('${dest.image}');">
        <img class="details-hero-img" src="${dest.image}" alt="${dest.name} Cover" style="view-transition-name: hero;">
        <div class="details-hero-content">
          ${matchPct ? `<span class="details-hero-tag">${matchPct}% Match Recommendation</span>` : `<span class="details-hero-tag">${dest.category}</span>`}
          <h1 class="details-hero-title" id="detail-heading">${dest.name}</h1>
          <p class="details-hero-country">${dest.country}</p>
        </div>
      </section>

      <!-- Details Core Layout -->
      <div class="details-layout">
        <!-- Main Description & Attractions -->
        <main class="details-main" aria-label="Destination Information">
          <!-- Overview Box -->
          <div class="details-card-box">
            <h3>Overview</h3>
            <p class="details-description">${dest.description}</p>
            
            <div style="margin-top: 1.5rem;">
              <button class="primary-btn toggle-wishlist-detail" data-id="${dest.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                ${isWished ? 'Saved to Wishlist' : 'Save to Wishlist'}
              </button>
              <a href="#home" class="secondary-btn" style="margin-left: 10px;">Back to Discovery</a>
            </div>
          </div>

          <!-- Key Attractions -->
          <div class="details-card-box">
            <h3>Must-See Attractions</h3>
            <div class="attractions-list">
              ${dest.attractions.map((att, idx) => `
                <div class="attraction-item">
                  <span class="attraction-num">0${idx + 1}</span>
                  <div class="attraction-info">
                    <h4>${att.name}</h4>
                    <p>${att.description}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Reviews & Ratings -->
          <div class="details-card-box">
            <h3>Traveler Reviews</h3>
            <div id="reviews-list-container" style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem;">
              <!-- Filled by JS -->
            </div>

            <!-- Submit Review Form -->
            <form id="add-review-form" style="border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
              <h4 style="margin-bottom: 1rem; font-family: var(--font-family-serif);">Write a Review</h4>
              <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <input type="text" id="review-username" placeholder="Your name" required style="background: var(--bg-dark); border: 1px solid var(--border-color); color: var(--text-main); padding: 10px; border-radius: var(--border-radius-sm); outline: none;">
                <select id="review-rating" required style="background: var(--bg-dark); border: 1px solid var(--border-color); color: var(--text-main); padding: 10px; border-radius: var(--border-radius-sm); outline: none;">
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              <textarea id="review-text" placeholder="Share your experience..." required style="width: 100%; background: var(--bg-dark); border: 1px solid var(--border-color); color: var(--text-main); padding: 10px; border-radius: var(--border-radius-sm); outline: none; resize: vertical; min-height: 80px; margin-bottom: 1rem;"></textarea>
              <button type="submit" class="secondary-btn">Submit Review</button>
            </form>
          </div>
        </main>

        <!-- Sidebar Widgets & Itinerary Planner -->
        <aside class="details-sidebar" aria-label="Travel Utilities">
          <!-- Statistics Widget -->
          <div class="details-card-box">
            <h3>Quick Details</h3>
            <div class="details-stats-grid">
              <div class="details-stat-card">
                <div class="details-stat-val">${dest.duration} Days</div>
                <div class="details-stat-lbl">Rec. Length</div>
              </div>
              <div class="details-stat-card">
                <div class="details-stat-val">${dest.budget}</div>
                <div class="details-stat-lbl">Budget Tier</div>
              </div>
              <div class="details-stat-card">
                <div class="details-stat-val">${dest.climate}</div>
                <div class="details-stat-lbl">Climate</div>
              </div>
            </div>
            <p style="font-size: 0.9rem; line-height: 1.5; color: var(--text-muted);">
              <strong>Best season to visit:</strong> ${dest.bestTime}<br>
              <strong>Activity Profile:</strong> ${dest.activityLevel} energy level.
            </p>
          </div>

          <!-- Researched Budget Breakdown Widget -->
          <div class="details-card-box">
            <h3>Estimated Budget</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">Typical costs for a solo traveler:</p>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem; margin-bottom: 1.2rem;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>✈️ Flights (Round-trip)</span>
                <strong>$${dest.estimatedBudget.flights}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>🏨 Lodging (per night)</span>
                <strong>$${dest.estimatedBudget.lodgingPerNight}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>🍽️ Food & Transit (daily)</span>
                <strong>$${dest.estimatedBudget.dailyFood}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>🎟️ Activities & Entry Fees</span>
                <strong>$${dest.estimatedBudget.activities}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; padding-top: 6px; color: var(--secondary); font-weight: 700; font-size: 1rem; border-top: 1px solid var(--border-color);">
                <span>Estimated Total (${dest.duration} Days)</span>
                <span>$${(dest.estimatedBudget.flights + (dest.estimatedBudget.lodgingPerNight * dest.duration) + (dest.estimatedBudget.dailyFood * dest.duration) + dest.estimatedBudget.activities).toLocaleString()}</span>
              </div>
            </div>
            <button class="primary-btn btn-full customize-budget-btn" data-id="${dest.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              Customize in Planner
            </button>
          </div>

          <!-- Interactive Itinerary Planner -->
          <div class="details-card-box">
            <h3>Itinerary Designer</h3>
            <div class="itinerary-container">
              <!-- Day Select Tabs -->
              <div class="itinerary-day-select" id="itinerary-tabs">
                <!-- Filled by JS -->
              </div>
              
              <!-- Timeline activities -->
              <div class="timeline" id="itinerary-timeline">
                <!-- Filled by JS -->
              </div>

              <!-- Add custom activity form -->
              <form class="itinerary-builder-form" id="itinerary-builder">
                <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted);">Add Custom Activity</h4>
                <input type="text" id="act-time" placeholder="e.g. 10:00 AM" required>
                <input type="text" id="act-title" placeholder="e.g. Visit Golden Temple" required>
                <textarea id="act-desc" placeholder="Details about this stop..."></textarea>
                <button type="submit" class="secondary-btn btn-full">Add to Timeline</button>
              </form>

              <!-- Export itinerary action -->
              <button class="primary-btn btn-full" id="export-itinerary-btn" style="margin-top: 1rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Export Itinerary (TXT)
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;

  // Hook details listeners
  document.querySelector('.toggle-wishlist-detail').addEventListener('click', () => {
    toggleWishlist(dest.id);
  });

  const customizeBtn = document.querySelector('.customize-budget-btn');
  if (customizeBtn) {
    customizeBtn.addEventListener('click', () => {
      localStorage.setItem('wl-active-planner-dest', dest.id);
      window.location.hash = '#planner';
    });
  }

  setupReviews();
  setupItinerary();
}

// Review widgets
function setupReviews() {
  const container = document.getElementById('reviews-list-container');
  const form = document.getElementById('add-review-form');

  const renderReviews = () => {
    container.innerHTML = currentDest.reviews.map(rev => {
      // Star rating stars string builder
      const stars = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
      return `
        <div style="background: var(--bg-dark); border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--border-radius-sm);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <strong>${rev.name}</strong>
            <span style="color: var(--accent-gold); font-size: 0.85rem;">${stars}</span>
          </div>
          <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">${rev.text}</p>
        </div>
      `;
    }).join('');
  };

  renderReviews();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('review-username');
    const ratingInput = document.getElementById('review-rating');
    const textInput = document.getElementById('review-text');

    const newReview = {
      name: nameInput.value,
      rating: parseInt(ratingInput.value),
      text: textInput.value
    };

    // Push into global array
    currentDest.reviews.push(newReview);
    showToast("Review submitted! Thank you.");
    
    // Clear inputs
    nameInput.value = '';
    textInput.value = '';
    
    renderReviews();
  });
}

// Itinerary widget
function setupItinerary() {
  const tabs = document.getElementById('itinerary-tabs');
  const timeline = document.getElementById('itinerary-timeline');
  const form = document.getElementById('itinerary-builder');
  const exportBtn = document.getElementById('export-itinerary-btn');

  // Verify that destination has itinerary data
  if (!currentDest.itineraryTemplate) {
    currentDest.itineraryTemplate = [];
  }

  // Ensure there's a day array up to the recommended duration
  for (let d = 1; d <= currentDest.duration; d++) {
    if (!currentDest.itineraryTemplate.some(i => i.day === d)) {
      currentDest.itineraryTemplate.push({
        day: d,
        title: `Day ${d} Exploring`,
        activities: []
      });
    }
  }

  // Sort days ascending
  currentDest.itineraryTemplate.sort((a, b) => a.day - b.day);

  const renderTabs = () => {
    tabs.innerHTML = currentDest.itineraryTemplate.map(dayObj => `
      <button class="itinerary-day-btn ${dayObj.day === activeDay ? 'active' : ''}" data-day="${dayObj.day}">
        Day ${dayObj.day}
      </button>
    `).join('');

    tabs.querySelectorAll('.itinerary-day-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeDay = parseInt(btn.dataset.day);
        renderTabs();
        renderTimeline();
      });
    });
  };

  const renderTimeline = () => {
    const activeDayData = currentDest.itineraryTemplate.find(i => i.day === activeDay);
    if (!activeDayData || activeDayData.activities.length === 0) {
      timeline.innerHTML = `
        <div class="empty-state" style="height: 120px;">
          <p style="font-size: 0.85rem;">No activities planned for Day ${activeDay}. Add some below!</p>
        </div>
      `;
      return;
    }

    timeline.innerHTML = activeDayData.activities.map((act, idx) => `
      <div class="timeline-item">
        <div class="timeline-time">${act.time}</div>
        <div class="timeline-title">
          <span>${act.title}</span>
          <button class="wishlist-item-remove delete-activity-btn" data-idx="${idx}" aria-label="Delete activity" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer;">
            &times;
          </button>
        </div>
        <div class="timeline-desc">${act.desc || ''}</div>
      </div>
    `).join('');

    timeline.querySelectorAll('.delete-activity-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        activeDayData.activities.splice(idx, 1);
        showToast("Activity deleted");
        renderTimeline();
      });
    });
  };

  renderTabs();
  renderTimeline();

  // Add Custom Activity
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const timeInput = document.getElementById('act-time');
    const titleInput = document.getElementById('act-title');
    const descInput = document.getElementById('act-desc');

    const activeDayData = currentDest.itineraryTemplate.find(i => i.day === activeDay);
    if (activeDayData) {
      activeDayData.activities.push({
        time: timeInput.value,
        title: titleInput.value,
        desc: descInput.value
      });

      // Reset inputs
      timeInput.value = '';
      titleInput.value = '';
      descInput.value = '';

      showToast("Activity added to timeline!");
      renderTimeline();
    }
  });

  // Export Itinerary
  exportBtn.addEventListener('click', () => {
    let outputText = `====================================================\n`;
    outputText += `  WanderLoom Custom Travel Itinerary: ${currentDest.name}, ${currentDest.country}\n`;
    outputText += `====================================================\n\n`;

    currentDest.itineraryTemplate.forEach(dayObj => {
      outputText += `Day ${dayObj.day}: ${dayObj.title}\n`;
      outputText += `----------------------------------------------------\n`;
      if (dayObj.activities.length === 0) {
        outputText += `  (No items scheduled)\n`;
      } else {
        dayObj.activities.forEach(act => {
          outputText += `  [ ${act.time} ] ${act.title}\n`;
          if (act.desc) outputText += `    - ${act.desc}\n`;
        });
      }
      outputText += `\n`;
    });

    outputText += `Generated by WanderLoom on ${new Date().toLocaleDateString()}\n`;

    // Download text trigger
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WanderLoom_${currentDest.name}_Itinerary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Downloaded Itinerary!");
  });
}
