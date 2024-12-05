// Define modal functions in global scope
window.showForm = function(type) {
  const recordTypeSelection = document.getElementById('recordTypeSelection');
  const selectedForm = document.getElementById(`${type}Form`);
  
  if (recordTypeSelection && selectedForm) {
      // Hide all forms first
      document.querySelectorAll('.record-form').forEach(form => {
          form.style.display = 'none';
      });
      
      // Hide selection and show selected form
      recordTypeSelection.style.display = 'none';
      selectedForm.style.display = 'block';
  }
};

window.backToSelection = function() {
  const recordTypeSelection = document.getElementById('recordTypeSelection');
  
  if (recordTypeSelection) {
      // Hide all forms
      document.querySelectorAll('.record-form').forEach(form => {
          form.style.display = 'none';
      });
      // Show selection
      recordTypeSelection.style.display = 'block';
  }
};

// Initialize Charts Data
const caloriesChartData = {
labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
datasets: [{
  label: "Calories Consumed",
  data: [1500, 1800, 3000, 1200, 2500, 2000, 1000],
  borderColor: "orange",
  backgroundColor: "rgba(255, 165, 0, 0.5)",
  tension: 0,
  pointStyle: "circle",
  pointRadius: 6,
  pointHoverRadius: 8,
}],
};

const caloriesChartOptions = {
responsive: true,
plugins: {
  legend: {
    display: false,
  },
  annotation: {
    annotations: {
      averageLine: {
        type: "line",
        yMin: 2800,
        yMax: 2800,
        borderColor: "red",
        borderDash: [6, 6],
        label: {
          backgroundColor: "transparent",
          color: "red",
          content: "Daily Average 2800 cal",
          enabled: true,
          position: "end",
          display: true,
          yAdjust: -15,
        },
      },
      todayLine: {
        type: "line",
        yMin: 2000,
        yMax: 2000,
        borderColor: "brown",
        borderDash: [6, 6],
        label: {
          backgroundColor: "transparent",
          color: "brown",
          content: "Today 2000 cal",
          enabled: true,
          position: "end",
          display: true,
          yAdjust: -15,
        },
      },
    },
  },
},
scales: {
  y: {
    suggestedMax: 3500,
    beginAtZero: true,
    ticks: {
      callback: function (value) {
        return value + " cal";
      },
    },
  },
},
};

// Main initialization when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
// Initialize tabs functionality
initializeTabs();

// Initialize modal functionality
initializeModals();

// Initialize macro nutrients
initializeMacroNutrients();

// Initialize water intake buttons
initializeWaterIntakeButtons();

// Initialize charts
initializeCharts();
});

// Tabs functionality
function initializeTabs() {
const cards = document.querySelectorAll(".card-clickable");

cards.forEach((card) => {
  card.addEventListener("click", function () {
    const tabId = this.getAttribute("data-tab");
    showTab(tabId);
  });
});

function showTab(tabId) {
  document.querySelectorAll(".card-clickable").forEach((content) => {
    content.classList.remove("active");
  });

  const selectedTab = document.getElementById(`${tabId}-nav`);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });

  const selectedContent = document.getElementById(`${tabId}-content`);
  if (selectedContent) {
    selectedContent.classList.add("active");
  }

  window.location.hash = tabId;
}

// Check initial hash
const hash = window.location.hash.substring(1);
if (hash) {
  showTab(hash);
} else {
  showTab("calories");
}

// Listen for hash changes
window.addEventListener("hashchange", function() {
  const newHash = window.location.hash.substring(1);
  if (newHash) {
    showTab(newHash);
  }
});
}

