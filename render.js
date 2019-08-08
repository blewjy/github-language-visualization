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
