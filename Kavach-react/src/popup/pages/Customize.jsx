import React from "react";
import CustomColor from "../components/CustomColor";
import LabelSel from "../components/LabelSel";

const Customize = () => {
  const handleColorChange = (colorValues) => {
    console.log("Color values changed:", colorValues);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full"></div>
  );
};

export default Customize;
