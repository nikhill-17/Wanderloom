import { destinations } from '../destinations.js';
import { state, showToast } from '../app.js';

let activePackingList = [];
let budgetState = {
  flights: 800,
  lodgingPerNight: 120,
  days: 5,
  dailyFood: 50,
  activities: 200
};

export function initPlannerView() {
  const viewport = document.getElementById('app-viewport');

  viewport.innerHTML = `
    <div class="planner-container">
      <h1 id="planner-heading">Your Travel Dashboard</h1>
      <p style="margin-bottom: 2rem;">Organize your adventure with our dynamic planning utilities. Prepare your packing list and estimate your total expenses.</p>

      <!-- Unified Destination Selector -->
      <div style="margin-bottom: 2.5rem; background: var(--glass-bg); backdrop-filter: var(--glass-blur); border: var(--glass-border); box-shadow: var(--glass-shadow); padding: 1.5rem; border-radius: var(--border-radius-md); display: flex; flex-direction: column; gap: 8px;">
        <label for="planner-active-dest" style="font-weight: 600; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; color: var(--text-muted);">Active Destination (Select to pre-populate checklist & budget template):</label>
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <select id="planner-active-dest" style="background: var(--bg-dark); border: 1px solid var(--border-color); color: var(--text-main); padding: 12px 20px; border-radius: var(--border-radius-sm); outline: none; flex: 1; min-width: 250px; font-family: var(--font-family-sans); cursor: pointer; font-size: 0.95rem;">
            <option value="">-- Custom / Manual Trip --</option>
            ${destinations.map(d => `<option value="${d.id}">${d.name} (${d.country}) &bull; ${d.budget} Tier</option>`).join('')}
          </select>
          <span id="load-dest-status" style="font-size: 0.9rem; color: var(--secondary); font-weight: 600;"></span>
        </div>
      </div>

      <div class="planner-grid">
        <!-- Widget 1: Packing List Generator -->
        <section class="planner-widget" aria-labelledby="packing-list-heading">
          <h2 id="packing-list-heading">Smart Packing List</h2>
          <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 1.5rem;">Select your destination and duration to auto-generate a tailored checklist.</p>
          
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px; margin-bottom: 1.5rem;">
            <select id="packing-dest" style="background: var(--bg-dark); border: 1px solid var(--border-color); color: var(--text-main); padding: 10px; border-radius: var(--border-radius-sm); outline: none;">
              <option value="">-- Choose Destination --</option>
              ${destinations.map(d => `<option value="${d.id}">${d.name} (${d.climate} Climate)</option>`).join('')}
            </select>
            <input type="number" id="packing-days" value="5" min="1" max="30" style="background: var(--bg-dark); border: 1px solid var(--border-color); color: var(--text-main); padding: 10px; border-radius: var(--border-radius-sm); outline: none; text-align: center;">
          </div>
          
          <button id="generate-packing-btn" class="secondary-btn btn-full" style="margin-bottom: 1.5rem;">
            Generate Packing List
          </button>

          <div class="checklist-container" id="packing-list-items">
            <!-- Dynamic checklist -->
            <div class="empty-state" style="height: 150px;">
              <p>No packing items generated yet. Select details above to compile your checklist!</p>
            </div>
          </div>

          <form class="checklist-add-form" id="add-item-form" style="display: none;">
            <input type="text" id="custom-item-input" placeholder="Add custom item..." required>
            <button type="submit" class="secondary-btn">Add</button>
          </form>
        </section>

        <!-- Widget 2: Interactive Travel Budget Calculator -->
        <section class="planner-widget" aria-labelledby="budget-heading">
          <h2 id="budget-heading">Travel Budget Calculator</h2>
          <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 1.5rem;">Estimate your trip cost in real-time. Change inputs to see updates instantly.</p>
          
          <div class="budget-grid">
            <div class="budget-row">
              <label for="budget-flights">Round-trip Flights</label>
              <span>$</span>
              <input type="number" id="budget-flights" value="${budgetState.flights}" min="0">
            </div>
            
            <div class="budget-row">
              <label for="budget-lodging">Lodging (per night)</label>
              <span>$</span>
              <input type="number" id="budget-lodging" value="${budgetState.lodgingPerNight}" min="0">
            </div>

            <div class="budget-row">
              <label for="budget-days">Number of Nights</label>
              <span></span>
              <input type="number" id="budget-days" value="${budgetState.days}" min="1">
            </div>

            <div class="budget-row">
              <label for="budget-food">Daily Food & Transit</label>
              <span>$</span>
              <input type="number" id="budget-food" value="${budgetState.dailyFood}" min="0">
            </div>

            <div class="budget-row">
              <label for="budget-activities">Total Sightseeing / Activities</label>
              <span>$</span>
              <input type="number" id="budget-activities" value="${budgetState.activities}" min="0">
            </div>

            <div class="budget-total-box">
              <h3>Estimated Total</h3>
              <div class="budget-total-val" id="budget-total-display">$0</div>
            </div>

            <!-- Dynamic Percent Breakdown List -->
            <div style="margin-top: 1.5rem; font-size: 0.85rem; display: flex; flex-direction: column; gap: 8px;" id="budget-breakdown">
              <!-- Recalculated dynamically -->
            </div>
          </div>
        </section>
      </div>
    </div>
  `;

  setupPackingListListeners();
  setupBudgetListeners();
  setupActiveDestListener();
  calculateBudget(); // run initial calculation
}

