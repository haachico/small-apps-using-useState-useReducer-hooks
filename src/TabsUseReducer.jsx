import { useReducer } from "react";

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

const initialState = {
  selectedCity: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECTED":
      return {
        ...state,
        selectedCity: cities.find((e) => e.name === action.payload)
      };
    default:
      return state;
  }
};

const TabsUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      {cities.map((e) => (
        <button
          onClick={() => dispatch({ type: "SELECTED", payload: e.name })}
          key={e.name}
        >
          {e.name}
        </button>
      ))}
      {
        <div>
          <h3>{state.selectedCity.name}</h3>
          <p>{state.selectedCity.description}</p>
        </div>
      }
    </div>
  );
};

export default TabsUseReducer;
