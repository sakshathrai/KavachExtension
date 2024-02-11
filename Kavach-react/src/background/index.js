import { runtime, storage, tabs, action } from "webextension-polyfill";
import { setAutoScanPermit, setDpCount } from "../helper/storage";

runtime.onMessage.addListener(async (message) => {
  if (message.to === "background") {
    switch (message.action) {
      case "updateBadgeText": {
        handleDpCount(message.count);
        break;
      }
      default: {
        console.log("Unknown Message");
      }
    }
  }
});

function initializeStorageCount() {
  setDpCount(0);
  setAutoScanPermit("Allow");
  setDpPatternCount({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });
}

tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading") {
    initializeStorageCount();
  }
});

tabs.onCreated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading") {
    initializeStorageCount();
  }
});

export async function init() {
  // await storage.local.clear();
  // tabs.onActivated.addListener(async (activeInfo) => {
  //   const tab = await tabs.get(activeInfo.tabId);
  //   if (tab) {
  //     tabs.sendMessage(activeInfo.tabId, {
  //       from: "background",
  //       to: "content",
  //       action: "tabActivated",
  //     });
  //   }
  // });
  console.log("[Extension] is Active");
}

function handleDpCount(DP_COUNT) {
  if (DP_COUNT === 0) {
    action.setBadgeText({ text: "" });
  } else if (DP_COUNT > 0 && DP_COUNT < 100) {
    action.setBadgeText({ text: String(DP_COUNT) });
  } else if (DP_COUNT > 100) {
    action.setBadgeText({ text: "99+" });
  }
}

runtime.onInstalled.addListener(async () => {
  await init();
  console.log("[background] loaded ");
});