// Checklist logic
function setupPackingListListeners() {
  const genBtn = document.getElementById('generate-packing-btn');
  const addForm = document.getElementById('add-item-form');
  const listContainer = document.getElementById('packing-list-items');

  const renderChecklist = () => {
    if (activePackingList.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-state" style="height: 150px;">
          <p>No packing items generated yet. Select details above to compile your checklist!</p>
        </div>
      `;
      addForm.style.display = 'none';
      return;
    }

    addForm.style.display = 'flex';
    listContainer.innerHTML = activePackingList.map((item, idx) => `
      <div class="checklist-item ${item.checked ? 'checked' : ''}" data-idx="${idx}">
        <input type="checkbox" ${item.checked ? 'checked' : ''}>
        <span>${item.text}</span>
      </div>
    `).join('');

    // Attach checking events
    listContainer.querySelectorAll('.checklist-item').forEach(itemEl => {
      itemEl.addEventListener('click', (e) => {
        // Toggle checking
        const idx = parseInt(itemEl.dataset.idx);
        activePackingList[idx].checked = !activePackingList[idx].checked;
        renderChecklist();
      });
    });
  };

  genBtn.addEventListener('click', () => {
    const destSelect = document.getElementById('packing-dest');
    const daysInput = document.getElementById('packing-days');
    const destId = destSelect.value;
    const days = parseInt(daysInput.value) || 5;

    if (!destId) {
      showToast("Please choose a destination first!");
      return;
    }

    const dest = destinations.find(d => d.id === destId);
    if (!dest) return;

    // Compile customized list
    const items = [
      { text: "Passport & Visas (Check expiry!)", checked: false },
      { text: "Travel insurance copy", checked: false },
      { text: `Toiletries (tooth brush, toothpaste)`, checked: false },
      { text: "Universal power adapter & charging cables", checked: false },
      { text: `Underwear & socks (x${days})`, checked: false },
      { text: "Phone, headphones & powerbank", checked: false }
    ];

    // Climate-specific logic
    if (dest.climate === "Tropical") {
      items.push(
        { text: "Swimwear / Boardshorts", checked: false },
        { text: "High SPF Sunscreen & Aftersun", checked: false },
        { text: "Mosquito repellent spray", checked: false },
        { text: "Sunglasses & wide-brim hat", checked: false },
        { text: "Breathable cotton clothing", checked: false }
      );
    } else if (dest.climate === "Cold") {
      items.push(
        { text: "Heavy down coat / Parka", checked: false },
        { text: "Thermal base layers (top & bottom)", checked: false },
        { text: "Waterproof gloves & beanie", checked: false },
        { text: "Lip balm & moisturizer", checked: false },
        { text: "Thick woolen hiking socks", checked: false }
      );
    } else if (dest.climate === "Temperate") {
      items.push(
        { text: "Light windbreaker or rain jacket", checked: false },
        { text: "Comfortable walking sneakers", checked: false },
        { text: "Jeans and layering sweaters", checked: false },
        { text: "Refillable water bottle", checked: false }
      );
    } else if (dest.climate === "Desert") {
      items.push(
        { text: "UV-blocking sunglasses", checked: false },
        { text: "Lightweight long-sleeve linen shirts", checked: false },
        { text: "Sun hat & sunscreen", checked: false },
        { text: "Hydration tablets / electrolytes", checked: false },
        { text: "Skin moisturizer & lip ointment", checked: false }
      );
    }

    activePackingList = items;
    showToast("Smart packing list generated!");
    renderChecklist();
  });

  // Custom Item Submission
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('custom-item-input');
    const text = input.value.trim();
    if (text) {
      activePackingList.push({ text: text, checked: false });
      input.value = '';
      renderChecklist();
    }
  });
}

// Budget Calculator logic
function setupBudgetListeners() {
  const flightsIn = document.getElementById('budget-flights');
  const lodgingIn = document.getElementById('budget-lodging');
  const daysIn = document.getElementById('budget-days');
  const foodIn = document.getElementById('budget-food');
  const actIn = document.getElementById('budget-activities');

  const onInput = () => {
    budgetState.flights = parseFloat(flightsIn.value) || 0;
    budgetState.lodgingPerNight = parseFloat(lodgingIn.value) || 0;
    budgetState.days = parseInt(daysIn.value) || 1;
    budgetState.dailyFood = parseFloat(foodIn.value) || 0;
    budgetState.activities = parseFloat(actIn.value) || 0;
    
    calculateBudget();
  };

  flightsIn.addEventListener('input', onInput);
  lodgingIn.addEventListener('input', onInput);
  daysIn.addEventListener('input', onInput);
  foodIn.addEventListener('input', onInput);
  actIn.addEventListener('input', onInput);
}

function calculateBudget() {
  const flights = budgetState.flights;
  const lodgingTotal = budgetState.lodgingPerNight * budgetState.days;
  const foodTotal = budgetState.dailyFood * budgetState.days;
  const activities = budgetState.activities;

  const total = flights + lodgingTotal + foodTotal + activities;

  // Display total
  const display = document.getElementById('budget-total-display');
  if (display) {
    display.textContent = `$${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }

  // Display breakdown
  const breakdown = document.getElementById('budget-breakdown');
  if (breakdown && total > 0) {
    const flightPct = Math.round((flights / total) * 100) || 0;
    const lodgingPct = Math.round((lodgingTotal / total) * 100) || 0;
    const foodPct = Math.round((foodTotal / total) * 100) || 0;
    const actPct = Math.round((activities / total) * 100) || 0;

    breakdown.innerHTML = `
      <h4 style="color: var(--text-main); margin-bottom: 6px; font-weight: bold;">Cost Allocation Breakdown:</h4>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <div>✈️ Flights: <strong>${flightPct}%</strong> ($${flights})</div>
        <div>🏨 Lodging: <strong>${lodgingPct}%</strong> ($${lodgingTotal})</div>
        <div>🍽️ Food & Transit: <strong>${foodPct}%</strong> ($${foodTotal})</div>
        <div>🎟️ Activities: <strong>${actPct}%</strong> ($${activities})</div>
      </div>
    `;
  } else if (breakdown) {
    breakdown.innerHTML = '';
  }
}

function setupActiveDestListener() {
  const activeDestSelect = document.getElementById('planner-active-dest');
  if (!activeDestSelect) return;
  
  const loadTemplate = (destId) => {
    if (!destId) {
      document.getElementById('load-dest-status').textContent = '';
      return;
    }
    
    const dest = destinations.find(d => d.id === destId);
    if (!dest) return;
    
    // 1. Sync packing destination dropdown & days
    const packingDest = document.getElementById('packing-dest');
    const packingDays = document.getElementById('packing-days');
    if (packingDest) packingDest.value = destId;
    if (packingDays) packingDays.value = dest.duration;
    
    // 2. Load budgetState values
    const flightsIn = document.getElementById('budget-flights');
    const lodgingIn = document.getElementById('budget-lodging');
    const daysIn = document.getElementById('budget-days');
    const foodIn = document.getElementById('budget-food');
    const actIn = document.getElementById('budget-activities');
    
    budgetState.flights = dest.estimatedBudget.flights;
    budgetState.lodgingPerNight = dest.estimatedBudget.lodgingPerNight;
    budgetState.days = dest.duration;
    budgetState.dailyFood = dest.estimatedBudget.dailyFood;
    budgetState.activities = dest.estimatedBudget.activities;
    
    if (flightsIn) flightsIn.value = budgetState.flights;
    if (lodgingIn) lodgingIn.value = budgetState.lodgingPerNight;
    if (daysIn) daysIn.value = budgetState.days;
    if (foodIn) foodIn.value = budgetState.dailyFood;
    if (actIn) actIn.value = budgetState.activities;
    
    // 3. Trigger recalculation
    calculateBudget();
    
    // 4. Trigger packing checklist generation
    const genBtn = document.getElementById('generate-packing-btn');
    if (genBtn) {
      genBtn.click();
    }
    
    // Update status message
    const statusMsg = document.getElementById('load-dest-status');
    if (statusMsg) {
      statusMsg.textContent = `✓ ${dest.name} template loaded`;
      setTimeout(() => {
        statusMsg.textContent = '';
      }, 3000);
    }
  };
  
  activeDestSelect.addEventListener('change', (e) => {
    loadTemplate(e.target.value);
  });
  
  // Check deep link from details page
  const deepLinkDest = localStorage.getItem('wl-active-planner-dest');
  if (deepLinkDest) {
    localStorage.removeItem('wl-active-planner-dest');
    // Set the value in dropdown
    activeDestSelect.value = deepLinkDest;
    // Load template
    loadTemplate(deepLinkDest);
  }
}

