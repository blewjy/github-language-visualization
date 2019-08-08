// Calling this function will simply render a chart based on the given chartType and data
// Data format: an object containing three arrays: labels, values, colors
function render(chartType, data) {
  switch (chartType) {
    case "bar":
      renderBarChart(data);
      break;
    case "pie":
      renderPieChart(data);
      break;
    default:
      renderBarChart(data);
  }
}

function renderBarChart(data) {
  if (chartReference) chartReference.destroy();
  chartReference = new Chart(document.getElementById("lang-chart"), {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.values,
          backgroundColor: data.colors,
          borderColor: data.colors,
          borderWidth: 1
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
  makeChartVisibleIfRequired();
}

function renderPieChart(data) {
  if (chartReference) chartReference.destroy();
  chartReference = new Chart(document.getElementById("lang-chart"), {
    type: "pie",
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.values,
          backgroundColor: data.colors,
          borderColor: data.colors,
          borderWidth: 1
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
  makeChartVisibleIfRequired();
}

// When you destroy the chart, the display is set to 'none'. So if the details is open, we need to show the chart manually.
// I think it's probably because when you destroy the chart, the canvas goes back to the initial setting (which is display: 'none', as defined by myself in script.js)
function makeChartVisibleIfRequired() {
  const details = document.querySelector(
    "div.repository-content details.details-reset"
  );
  if (details.hasAttribute("open")) {
    let ctx = document.getElementById("lang-chart");
    ctx.style.display = null;
  }
}

chrome.storage.sync.get("chartType", function(data) {
  render(data.chartType, getRepoData());
});
