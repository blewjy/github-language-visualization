// Calling this function will simply render a chart based on the given chartType and data
// Data format: an object containing three arrays: labels, values, colors
function render(chartType, data) {
  if (!data) return;

  switch (chartType) {
    case "bar":
      renderBarChart(data);
      break;
    case "pie":
      renderPieChart(data);
      break;
    case "doughnut":
      renderDoughnutChart(data);
      break;
    case "polar":
      renderPolarChart(data);
      break;
    case "off":
      hideAllCharts();
      break;
    default:
      renderBarChart(data);
  }
}

function renderBarChart(data) {
  if (chartReference) chartReference.destroy();
  let canvas = document.getElementById("lang-chart")
  canvas.height = 150;
  chartReference = new Chart(canvas, {
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
              beginAtZero: true,
              callback: function(label) {
                return label + "% ";
              }
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              display: false
            }
          }
        ]
      },
      tooltips: {
        xAlign: "center",
        yPadding: 10,
        xPadding: 10,
        caretPadding: 10,
        caretSize: 0,
        callbacks: {
          label: function(label) {
            return " " + label.value + "%";
          }
        }
      }
    }
  });
  makeChartVisibleIfRequired();
}

function renderPieChart(data) {
  if (chartReference) chartReference.destroy();
  let canvas = document.getElementById("lang-chart")
  canvas.height = 100;
  chartReference = new Chart(canvas, {
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
        display: false
      },
      tooltips: {
        yAlign: "center",
        xAlign: "center",
        yPadding: 10,
        xPadding: 10,
        caretSize: 0,
        callbacks: {
          title: function(tooltipItem, data) {
            return data["labels"][tooltipItem[0]["index"]];
          },
          label: function(tooltipItem, data) {
            return " " + data["datasets"][0]["data"][tooltipItem["index"]] + "%";
          }
        }
      }
    }
  });
  makeChartVisibleIfRequired();
}

function renderDoughnutChart(data) {
  if (chartReference) chartReference.destroy();
  let canvas = document.getElementById("lang-chart")
  canvas.height = 100;
  chartReference = new Chart(canvas, {
    type: "doughnut",
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
        display: false
      },
      tooltips: {
        yAlign: "center",
        xAlign: "center",
        yPadding: 10,
        xPadding: 10,
        caretSize: 0,
        callbacks: {
          title: function(tooltipItem, data) {
            return data["labels"][tooltipItem[0]["index"]];
          },
          label: function(tooltipItem, data) {
            return " " + data["datasets"][0]["data"][tooltipItem["index"]] + "%";
          }
        }
      }
    }
  });
  makeChartVisibleIfRequired();
}

function renderPolarChart(data) {
  if (chartReference) chartReference.destroy();
  let canvas = document.getElementById("lang-chart")
  canvas.height = 100;
  chartReference = new Chart(canvas, {
    type: "polarArea",
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.values,
          backgroundColor: data.colors.map(color => color.slice(0, -1) + ", 0.7)"),
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
        display: false
      },
      tooltips: {
        yAlign: "center",
        xAlign: "center",
        yPadding: 10,
        xPadding: 10,
        caretSize: 0,
        callbacks: {
          title: function(tooltipItem, data) {
            return data["labels"][tooltipItem[0]["index"]];
          },
          label: function(tooltipItem, data) {
            return " " + data["datasets"][0]["data"][tooltipItem["index"]] + "%";
          }
        }
      }
    }
  });
  makeChartVisibleIfRequired();
}


function hideAllCharts() {
  let ctx = document.getElementById("lang-chart");
  ctx.style.display = "none";

  const container = document.querySelector(
    "div.repository-content details.details-reset summary div.d-flex.repository-lang-stats-graph"
  );
  if (!container) return;

  const bars = container.getElementsByTagName("span");
  if (!bars) return;

  for (let bar of bars) {
    bar.style.display = null;
  }
}

// When you destroy the chart, the display is set to 'none'. So if the details is open, we need to show the chart manually.
// I think it's probably because when you destroy the chart, the canvas goes back to the initial setting (which is display: 'none', as defined by myself in script.js)
function makeChartVisibleIfRequired() {
  const container = document.querySelector(
    "div.repository-content details.details-reset summary div.d-flex.repository-lang-stats-graph"
  );
  if (!container) return;

  const summary = container.parentNode;
  if (!summary) return;

  const details = summary.parentNode;
  if (!details) return;
  
  if (details.hasAttribute("open")) {
    let ctx = document.getElementById("lang-chart");
    ctx.style.display = null;
  }
}

chrome.storage.sync.get("chartType", function(data) {
  render(data.chartType, getRepoData());
});
