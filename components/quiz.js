import { destinations } from '../destinations.js';
import { state } from '../app.js';

let currentStep = 1;
const totalSteps = 5;
const quizAnswers = {
  vibe: '',
  climate: '',
  budget: '',
  activity: 2, // 1: Relaxed, 2: Moderate, 3: High
  duration: 5
};

export function initQuizView() {
  const viewport = document.getElementById('app-viewport');
  currentStep = 1;

  viewport.innerHTML = `
    <div class="quiz-view-container">
      <div class="quiz-card">
        <!-- Progress Bar -->
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" id="quiz-progress"></div>
        </div>

        <form id="quiz-form" onsubmit="event.preventDefault();">
          
          <!-- STEP 1: VIBE -->
          <div class="quiz-step active" data-step="1">
            <h2 id="quiz-heading">What is your travel vibe?</h2>
            <p class="quiz-step-subtitle">Select the experience that best speaks to your soul.</p>
            <div class="quiz-options">
              <div class="quiz-opt-card" data-val="Adventure">
                <div class="quiz-opt-icon">🧗</div>
                <div class="quiz-opt-details">
                  <h4>Thrills & Adventure</h4>
                  <p>Hiking, skydiving, safaris, and exploring the wild.</p>
                </div>
              </div>
              <div class="quiz-opt-card" data-val="Culture">
                <div class="quiz-opt-icon">⛩️</div>
                <div class="quiz-opt-details">
                  <h4>Art, History & Culture</h4>
                  <p>Ancient temples, historic museums, and local traditions.</p>
                </div>
              </div>
              <div class="quiz-opt-card" data-val="Beach">
                <div class="quiz-opt-icon">🏖️</div>
                <div class="quiz-opt-details">
                  <h4>Sun & Relaxation</h4>
                  <p>Pristine sands, crystal water, and seaside luxury.</p>
                </div>
              </div>
              <div class="quiz-opt-card" data-val="Nature">
                <div class="quiz-opt-icon">🏔️</div>
                <div class="quiz-opt-details">
                  <h4>Scenic Nature</h4>
                  <p>Glaciers, turquoise lakes, wildlife, and dramatic cliffs.</p>
                </div>
              </div>
              <div class="quiz-opt-card" data-val="City">
                <div class="quiz-opt-icon">🌆</div>
                <div class="quiz-opt-details">
                  <h4>City Exploration</h4>
                  <p>Shopping, street foods, Paella, and gothic quarters.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 2: CLIMATE -->
          <div class="quiz-step" data-step="2">
            <h2>Choose your preferred climate</h2>
            <p class="quiz-step-subtitle">Tell us what weather makes you feel alive.</p>
            <div class="quiz-options">
              <div class="quiz-opt-card" data-val="Tropical">
                <div class="quiz-opt-icon">☀️</div>
                <div class="quiz-opt-details">
                  <h4>Tropical & Warm</h4>
                  <p>Lush jungles, balmy sea breeze, and sunny blue skies.</p>
                </div>
              </div>
              <div class="quiz-opt-card" data-val="Temperate">
                <div class="quiz-opt-icon">🍂</div>
                <div class="quiz-opt-details">
                  <h4>Temperate & Mild</h4>
                  <p>Cool autumn leaves, breezy springs, and pleasant walking days.</p>
                </div>
              </div>
              <div class="quiz-opt-card" data-val="Cold">
                <div class="quiz-opt-icon">❄️</div>
                <div class="quiz-opt-details">
                  <h4>Cool & Alpine</h4>
                  <p>Snowy mountain chalets, glaciers, and dancing Northern Lights.</p>
                </div>
              </div>
              <div class="quiz-opt-card" data-val="Desert">
                <div class="quiz-opt-icon">🏜️</div>
                <div class="quiz-opt-details">
                  <h4>Dry & Desert</h4>
                  <p>Warm desert sands, red rock formations, and ancient stone ruins.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 3: BUDGET -->
          <div class="quiz-step" data-step="3">
            <h2>Select your budget tier</h2>
            <p class="quiz-step-subtitle">We will find stays and activities to match your style.</p>
            <div class="quiz-options">
              <div class="quiz-opt-card" data-val="$">
                <div class="quiz-opt-icon">🎒</div>
                <div class="quiz-opt-details">
                  <h4>Value Budget ($)</h4>
                  <p>Hostels, street food crawl, hiking, and budget-friendly transit.</p>
                </div>
              </div>
              <div class="quiz-opt-card" data-val="$$">
                <div class="quiz-opt-icon">🏨</div>
                <div class="quiz-opt-details">
                  <h4>Moderate Budget ($$)</h4>
                  <p>Boutique hotels, mid-tier restaurants, and paid guided tours.</p>
                </div>
              </div>
              <div class="quiz-opt-card" data-val="$$$">
                <div class="quiz-opt-icon">🥂</div>
                <div class="quiz-opt-details">
                  <h4>Premium Luxury ($$$)</h4>
                  <p>Five-star beach resorts, catamaran tours, and fine dining.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 4: ACTIVITY LEVEL -->
          <div class="quiz-step" data-step="4">
            <h2>Determine your activity intensity</h2>
            <p class="quiz-step-subtitle">How active do you want your days to be?</p>
            <div class="quiz-slider-container">
              <div class="quiz-slider-labels">
                <span>Relaxed & Leisurely</span>
                <span>Moderate Walking</span>
                <span>Highly Active & Adventure</span>
              </div>
              <input type="range" class="quiz-slider" id="activity-slider" min="1" max="3" step="1" value="2">
              <div style="text-align: center; margin-top: 1rem; font-weight: bold; color: var(--secondary);" id="activity-label">
                Moderate Walking & Highlights
              </div>
            </div>
          </div>

          <!-- STEP 5: TRIP DURATION -->
          <div class="quiz-step" data-step="5">
            <h2>Select your preferred trip length</h2>
            <p class="quiz-step-subtitle">How many days do you have available for exploration?</p>
            <div class="quiz-options">
              <div class="quiz-opt-card" data-val="3">
                <div class="quiz-opt-icon">✈️</div>
                <div class="quiz-opt-details">
                  <h4>Short Getaway (3 - 4 Days)</h4>
                  <p>Perfect for quick weekend breaks or intense, fast-paced city checks.</p>
                </div>
              </div>
              <div class="quiz-opt-card" data-val="5">
                <div class="quiz-opt-icon">🧳</div>
                <div class="quiz-opt-details">
                  <h4>Week Escape (5 - 6 Days)</h4>
                  <p>Balance relaxation with deep local explorations.</p>
                </div>
              </div>
              <div class="quiz-opt-card" data-val="7">
                <div class="quiz-opt-icon">🗺️</div>
                <div class="quiz-opt-details">
                  <h4>Extended Tour (7+ Days)</h4>
                  <p>Deep dive into glaciers, road drives, or wildlife migrations.</p>
                </div>
              </div>
            </div>
          </div>

        </form>

        <div class="quiz-navigation">
          <button id="quiz-prev-btn" class="secondary-btn" style="visibility: hidden;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Previous
          </button>
          <button id="quiz-next-btn" class="primary-btn" disabled>
            Next
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Initialize event listeners
  setupQuizListeners();
  updateProgress();
}

function setupQuizListeners() {
  const container = document.querySelector('.quiz-view-container');
  const prevBtn = document.getElementById('quiz-prev-btn');
  const nextBtn = document.getElementById('quiz-next-btn');
  const activitySlider = document.getElementById('activity-slider');
  const activityLabel = document.getElementById('activity-label');

  // Option selection handler
  container.querySelectorAll('.quiz-opt-card').forEach(card => {
    card.addEventListener('click', () => {
      // Find parent step
      const stepEl = card.closest('.quiz-step');
      const stepNum = parseInt(stepEl.dataset.step);

      // Deselect siblings
      stepEl.querySelectorAll('.quiz-opt-card').forEach(c => c.classList.remove('selected'));
      
      // Select clicked
      card.classList.add('selected');
      const val = card.dataset.val;

      // Save answer
      if (stepNum === 1) quizAnswers.vibe = val;
      else if (stepNum === 2) quizAnswers.climate = val;
      else if (stepNum === 3) quizAnswers.budget = val;
      else if (stepNum === 5) quizAnswers.duration = parseInt(val);

      // Enable next button
      nextBtn.disabled = false;
    });
  });

  // Slider handler
  if (activitySlider) {
    activitySlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      quizAnswers.activity = val;
      if (val === 1) {
        activityLabel.textContent = "Relaxed & Leisurely Pace";
      } else if (val === 2) {
        activityLabel.textContent = "Moderate Walking & Highlights";
      } else {
        activityLabel.textContent = "High / Physically Demanding Adventure";
      }
    });
  }

  // Navigation click handlers
  nextBtn.addEventListener('click', () => {
    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
    } else {
      calculateResults();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });
}

function showStep(step) {
  const steps = document.querySelectorAll('.quiz-step');
  const prevBtn = document.getElementById('quiz-prev-btn');
  const nextBtn = document.getElementById('quiz-next-btn');

  // Hide active step, show new step
  steps.forEach(el => {
    if (parseInt(el.dataset.step) === step) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Update button visibility and label
  prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
  if (step === totalSteps) {
    nextBtn.innerHTML = `Calculate Matches <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
  } else {
    nextBtn.innerHTML = `Next <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
  }

  // Check if current step has an answer saved to enable the next button
  let hasAnswer = false;
  if (step === 1 && quizAnswers.vibe) hasAnswer = true;
  else if (step === 2 && quizAnswers.climate) hasAnswer = true;
  else if (step === 3 && quizAnswers.budget) hasAnswer = true;
  else if (step === 4) hasAnswer = true; // Slider has default value
  else if (step === 5 && quizAnswers.duration) hasAnswer = true;

  nextBtn.disabled = !hasAnswer;

  updateProgress();
}

function updateProgress() {
  const fill = document.getElementById('quiz-progress');
  if (fill) {
    const pct = ((currentStep - 1) / (totalSteps - 1)) * 100;
    fill.style.width = `${pct}%`;
  }
}

// Preference Engine Matching Logic
function calculateResults() {
  const scores = {};

  destinations.forEach(dest => {
    let points = 0;
    const maxPoints = 100;

    // 1. Climate Match (Max 30pts)
    if (dest.climate === quizAnswers.climate) {
      points += 30;
    }

    // 2. Vibe/Category Match (Max 25pts)
    if (dest.category === quizAnswers.vibe) {
      points += 25;
    } else {
      // Small partial match for overlap categories
      if ((quizAnswers.vibe === 'Nature' && dest.category === 'Adventure') ||
          (quizAnswers.vibe === 'Adventure' && dest.category === 'Nature')) {
        points += 12;
      }
    }

    // 3. Budget Match (Max 20pts)
    if (dest.budget === quizAnswers.budget) {
      points += 20;
    } else {
      // 1-step budget difference partial matching
      const tiers = { '$': 1, '$$': 2, '$$$': 3 };
      const diff = Math.abs(tiers[dest.budget] - tiers[quizAnswers.budget]);
      if (diff === 1) {
        points += 10;
      }
    }

    // 4. Activity Match (Max 15pts)
    const actLevels = { 'Relaxed': 1, 'Moderate': 2, 'High': 3 };
    const destAct = actLevels[dest.activityLevel] || 2;
    const actDiff = Math.abs(destAct - quizAnswers.activity);
    if (actDiff === 0) {
      points += 15;
    } else if (actDiff === 1) {
      points += 8;
    }

    // 5. Duration Match (Max 10pts)
    // Match preferences: 3 days -> 3-4, 5 days -> 5-6, 7 days -> 7+
    const destDuration = dest.duration;
    if (quizAnswers.duration === 3 && destDuration <= 4) points += 10;
    else if (quizAnswers.duration === 5 && destDuration >= 4 && destDuration <= 6) points += 10;
    else if (quizAnswers.duration === 7 && destDuration >= 6) points += 10;
    else {
      // Proportional difference
      const durDiff = Math.abs(destDuration - quizAnswers.duration);
      if (durDiff <= 2) points += 5;
    }

    // Calculate percentage
    const pct = Math.round((points / maxPoints) * 100);
    scores[dest.id] = pct;
  });

  // Save to state and localStorage
  state.quizResults = {
    answers: quizAnswers,
    scores: scores
  };
  localStorage.setItem('wl-quiz-results', JSON.stringify(state.quizResults));

  // Navigate home to see filtered matches!
  window.location.hash = '#home';
}
