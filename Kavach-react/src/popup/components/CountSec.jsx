import React, { useEffect, useState } from "react";
import ProgressBar from "../components/progress";
import { getDpPatternCount } from "../../helper/storage";
import { runtime } from "webextension-polyfill";
// English Array


function CountSec({PLACEHOLDER}) {
  const [graphValues, setGraphValues] = useState([10, 20, 30, 40, 50, 60, 70]);
  const [DCT, setDARKPATTERNSCOUNT] = useState(null);
  const [total, setTotal] = useState(1);
  const [count, setCount] = useState(null);

  const darkPatterns = PLACEHOLDER.slice(6,13);
  useEffect(() => {
    if (DCT) {
      setGraphValues([
        DCT[0],
        DCT[2],
        DCT[3],
        DCT[4],
        DCT[5],
        DCT[6],
        DCT[6],
        DCT[7],
      ]);
      setTotal(
        DCT[0] + DCT[2] + DCT[3] + DCT[4] + DCT[5] + DCT[6] + DCT[6] + DCT[7]
      );
    }
  }, [DCT]);
  async function getDpPatternCountFromLocal() {
    const DARK_PATTERNS_COUNT = await getDpPatternCount();
    const JSONDARKPATTER_COUNT = await JSON.parse(DARK_PATTERNS_COUNT);
    setDARKPATTERNSCOUNT(JSONDARKPATTER_COUNT);
  }
  useEffect(() => {
    getDpPatternCountFromLocal();
    runtime.onMessage.addListener((message) => {
      if (message.to === "popup") {
        switch (message.action) {
          case "increment-count":
            if (message.count) setCount(parseInt(message.count));
            getDpPatternCountFromLocal();
            break;
          // case "Scanning":
          //   setAnalysis("Kavach is Scanning the page!!");
          //   break;
          // case "Scanning-Complete":
          //   setAnalysis("Scanning complete!!");
          //   break;
        }
      }
    });
  }, []);
  return (
    <section className="py-2 sm:py-4 bg-gray-770 flex-1 border border-gray-300">
      <div className="container mx-auto px-4">
        <h2 className="text-sm sm:text-lg font-bold text-white mb-2 sm:mb-4">
          {PLACEHOLDER[5]}
          {/* डार्क पैटर्न */}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {darkPatterns.length &&
            darkPatterns.map((pattern, index) => (
              <div
                key={index}
                className="dark-pattern mb-2 p-2 w-full sm:w-auto sm:flex-shrink-0 border border-gray-300 rounded-md"
              >
                <h3 className="text-xs sm:text-sm font-semibold mb-1 text-white">
                  {pattern}
                </h3>
                <div className="flex items-center justify-between">
                  <ProgressBar progVal={(graphValues[index] / total) * 100} />
                  <p className="text-white text-xxs sm:text-xs">
                    {graphValues[index]}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default CountSec;
