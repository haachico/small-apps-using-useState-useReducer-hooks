import { useEffect, useState } from "react";
import { fakeFetch } from "./fakeFetch";

const Tweets = () => {
  const [allTweets, setAllTweets] = useState([]);
  const [areAllTweetsDisplayed, setAreAllTweetsDisplayed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({});
  const getTweets = async () => {
    try {
      setIsLoading(true);
      const response = await fakeFetch("https://example.com/api/usertweets");
      setAllTweets(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  const displayedTweets = areAllTweetsDisplayed
    ? allTweets
    : [...allTweets].filter((tweet) => tweet.likes > 50);

  if (isError.status === 404) {
    return (
      <div>
        <h3>{isError.status}</h3>
        <h4>{isError.message}</h4>
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <h4>Loading ... </h4>
      ) : (
        <>
          <button onClick={(e) => setAreAllTweetsDisplayed((prev) => !prev)}>
            {areAllTweetsDisplayed
              ? "Show tweets with more than 50 likes"
              : "Show all tweets"}
          </button>
          <div>
            {displayedTweets.map((tweet) => (
              <div key={tweet.id}>
                <h3>{tweet.content}</h3>
                <div>
                  <p>Views : {tweet.views}</p>
                  <p>Likes : {tweet.likes}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Tweets;
