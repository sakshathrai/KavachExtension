// background/background.js
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log("Hello2");
    if (msg.action === "updateIcon") {
      if (msg.value == true) {
        chrome.action.setBadgeText({ text: "!" });
      } else {
        chrome.action.setBadgeText({ text: "" });
      }
    }
  });
  
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log("Hello1");
    if (
      changeInfo.status == "complete" &&
      tab.status == "complete" &&
      tab.url != undefined
    ) {
      chrome.storage.local.get("url", function (data) {
        if (data.url !== tab.url) {
          chrome.storage.local.set({ url: tab.url });
          chrome.tabs.sendMessage(tabId, true);
        }
      });
    }
  });
  
  chrome.storage.onChanged.addListener((changes, area) => {
    console.log("Hello3");
    if (area === "sync" && changes.options?.newValue) {
      const adsMode = Boolean(changes.options.newValue.ads);
      chrome.storage.local.set({ highlightAds: adsMode });
    }
  });
  