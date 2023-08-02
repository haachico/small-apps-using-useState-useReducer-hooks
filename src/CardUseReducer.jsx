import { useReducer } from "react";

const initialState = {
  borderRadius: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT":
      return {
        borderRadius: action.payload
      };
    default:
      return state;
  }
};
const CardUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <div
        style={{
          borderRadius: `${state.borderRadius}px`,
          border: "1px solid black",
          padding: "1rem"
        }}
      >
        <input
          type="range"
          value={state.borderRadius}
          onChange={(e) =>
            dispatch({ type: "SELECT", payload: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default CardUseReducer;
