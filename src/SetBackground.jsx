import { useState } from "react";

const SetBackground = () => {
  const [backgroundColor, setBackgroundColor] = useState("white");

  const handleSelect = (e) => {
    setBackgroundColor(e.target.value);
  };
  return (
    <div style={{ background: `${backgroundColor}`, height: "100vh" }}>
      <h1>Set backgroud color</h1>
      <select value={backgroundColor} onChange={(e) => handleSelect(e)}>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
      </select>
    </div>
  );
};

export default SetBackground;
