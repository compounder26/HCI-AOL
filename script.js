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

// Preserve your existing tab functionality
document.addEventListener("DOMContentLoaded", function () {
// Get all clickable cards
const cards = document.querySelectorAll(".card-clickable");

// Function to show content for a specific tab
function showTab(tabId) {
  document.querySelectorAll(".card-clickable").forEach((content) => {
    content.classList.remove("active");
  });

  const selectedTab = document.getElementById(`${tabId}-nav`);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }
  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });

  // Show selected tab content
  const selectedContent = document.getElementById(`${tabId}-content`);
  if (selectedContent) {
    selectedContent.classList.add("active");
  }

  // Update URL hash
  window.location.hash = tabId;
}

// Add click event to cards
cards.forEach((card) => {
  card.addEventListener("click", function () {
    const tabId = this.getAttribute("data-tab");
    showTab(tabId);
  });
});

function checkInitialHash() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    showTab(hash);
  } else {
    showTab("calories");
  }
}

// Listen for hash changes
window.addEventListener("hashchange", checkInitialHash);

// Check initial hash when page loads
checkInitialHash();

// Initialize modal functionality
initializeModals();

// Your existing macro nutrients functionality
const buttons = document.querySelectorAll(".macro-nutrients");
const image = document.querySelector(".right-content img");

// Map button types to image paths
const images = {
  breakfast: "images/breakfast.png",
  lunch: "images/lunch.png",
  dinner: "images/dinner.png",
  rank: "images/rank.png",
};

// Add click event listeners to each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const mealType = button.querySelector("p").textContent.toLowerCase();
    if (images[mealType]) {
      image.src = images[mealType];
    }

    // Highlight the active button
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

// Initialize water intake buttons
const waterIntakeButtons = document.querySelectorAll(".water-intake");
waterIntakeButtons.forEach((waterIntakeButton) => {
  waterIntakeButton.addEventListener("click", () => {
    waterIntakeButtons.forEach((waterBtn) => waterBtn.classList.remove("active"));
    waterIntakeButton.classList.add("active");
  });
});
});

// Initialize Charts
const ctx = document.getElementById("calories-chart");
if (ctx) {
const data = {
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

const options = {
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

new Chart(ctx, config);
}

// Initialize Water Chart
const waterCanvas = document.getElementById("polarAreaChart");
if (waterCanvas) {
const waterCtx = waterCanvas.getContext("2d");
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

const waterData = {
  labels: ["12:00", "15:00", "18:00", "21:00", "00:00", "03:00", "06:00", "09:00"],
  datasets: [{
    label: "Water Consumption",
    data: [0.5, 1.2, 2.5, 3.0, 2.8, 1.0, 0.7, 0.6],
    backgroundColor: waterGradient,
    borderWidth: 1,
  }],
};

const waterOptions = {
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
};

new Chart(waterCtx, {
  type: "polarArea",
  data: waterData,
  options: waterOptions,
});
}

// Modal initialization function
function initializeModals() {
// Initialize Add Record Modal functionality
const addRecordModal = document.getElementById('addRecordModal');
if (addRecordModal) {
  // Reset form when modal is hidden
  addRecordModal.addEventListener('hidden.bs.modal', function () {
    backToSelection();
  });

  // Initialize form-specific listeners
  initializeFormListeners();
}
}

// Initialize form-specific event listeners
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
const waterButtons = document.querySelectorAll('.quick-add-buttons .btn');
waterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const amount = parseInt(btn.querySelector('span').textContent);
    updateWaterProgress(amount);
  });
});

// Sleep factors
document.querySelectorAll('.sleep-factors .btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('btn-outline-dark');
    btn.classList.toggle('btn-dark');
  });
});
}

// Water progress update function
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