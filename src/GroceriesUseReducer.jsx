import { useReducer } from "react";

const initialState = {
  list: [],
  completedList: [],
  item: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return {
        ...state,
        item: action.payload
      };
    case "ADD_ITEM":
      return {
        ...state,
        list: [...state.list, action.payload],
        item: ""
      };
    case "CHECK_ITEM":
      const checkedItem = action.payload.target.value;
      const isChecked = action.payload.target.checked;
      return {
        ...state,
        completedList: isChecked
          ? [...state.completedList, checkedItem]
          : state.completedList.filter((e) => e !== checkedItem)
      };
    default:
      return state;
  }
};

const GroceriesUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1> Groceries list</h1>
      <label htmlFor="list">Add : </label>
      <input
        id="list"
        value={state.item}
        onChange={(e) => dispatch({ type: "INPUT", payload: e.target.value })}
      />
      <button
        onClick={() => dispatch({ type: "ADD_ITEM", payload: state.item })}
      >
        Add
      </button>
      <ol>
        {state.list.map((e) => (
          <li key={e}>
            <input
              type="checkbox"
              value={e}
              onChange={(event) =>
                dispatch({ type: "CHECK_ITEM", payload: event })
              }
            />
            {e}
          </li>
        ))}
      </ol>
      <h2>Completed list</h2>
      <ol>
        {state.completedList?.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ol>
    </div>
  );
};

export default GroceriesUseReducer;
