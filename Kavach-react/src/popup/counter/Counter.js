import { useEffect, useState } from "react";
import { storage, runtime, tabs } from "webextension-polyfill";
import { getCurrentTab } from "../../helper/tabs";
import { getAutoScanPermit } from "../../helper/storage";
import Theme from "../components/theme";
import Navbar from "../components/navbar";
import Button from "../components/Button";
import CountSec from "../components/CountSec";

export const Counter = () => {
  const [analysis, setAnalysis] = useState("Kavach is Being preparing...");
  const [autoScan, setAutoScan] = useState("none");
  const darkPatterns = [
    "Urgency",
    "Scarcity",
    "Misdirection",
    "Social Proof",
    "Obstruction",
    "Sneaking",
    "Forced Action",
  ];

  async function autoScanHandle() {
    const scanPermit = await getAutoScanPermit();
    setAutoScan(scanPermit);
  }

  async function sendUpdateScanMessage(permit) {
    const tab = await getCurrentTab();
    const tabId = tab.id;
    console.log(tabId);
    if (tabId) {
      tabs.sendMessage(tabId, {
        to: "content",
        from: "popup",
        action: "set-auto-scan-permit",
        permit,
      });
    }
    console.log("msg snt to scanup");
  }
  useEffect(() => {
    const readBackgroundMessage = async () => {
      const tab = await getCurrentTab();
      const tabId = tab.id;

      if (tabId) {
        const data = await storage.local.get(tabId.toString());
        // alert(JSON.stringify(data));

        const currentValue = data?.[tabId] ?? 0;
        setCount(currentValue);
      }
    };

    runtime.onMessage.addListener((message) => {
      if (message.to === "popup") {
        switch (message.action) {
          case "increment-count":
            if (message.count) setCount(parseInt(message.count));
            break;
          case "Scanning":
            setAnalysis("Kavach is Scanning the page!!");
            break;
          case "Scanning-Complete":
            setAnalysis("Scanning complete!!");
            break;
        }
      }
    });

    readBackgroundMessage();
    autoScanHandle();
  }, []);
  return (
    <div className="bg-gray-100 h-full min-h-screen flex flex-col">
      <header className="bg-indigo-500 py-2 flex items-center justify-between px-4">
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="w-6 h-6 mr-2" />
          <h1 className="text-white font-semibold text-sm">Kavach</h1>
        </div>
        <div className="flex items-center">
          <Theme />
        </div>
      </header>
    </div>
  );
};
