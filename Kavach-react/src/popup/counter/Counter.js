import { useEffect, useState } from "react";
import { storage, runtime, tabs } from "webextension-polyfill";
import { getCurrentTab } from "../../helper/tabs";
import { getAutoScanPermit } from "../../helper/storage";
import ProgressBar from "../components/progress";
import Theme from "../components/theme";
import Navbar from "../components/navbar";
export const Counter = () => {
  const [count, setCount] = useState(0);
  const [analysis, setAnalysis] = useState("Kavach is Being preparing...");
  const [autoScan, setAutoScan] = useState("none");

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
    <div
      style={{
        padding: "20px",
      }}
      // onClick={() => setValue(value + 1)}
    >
      <div>{autoScan}</div>
      <div>{analysis}</div>
      <button
        onClick={() => {
          if (autoScan === "Allow") {
            setAutoScan("not-allowed");
            sendUpdateScanMessage("not-allowed");
          } else if (autoScan === "not-allowed") {
            setAutoScan("Allow");
            sendUpdateScanMessage("Allow");
          }
        }}
      >
        Select auto scan `current:{autoScan}`
      </button>
      {analysis === "Scanning complete!!" ? (
        <div>Totle DP : {count}</div>
      ) : (
        <div>DP: {count} Found So far</div>
      )}

      <div>
        <button
          onClick={async (e) => {
            e.stopPropagation();
            const tab = await getCurrentTab();
            const tabId = tab.id;
            if (tabId) {
              console.log("msg snt");
              tabs.sendMessage(tabId, {
                from: "popup",
                to: "content",
                action: "start-scanning",
              });
            }
          }}
        >
          Scan For DP
        </button>
      </div>
      <Theme/>
<Navbar/>

    </div>
  );
};