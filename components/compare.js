import { destinations } from '../destinations.js';
import { state, toggleCompare, navigate } from '../app.js';

export function initCompareView() {
  const viewport = document.getElementById('app-viewport');
  
  if (state.compareList.size === 0) {
    viewport.innerHTML = `
      <div class="compare-container">
        <h1 id="compare-heading">Compare Destinations</h1>
        <div class="details-card-box" style="text-align: center; padding: 4rem 2rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted); margin-bottom: 1.5rem;"><path d="M16 3h5v5M8 3H3v5M12 22V2M17 17l4 4M7 17l-4 4"/></svg>
          <h2 style="font-family: var(--font-family-serif); margin-bottom: 1rem;">No items selected for comparison</h2>
          <p class="text-muted" style="max-width: 500px; margin: 0 auto 2rem auto; line-height: 1.6;">
            Select up to 3 destinations on the main page by checking the "Compare" boxes, or click "Compare Saved Items" in your wishlist drawer.
          </p>
          <a href="#home" class="primary-btn">Go to Discovery Engine</a>
        </div>
      </div>
    `;
    return;
  }

  // Load selected destinations
  const selectedDests = Array.from(state.compareList).map(id => {
    const dest = destinations.find(d => d.id === id);
    let score = null;
    if (state.quizResults && state.quizResults.scores) {
      score = state.quizResults.scores[id] || null;
    }
    return { ...dest, score };
  }).filter(Boolean);

  viewport.innerHTML = `
    <div class="compare-container">
      <h1 id="compare-heading">Compare Destinations</h1>
      <p>Compare key factors side-by-side to make the best choice for your journey. You can compare up to 3 items.</p>
      
      <div class="compare-matrix-wrapper">
        <table class="compare-table">
          <thead>
            <tr>
              <th class="compare-label-cell">Destinations</th>
              ${selectedDests.map(dest => `
                <th class="compare-dest-card">
                  <img src="${dest.image}" alt="${dest.name}">
                  <h3>${dest.name}</h3>
                  <p class="text-muted">${dest.country}</p>
                  <button class="secondary-btn remove-compare-btn" data-id="${dest.id}" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 20px;">
                    Remove
                  </button>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${state.quizResults ? `
              <tr>
                <td class="compare-label-cell">Quiz Score</td>
                ${selectedDests.map(dest => `
                  <td>
                    <span class="highlight-val" style="font-size: 1.2rem; color: var(--secondary);">${dest.score !== null ? `${dest.score}% Match` : 'N/A'}</span>
                  </td>
                `).join('')}
              </tr>
            ` : ''}
            <tr>
              <td class="compare-label-cell">Travel Category</td>
              ${selectedDests.map(dest => `
                <td><strong>${dest.category}</strong></td>
              `).join('')}
            </tr>
            <tr>
              <td class="compare-label-cell">Rating</td>
              ${selectedDests.map(dest => `
                <td>
                  <span style="color: var(--accent-gold); font-weight: bold; display: flex; align-items: center; gap: 4px;">
                    ★ ${dest.rating}
                  </span>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td class="compare-label-cell">Climate</td>
              ${selectedDests.map(dest => `
                <td>${dest.climate}</td>
              `).join('')}
            </tr>
            <tr>
              <td class="compare-label-cell">Activity Level</td>
              ${selectedDests.map(dest => `
                <td>${dest.activityLevel}</td>
              `).join('')}
            </tr>
            <tr>
              <td class="compare-label-cell">Estimated Budget</td>
              ${selectedDests.map(dest => `
                <td>
                  <div style="font-size: 0.95rem; font-weight: 700; color: var(--primary); margin-bottom: 8px;">
                    ${dest.budget} Tier
                  </div>
                  <div style="font-size: 0.85rem; line-height: 1.5; color: var(--text-muted); text-align: left; display: inline-block; min-width: 170px; border: 1px solid var(--border-color); padding: 10px; border-radius: var(--border-radius-sm); background: var(--bg-dark);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                      <span>✈️ Flights:</span>
                      <strong style="color: var(--text-main);">$${dest.estimatedBudget.flights}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                      <span>🏨 Lodging:</span>
                      <strong style="color: var(--text-main);">$${dest.estimatedBudget.lodgingPerNight}/nt</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                      <span>🍽️ Daily:</span>
                      <strong style="color: var(--text-main);">$${dest.estimatedBudget.dailyFood}/dy</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                      <span>🎟️ Activities:</span>
                      <strong style="color: var(--text-main);">$${dest.estimatedBudget.activities}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--border-color); padding-top: 6px; color: var(--secondary); font-weight: bold;">
                      <span>Total (${dest.duration}d):</span>
                      <strong>$${(dest.estimatedBudget.flights + (dest.estimatedBudget.lodgingPerNight * dest.duration) + (dest.estimatedBudget.dailyFood * dest.duration) + dest.estimatedBudget.activities).toLocaleString()}</strong>
                    </div>
                  </div>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td class="compare-label-cell">Recommended Length</td>
              ${selectedDests.map(dest => `
                <td>${dest.duration} Days</td>
              `).join('')}
            </tr>
            <tr>
              <td class="compare-label-cell">Best Time to Visit</td>
              ${selectedDests.map(dest => `
                <td style="font-size: 0.9rem; line-height: 1.4;">${dest.bestTime}</td>
              `).join('')}
            </tr>
            <tr>
              <td class="compare-label-cell">Highlights</td>
              ${selectedDests.map(dest => `
                <td>
                  <ul style="padding-left: 1.2rem; line-height: 1.6; font-size: 0.9rem; color: var(--text-muted);">
                    ${dest.highlights.map(h => `<li>${h}</li>`).join('')}
                  </ul>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td class="compare-label-cell">Actions</td>
              ${selectedDests.map(dest => `
                <td>
                  <button class="primary-btn btn-full explore-compare-btn" data-id="${dest.id}">
                    Explore Detail
                  </button>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
      
      <div style="margin-top: 2rem; display: flex; justify-content: space-between;">
        <a href="#home" class="secondary-btn">Add More Destinations</a>
        <button class="secondary-btn" id="clear-compare-btn">Clear Comparison</button>
      </div>
    </div>
  `;

  // Attach Event Listeners
  viewport.querySelectorAll('.remove-compare-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleCompare(btn.dataset.id);
      initCompareView(); // re-render
    });
  });

  viewport.querySelectorAll('.explore-compare-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = `#destination/${btn.dataset.id}`;
    });
  });

  viewport.querySelector('#clear-compare-btn')?.addEventListener('click', () => {
    state.compareList.clear();
    localStorage.setItem('wl-compare', JSON.stringify([]));
    initCompareView();
  });
}
