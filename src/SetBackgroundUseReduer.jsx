import { useReducer } from "react";

const initialState = {
  backgroundColor: "white"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_COLOR":
      return {
        backgroundColor: action.payload
      };
    default:
      return state;
  }
};

const SetBackgroundUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div style={{ background: `${state.backgroundColor}`, height: "100vh" }}>
      <h1>Select Background color</h1>
      <select
        value={state.background}
        onChange={(e) =>
          dispatch({ type: "SELECT_COLOR", payload: e.target.value })
        }
      >
        <option>Select</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
      </select>
    </div>
  );
};

export default SetBackgroundUseReducer;
