import { useState } from "react";

const Card = () => {
  const [borderRadius, setBorderRadius] = useState(0);

  const handleChange = (e) => {
    setBorderRadius(e.target.value);
  };
  return (
    <div>
      <div
        style={{
          borderRadius: `${borderRadius}px`,
          border: "1px solid black",
          padding: "1rem"
        }}
      >
        <h1>Card with rounded corner</h1>
        <input
          type="range"
          value={borderRadius}
          min="0"
          max="50"
          onChange={(e) => handleChange(e)}
        />
        {borderRadius}
      </div>
    </div>
  );
};

export default Card;
