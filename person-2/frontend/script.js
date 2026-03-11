const executionTimeText = document.getElementById("execution-time");
const refreshBtn = document.getElementById("refreshBtn");
const dietFilter = document.getElementById("dietFilter");

let barChart;
let lineChart;
let pieChart;

const dummyData = [
  { diet: "Keto", calories: 2200, protein: 140, count: 25 },
  { diet: "Vegan", calories: 1800, protein: 90, count: 30 },
  { diet: "Mediterranean", calories: 2000, protein: 110, count: 20 },
  { diet: "Paleo", calories: 2100, protein: 130, count: 25 }
];

function getFilteredData(selectedDiet) {
  if (selectedDiet === "all") {
    return dummyData;
  }
  return dummyData.filter(item => item.diet === selectedDiet);
}

function buildChartData(data) {
  return {
    labels: data.map(item => item.diet),
    calories: data.map(item => item.calories),
    protein: data.map(item => item.protein),
    counts: data.map(item => item.count)
  };
}

function renderCharts(data) {
  const chartData = buildChartData(data);

  if (barChart) barChart.destroy();
  if (lineChart) lineChart.destroy();
  if (pieChart) pieChart.destroy();

  barChart = new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: "Average Calories",
          data: chartData.calories,
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true
        }
      }
    }
  });

  lineChart = new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: "Average Protein",
          data: chartData.protein,
          fill: false,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  pieChart = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: "Diet Distribution",
          data: chartData.counts
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

function loadDashboard(data, execTime = "1.24s") {
  executionTimeText.textContent = `Function Execution Time: ${execTime}`;
  renderCharts(data);
}

dietFilter.addEventListener("change", () => {
  const filtered = getFilteredData(dietFilter.value);
  loadDashboard(filtered, "1.24s");
});

refreshBtn.addEventListener("click", () => {
  const filtered = getFilteredData(dietFilter.value);
  loadDashboard(filtered, "1.18s");
});

loadDashboard(dummyData, "1.24s");