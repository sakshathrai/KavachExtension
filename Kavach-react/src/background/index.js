import { runtime, storage, tabs, action } from "webextension-polyfill";

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
}

function handleDpCount(DP_COUNT) {
  if (DP_COUNT >= 0 && DP_COUNT < 100) {
    action.setBadgeText({ text: String(DP_COUNT) });
  } else if (DP_COUNT > 100) {
    action.setBadgeText({ text: "99+" });
  }
}

runtime.onInstalled.addListener(async () => {
  await init();
  console.log("[background] loaded ");
});
