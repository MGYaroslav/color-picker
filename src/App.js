import React, { useState } from "react";
import "./App.css";

import ColorPicker from "./colorPicker/ColorPicker";

const App = () => {
  const colors = [
    { label: "RED", value: "#ff0000" },
    { label: "YELLOW", value: "#ffff00" },
    { label: "GREEN", value: "#008000" },
    { label: "RBLUEED", value: "#0000ff" }
  ];

  const [value, setValue] = useState("#0f0f0f");

  const onChange = value => {
    setValue(value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ColorPicker colors={colors} value={value} onChange={onChange} />
    </div>
  );
};

export default App;
