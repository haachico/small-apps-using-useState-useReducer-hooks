import { useEffect, useReducer } from "react";
import { fakeFetch } from "./fakeFetch";

const initialState = {
  allTweets: [],
  isLoading: false,
  isError: {},
  areAllTweetsDisplayed: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: false
      };
    case "FETCH_TWEETS":
      return {
        ...state,
        allTweets: action.payload,
        isLoading: false
      };
    case "ERROR":
      return {
        ...state,
        isError: action.payload
      };
    case "SHOW_TWEETS":
      return {
        ...state,
        areAllTweetsDisplayed: !state.areAllTweetsDisplayed
      };
    default:
      return state;
  }
};

const TweetsUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getTweets = async () => {
    try {
      dispatch({ type: "LOADING" });
      const response = await fakeFetch("https://exaple.com/api/usertweets");
      dispatch({ type: "FETCH_TWEETS", payload: response.data });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err });
    }
  };
  useEffect(() => {
    getTweets();
  }, []);

  const displayedTweets = state.areAllTweetsDisplayed
    ? state.allTweets
    : [...state.allTweets].filter((tweet) => tweet.likes > 50);

  if (state.isError.status === 404) {
    return (
      <div>
        <h4>Error {state.isError.status}</h4>
        <p>{state.isError.message}</p>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => dispatch({ type: "SHOW_TWEETS" })}>
        {state.areAllTweetsDisplayed
          ? "Show tweets with more than 50 likes"
          : "Show all tweets"}
      </button>
      <div>
        {displayedTweets?.map((tweet) => (
          <div key={tweet.id}>
            <h3>{tweet.content}</h3>
            <div>
              <p>Views : {tweet.views}</p>
              <p>Likes : {tweet.likes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetsUseReducer;
