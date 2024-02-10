import { useEffect, useState } from "react";
import { storage, runtime, tabs } from "webextension-polyfill";
import { getCurrentTab } from "../../helper/tabs";
import { getAutoScanPermit } from "../../helper/storage"; 
import Theme from "../components/theme";
import Navbar from "../components/navbar";
import Button from "../components/Button";
import CountSec from "../components/CountSec";
export const Counter = () => {
  const [count, setCount] = useState(0);
  const [analysis, setAnalysis] = useState("Kavach is Being preparing...");
  const [autoScan, setAutoScan] = useState("none");
  const darkPatterns = [
    'Urgency',
    'Scarcity',
    'Misdirection',
    'Social Proof',
    'Obstruction',
    'Sneaking',
    'Forced Action'
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


<nav className="flex overflow-x-auto overflow-y-hidden border-b border-gray-700 whitespace-nowrap dark:border-gray-600">
    {/* Home Button */}
    <button className="inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:px-4 -px-1 dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10a3 3 0 016 0h7a3 3 0 016 0m0 0a3 3 0 11-6 0 3 3 0 016 0m-6 3a5 5 0 110-10 5 5 0 010 10z" />
        </svg>
        <span className="mx-1 text-sm sm:text-base">
            Home
        </span>
    </button>

    {/* Analysis Button */}
    <button className="inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-green-500 bg-transparent border-b-2 border-green-400 sm:px-4 -px-1 dark:border-green-300 dark:text-green-300 whitespace-nowrap focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15l9-6 9 6M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6" />
        </svg>
        <span className="mx-1 text-sm sm:text-base">
            Analysis
        </span>
    </button>

    {/* Customization Button */}
    <button className="inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-purple-500 bg-transparent border-b-2 border-purple-400 sm:px-4 -px-1 dark:border-purple-300 dark:text-purple-300 whitespace-nowrap focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
        </svg>
        <span className="mx-1 text-sm sm:text-base">
            Customization
        </span>
    </button>

</nav>
<div class="flex flex-grow justify-center items-center mt-8">
    <button class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
      Scan
    </button>
  </div>

<CountSec/>

    <footer className="bg-gray-200 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 text-xs">© 2024 Kavach. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Privacy | Terms</p>
        </div>
      </div>
    </footer>
  </div>

  );
};
