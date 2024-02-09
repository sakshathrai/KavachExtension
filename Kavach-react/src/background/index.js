import { runtime, storage, tabs } from "webextension-polyfill";

async function getCurrentTab() {
  const list = await tabs.query({ active: true });
  console.log(list);
  return list[0];
}

async function incrementStoredValue(tabId) {
  const data = await storage.local.get(tabId);
  const currentValue = data?.[tabId] ?? 0;

  return storage.local.set({ [tabId]: currentValue + 1 });
}

export async function init() {
  await storage.local.clear();

  runtime.onMessage.addListener(async (message) => {
    if (message.to === "background") {
      console.log("background handled: ", message.action);
      const tab = await getCurrentTab();
      const tabId = tab.id;

      if (tabId) {
        return incrementStoredValue(tabId.toString());
      }
    }
  });

  tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await tabs.get(activeInfo.tabId);
    if (tab) {
      tabs.sendMessage(tab.id, {
        from: "background",
        to: "content",
        action: "tabActivated",
      });
    }
  });
  // runtime.sendMessage({
  //   to: "counter",
  //   from: "background",
  // });
}

runtime.onInstalled.addListener(() => {
  init().then(() => {
    console.log("[background] loaded ");
  });
});
