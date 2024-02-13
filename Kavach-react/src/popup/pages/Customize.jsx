import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { getAllowedPatterns, setAllowedPatterns } from "../../helper/storage";
import { ChromePicker } from "react-color";

const Customize = () => {
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

  const [patternState, setPatternState] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  });

  const [selectedColor, setSelectedColor] = useState("#36a7c2");

  async function handleGetAllowedPatterns() {
    const allowedPatterns = await getAllowedPatterns();
    setPatternState(allowedPatterns);
  }

  useEffect(() => {
    handleGetAllowedPatterns();
  }, []);

  const handleSwitchChange = (index) => {
    setPatternState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const savePatternState = () => {
    setAllowedPatterns(patternState);
    console.log("Saved patterns:", patternState);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl mb-4">Customize</h2>
      <div className="grid grid-cols-2 gap-4">
        {DARK_PATTERNS.length &&
          DARK_PATTERNS.map((pattern, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-white rounded-md shadow-md"
            >
              <span className="text-gray-800">{pattern}</span>
              <Switch
                checked={patternState[index]}
                onChange={() => handleSwitchChange(index)}
                onColor={selectedColor}
                offColor="#ccc"
                uncheckedIcon={<div className="switch-label">Off</div>}
                checkedIcon={<div className="switch-label">On</div>}
              />
            </div>
          ))}
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-sm">Select Color:</label>
        <ChromePicker
          color={selectedColor}
          onChange={(color) => handleColorChange(color)}
        />
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={savePatternState}
      >
        Save
      </button>
    </div>
  );
};

export default Customize;
