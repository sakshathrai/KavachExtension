chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status === "loading") {
        chrome.tabs.sendMessage(tabId, { message: "tab_updated" });
      }
    });
  });
  