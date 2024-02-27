import { runtime, storage, tabs, action } from "webextension-polyfill";
import {
  getCurrentSite,
  setAutoScanPermit,
  setCurrentSite,
  setDpCount,
  setDpPatternCount,
} from "../helper/storage";
import { getCurrentTab } from "../helper/tabs";

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

tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading") {
    initializeStorageCount();
    const currentTab = await getCurrentTab();
    if (currentTab) {
      const baseUrl = new URL(currentTab.url).origin;
      setCurrentSite(baseUrl);
    }
  }
});

tabs.onCreated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo && changeInfo.status === "complete") {
    initializeStorageCount();
    const currentTab = await getCurrentTab();
    if (currentTab) {
      const baseUrl = new URL(currentTab.url).origin;
      setCurrentSite(baseUrl);
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

runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message Received");
  if (message.action === "fetchData") {
    fetch("https://pricehistory.app/api/embed", {
      method: "POST",
      body: JSON.stringify(message.data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        sendResponse({ status: true, data: responseData });
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        sendResponse({ status: false, error: "An error occurred" });
      });
  } else if (message.action === "GenerateGAEvent") {
    SendAnalyticsEvent(message.data);
  }
  return true;
});

tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // console.log("onUpdated", tabId, changeInfo)
  if ("status" in changeInfo && changeInfo.status == "complete") {
    tabs.sendMessage(tabId, {
      message: "UrlChanged",
      url: changeInfo.url,
    });
  }
});

async function getOrCreateClientId() {
  const result = await storage.local.get("clientId");
  if (result.clientId) {
    return result.clientId;
  }

  const tenDigitNumberCode = Math.floor(Math.random() * 9999999999)
    .toString()
    .padStart(10, "0");
  const unixTimestamp = Date.now().toString().substring(0, 10);
  const uniqueIdentifier = `${tenDigitNumberCode}.${unixTimestamp}`;
  let clientId = `GA1.2.${uniqueIdentifier}`;
  await storage.local.set({ clientId: clientId });
  return clientId;
}

async function getOrCreateSessionId() {
  let SESSION_EXPIRATION_IN_MIN = 30;

  let { sessionData } = await storage.session.get("sessionData");
  const currentTimeInMs = Date.now();
  if (sessionData && sessionData.timestamp) {
    const durationInMin = (currentTimeInMs - sessionData.timestamp) / 60000;
    if (durationInMin > SESSION_EXPIRATION_IN_MIN) {
      sessionData = null;
    } else {
      sessionData.timestamp = currentTimeInMs;
      await storage.session.set({ sessionData: sessionData });
    }
  }
  if (!sessionData) {
    sessionData = {
      session_id: currentTimeInMs.toString(),
      timestamp: currentTimeInMs.toString(),
    };
    await storage.session.set({ sessionData: sessionData });
  }
  return sessionData.session_id;
}

async function SendAnalyticsEvent(events) {
  const GA_ENDPOINT = "https://www.google-analytics.com/mp/collect";
  const MEASUREMENT_ID = `G-2WYQQ15XYX`;
  const API_SECRET = `jwhOMoczT62zu2bs2wDxZw`;
  const CLIENT_ID = await getOrCreateClientId();
  const SESSION_ID = await getOrCreateSessionId();
  for (let i = 0; i < events.length; i++) {
    if (!events[i].params) {
      events[i].params = {};
    }
    events[i].params.session_id = SESSION_ID;
  }

  fetch(
    `${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: CLIENT_ID,
        timestamp_micros: (new Date().getTime() * 1000).toString(),
        non_personalized_ads: "false",
        events: events,
      }),
    }
  );
}