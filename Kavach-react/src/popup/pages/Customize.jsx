import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { getAllowedPatterns, setAllowedPatterns } from "../../helper/storage";

const Customize = () => {
  const handleColorChange = (colorValues) => {
    console.log("Color values changed:", colorValues);
  };

  const [DARK_PATTERNS, setDARK_PATTERNS] = useState([
    "Urgency",
    "Not Dark Pattern",
    "Scarcity",
    "Misdirection",
    "Social Proof",
    "Obstruction",
    "Sneaking",
    "Forced Action",
  ]);

  const [a, setA] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  });

  async function handlegetAllowedPatterns() {
    const ap = await getAllowedPatterns();
  }

  useEffect(() => {
    handlegetAllowedPatterns();
  }, []);
  return (
    <div className="flex flex-col h-full">
      {DARK_PATTERNS.map((val, i) => {
        return (
          <label className="switch-btn">
            <span>{val}</span>
            <Switch
              checked={a[i]}
              onChange={(event) => {
                console.log(event.target.checked);
                setA({ ...a, [i]: !event.target.checked });
              }}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Customize;
