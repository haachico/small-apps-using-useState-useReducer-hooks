import { useEffect, useReducer } from "react";
import { fakeFetch } from "./fakeFetch";

const initialState = {
  chatsData: [],
  isLoading: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true
      };
    case "FETCH_CHATS":
      return {
        ...state,
        chatsData: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};

const ChatsUserReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getChatsData = async () => {
    try {
      dispatch({ type: "LOADING" });
      const response = await fakeFetch("https://example.com/api/userchats");
      dispatch({ type: "FETCH_CHATS", payload: response.data });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getChatsData();
  }, []);
  return (
    <div>
      {state.isLoading ? (
        <h4> Loading...</h4>
      ) : (
        state.chatsData.map((chat, i) => (
          <h4 key={chat}>
            {(i + 1) % 2 !== 0 ? "User" : "You"} : {chat}
          </h4>
        ))
      )}
    </div>
  );
};

export default ChatsUserReducer;