// Charts initialization
function initializeCharts() {
// Calories Chart
const caloriesCtx = document.getElementById("calories-chart");
if (caloriesCtx) {
  new Chart(caloriesCtx, {
    type: "line",
    data: caloriesChartData,
    options: caloriesChartOptions
  });
}

// Water Chart
const waterCanvas = document.getElementById("polarAreaChart");
if (waterCanvas) {
  const waterCtx = waterCanvas.getContext("2d");
  
  // Create gradient
  const waterGradient = waterCtx.createRadialGradient(
    waterCanvas.width / 2,
    waterCanvas.height / 2,
    0,
    waterCanvas.width / 2,
    waterCanvas.height / 2,
    waterCanvas.width / 2
  );
  waterGradient.addColorStop(0.5, "#2244dc");
  waterGradient.addColorStop(1, "rgba(34, 68, 220, 0.2)");

  new Chart(waterCtx, {
    type: "polarArea",
    data: {
      labels: ["12:00", "15:00", "18:00", "21:00", "00:00", "03:00", "06:00", "09:00"],
      datasets: [{
        label: "Water Consumption",
        data: [0.5, 1.2, 2.5, 3.0, 2.8, 1.0, 0.7, 0.6],
        backgroundColor: waterGradient,
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: false,
      },
      scales: {
        r: {
          angleLines: {
            display: true,
          },
          pointLabels: {
            display: true,
          },
          ticks: {
            stepSize: 1,
            callback: function (value) {
              return value + "L";
            },
          },
        },
      },
    },
  });
}
}

// Macro nutrients initialization
function initializeMacroNutrients() {
const buttons = document.querySelectorAll(".macro-nutrients");
const image = document.querySelector(".right-content img");

const images = {
  breakfast: "images/breakfast.png",
  lunch: "images/lunch.png",
  dinner: "images/dinner.png",
  rank: "images/rank.png",
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const mealType = button.querySelector("p").textContent.toLowerCase();
    if (images[mealType]) {
      image.src = images[mealType];
    }

    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// Set default button
const defaultButton = Array.from(buttons).find(
  (btn) => btn.querySelector("p").textContent.toLowerCase() === "breakfast"
);
if (defaultButton) {
  defaultButton.click();
}
}

// Water intake buttons initialization
function initializeWaterIntakeButtons() {
const waterIntakeButtons = document.querySelectorAll(".water-intake");
waterIntakeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    waterIntakeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});
}

// Modal functionality
function initializeModals() {
const addRecordModal = document.getElementById('addRecordModal');
if (addRecordModal) {
  addRecordModal.addEventListener('hidden.bs.modal', backToSelection);
  initializeFormListeners();
}
}

function initializeFormListeners() {
// Sleep quality selectors
document.querySelectorAll('.sleep-quality-option').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.sleep-quality-option').forEach(opt => 
      opt.classList.remove('active')
    );
    option.classList.add('active');
  });
});

// Exercise type cards
document.querySelectorAll('.exercise-type-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.exercise-type-card').forEach(c => 
      c.classList.remove('active')
    );
    card.classList.add('active');
  });
});

// Meal time selector
document.querySelectorAll('.meal-time-selector .btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.meal-time-selector .btn').forEach(b => 
      b.classList.remove('active')
    );
    btn.classList.add('active');
  });
});

// Water tracking
initializeWaterTracking();
}

function initializeWaterTracking() {
const waterButtons = document.querySelectorAll('.quick-add-buttons .btn');
waterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const amount = parseInt(btn.querySelector('span').textContent);
    if (!isNaN(amount)) {
      updateWaterProgress(amount);
    }
  });
});

const customInput = document.querySelector('.custom-amount input');
if (customInput) {
  customInput.addEventListener('change', (e) => {
    const amount = parseInt(e.target.value);
    if (!isNaN(amount) && amount > 0) {
      updateWaterProgress(amount);
    }
  });
}
}

function updateWaterProgress(amount) {
const waterLevel = document.querySelector('.water-level');
const currentText = document.querySelector('.water-animation + h3');

if (waterLevel && currentText) {
  const [current, total] = currentText.textContent.split('/').map(str => 
    parseFloat(str.trim().replace('L', ''))
  );
  
  let newAmount = current + (amount / 1000);
  if (newAmount > total) newAmount = total;
  
  const percentage = (newAmount / total) * 100;
  waterLevel.style.height = `${percentage}%`;
  currentText.textContent = `${newAmount.toFixed(1)}L / ${total}L`;
  
  const percentText = document.querySelector('.water-animation + h3 + p');
  if (percentText) {
    percentText.textContent = `${Math.round(percentage)}% of daily goal`;
  }
}
}