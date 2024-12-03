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
      const mealType = button.querySelector("p").textContent.toLowerCase(); // Get the button text (e.g., "Breakfast")
      if (images[mealType]) {
        image.src = images[mealType]; // Update the image src
      }

      // Highlight the active button
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  const defaultButton = Array.from(buttons).find(
    (btn) => btn.querySelector("p").textContent.toLowerCase() === "breakfast"
  );
  if (defaultButton) {
    defaultButton.click(); // Trigger the click event programmatically
  }

  const waterIntakeButtons = document.querySelectorAll(".water-intake");

  waterIntakeButtons.forEach((waterIntakeButton) => {
    waterIntakeButton.addEventListener("click", () => {
      // Highlight the active button
      waterIntakeButtons.forEach((waterBtn) =>
        waterBtn.classList.remove("active")
      );
      waterIntakeButton.classList.add("active");
    });
  });
});

const ctx = document.getElementById("calories-chart");

const data = {
  labels: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  datasets: [
    {
      label: "Calories Consumed",
      data: [1500, 1800, 3000, 1200, 2500, 2000, 1000], // Your data points
      borderColor: "orange",
      backgroundColor: "rgba(255, 165, 0, 0.5)",
      tension: 0, // Smooth curve
      pointStyle: "circle",
      pointRadius: 6,
      pointHoverRadius: 8,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Hides the legend
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
          backgroundColor: "transparent",
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

const config = {
  type: "line",
  data: data,
  options: options,
};

new Chart(ctx, config);

// Get the canvas element
const waterCanvas = document.getElementById("polarAreaChart").getContext("2d");

// Create the gradient
const waterGradient = waterCanvas.createRadialGradient(
  waterCanvas.canvas.width / 2, // x0: Center X of the canvas
  waterCanvas.canvas.height / 2, // y0: Center Y of the canvas
  0, // r0: Inner radius
  waterCanvas.canvas.width / 2, // x1: Center X of the canvas
  waterCanvas.canvas.height / 2, // y1: Center Y of the canvas
  waterCanvas.canvas.width / 2 // r1: Outer radius
);

// Define gradient colors
waterGradient.addColorStop(0.5, "#2244dc"); // Dark water color
waterGradient.addColorStop(1, "rgba(34, 68, 220, 0.2)"); // Dark water color with 70% transparency

// Define the data for the chart
const waterData = {
  labels: [
    "12:00",
    "15:00",
    "18:00",
    "21:00",
    "00:00",
    "03:00",
    "06:00",
    "09:00",
  ],
  datasets: [
    {
      label: "Water Consumption",
      data: [0.5, 1.2, 2.5, 3.0, 2.8, 1.0, 0.7, 0.6], // Data values
      backgroundColor: waterGradient, // Apply gradient as background color
      borderWidth: 1,
    },
  ],
};

// Define the chart options
const waterOptions = {
  responsive: true,
  plugins: {
    legend: false, // Disable the legend
  },
  scales: {
    r: {
      angleLines: {
        display: true, // Display angle lines
      },
      pointLabels: {
        display: true, // Display point labels
      },
      ticks: {
        stepSize: 1, // Step size for radial ticks
        callback: function (value) {
          return value + "L"; // Append "L" to tick labels
        },
      },
    },
  },
};

// Create the chart
new Chart(waterCanvas, {
  type: "polarArea",
  data: waterData,
  options: waterOptions,
});
