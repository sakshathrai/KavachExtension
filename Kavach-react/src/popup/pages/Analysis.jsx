import React, { useEffect, useState } from "react";
import Graph from "../components/graph";
import { getDpPatternCount } from "../../helper/storage";

function Analysis() {
  const [graphValues, setGraphValues] = useState([10, 20, 30, 40, 50, 60, 70]);
  const [DCT, setDARKPATTERNSCOUNT] = useState(null);
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
    }
  }, [DCT]);
  async function getDpPatternCountFromLocal() {
    const DARK_PATTERNS_COUNT = await getDpPatternCount();
    const JSONDARKPATTER_COUNT = await JSON.parse(DARK_PATTERNS_COUNT);
    setDARKPATTERNSCOUNT(JSONDARKPATTER_COUNT);
  }
  useEffect(() => {
    getDpPatternCountFromLocal();
  }, []);
  return <Graph values={graphValues} />;
}

export default Analysis;
