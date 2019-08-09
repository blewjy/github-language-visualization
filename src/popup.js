let pie = document.getElementById("pie");
let doughnut = document.getElementById("doughnut");
let bar = document.getElementById("bar");
let polar = document.getElementById("polar");
let off = document.getElementById("off");

pie.onclick = function(element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.storage.sync.get("chartType", function(data) {
      if (data.chartType !== "pie") {
        chrome.storage.sync.set({ chartType: "pie" });
        chrome.tabs.executeScript(tabs[0].id, { file: "src/render.js" });
      }
    });
  });
};

doughnut.onclick = function(element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.storage.sync.get("chartType", function(data) {
      if (data.chartType !== "doughnut") {
        chrome.storage.sync.set({ chartType: "doughnut" });
        chrome.tabs.executeScript(tabs[0].id, { file: "src/render.js" });
      }
    });
  });
};

bar.onclick = function(element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.storage.sync.get("chartType", function(data) {
      if (data.chartType !== "bar") {
        chrome.storage.sync.set({ chartType: "bar" });
        chrome.tabs.executeScript(tabs[0].id, { file: "src/render.js" });
      }
    });
  });
};

polar.onclick = function(element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.storage.sync.get("chartType", function(data) {
      if (data.chartType !== "polar") {
        chrome.storage.sync.set({ chartType: "polar" });
        chrome.tabs.executeScript(tabs[0].id, { file: "src/render.js" });
      }
    });
  });
};


off.onclick = function(element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.storage.sync.get("chartType", function(data) {
      if (data.chartType !== "off") {
        chrome.storage.sync.set({ chartType: "off" });
        chrome.tabs.executeScript(tabs[0].id, { file: "src/render.js" });
      }
    });
  });
};
