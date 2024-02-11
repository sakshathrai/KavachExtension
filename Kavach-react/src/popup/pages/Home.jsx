import React, { useEffect, useState } from "react";
import CountSec from "../components/CountSec";
import { runtime } from "webextension-polyfill";
import { getDpCount } from "../../helper/storage";

function Home() {
  const [analysis, setAnalysis] = useState("Kavach is Being preparing...");
  const [count, setCount] = useState(null);

  async function initExtensionState() {
    const dp_count = await getDpCount();
    setCount(dp_count);
  }
  useEffect(() => {
    initExtensionState();
  }, []);

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
          setAnalysis("complete");
          break;
      }
    }
  });

  return (
    <div className="h-full">
      <div className="flex flex-grow justify-evenly items-center my-4">
        <button className="bg-amber-500 hover:bg-amber-700 text-white text-xl font-bold py-2 px-4 rounded">
          Scan
        </button>
        {count>0 && (
          <div className="mx-1 text-sm sm:text-base">
            {analysis === "complete"
              ? "Total Patterns Detected"
              : "Patterns Detected"}
            : {count}
          </div>
        )}
      </div>

      <CountSec />
    </div>
  );
}

export default Home;
