let pie = document.getElementById("pie");
let bar = document.getElementById("bar");

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