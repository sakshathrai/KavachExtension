import { useEffect, useState } from "react";
import { storage, runtime, tabs } from "webextension-polyfill";
import { getCurrentTab } from "../../helper/tabs";

export const Counter = () => {
  const [count, setCount] = useState(0);
  const [analysis, setAnalysis] = useState("Kavach is Being preparing...");
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
  }, []);

  return (
    <div
      style={{
        padding: "20px",
      }}
      // onClick={() => setValue(value + 1)}
    >
      <div>{analysis}</div>
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
                to: "background",
                action: "click",
              });
            }
          }}
        >
          Scan For DP
        </button>
      </div>
    </div>
  );
};
