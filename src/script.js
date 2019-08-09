"use strict";

// Global variable to reference the chart on page
let chartReference = null;

function addDetailsListener() {
  const container = document.querySelector(
    "div.repository-content details.details-reset summary div.d-flex.repository-lang-stats-graph"
  );
  if (!container) return;

  const summary = container.parentNode;
  if (!summary) return;

  const details = summary.parentNode;
  if (!details) return;

  const bars = container.getElementsByTagName("span");
  if (!bars) return;

  details.addEventListener("toggle", function() {
    chrome.storage.sync.get("chartType", function(data) {
      if (details.hasAttribute("open") && data.chartType !== "off") {
        // When toggling open: hide span and show chart
        for (let bar of bars) {
          bar.style.display = "none";
        }
        document.getElementById("lang-chart").style.display = null;
      } else {
        // When toggling close: hide chart and show spans
        document.getElementById("lang-chart").style.display = "none";
        for (let bar of bars) {
          bar.style.display = null;
        }
      }
    });
  });
}

function insertCanvas() {
  const container = document.querySelector(
    "div.repository-content details.details-reset summary div.d-flex.repository-lang-stats-graph"
  );
  if (!container) return;

  var canvas = document.createElement("canvas");
  canvas.id = "lang-chart";
  canvas.style.display = "none";
  canvas.style.padding = "10px";
  container.appendChild(canvas);
}

function getRepoData() {
  let data = {
    labels: [],
    values: [],
    colors: []
  };

  // Parse the name of the language and the percentage and populate data and colors
  const ol = document.querySelector("ol.repository-lang-stats-numbers");
  if (!ol) return;

  var items = ol.getElementsByTagName("li");
  if (!items) return;

  for (var i = 0; i < items.length; i++) {
    const li = items[i];
    const a =
      li.getElementsByTagName("a")[0] || li.getElementsByTagName("span")[0];
    if (!a) return;

    let language = a.getElementsByClassName("lang")[0].innerHTML;
    const percent = a.getElementsByClassName("percent")[0].innerHTML;
    const color = a.getElementsByClassName("color-block language-color")[0]
      .style.backgroundColor;

    data.labels.push(language);
    data.values.push(parseFloat(percent));
    data.colors.push(color);
  }

  return data;
}

addDetailsListener();
insertCanvas();
