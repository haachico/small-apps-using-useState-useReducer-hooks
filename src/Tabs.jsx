import { useState } from "react";

const cities = [
  {
    name: "Mumbai",
    description: "Mumbai is a very expensive city."
  },
  {
    name: "Delhi",
    description: "Delhi is the national capital of India"
  },
  {
    name: "Chennai",
    description: "Chennai is where Anusha lives"
  },
  {
    name: "Kolkata",
    description: "Kolkata is to the east of India"
  }
];

const Tab = () => {
  const [selectedCity, setSelectedCity] = useState({});

  const handleClick = (name) => {
    setSelectedCity(cities.find((e) => e.name === name));
  };

  return (
    <div>
      {cities.map((e) => (
        <button onClick={() => handleClick(e.name)} key={e.name}>
          {e.name}
        </button>
      ))}
      {
        <div>
          <h3>{selectedCity.name}</h3>
          <p>{selectedCity.description}</p>
        </div>
      }
    </div>
  );
};

export default Tab;
