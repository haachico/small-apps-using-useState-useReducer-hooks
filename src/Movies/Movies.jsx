import { useEffect, useState } from "react";
import { fakeFetch } from "./fakeFetch";

const Movies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [isSelected, setIsSelected] = useState("ALL");
  const [rating, setRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getMovies = async () => {
    try {
      setIsLoading(true);
      const response = await fakeFetch("https://example.com/api/movies");
      setAllMovies(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleSelect = (e) => {
    setIsSelected(e.target.value);
  };

  const filteredMovies =
    isSelected === "ACTION"
      ? [...allMovies].filter((movie) => movie.category === "Action")
      : isSelected === "DRAMA"
      ? [...allMovies].filter((movie) => movie.category === "Drama")
      : isSelected === "CRIME"
      ? [...allMovies].filter((movie) => movie.category === "Crime")
      : allMovies;

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const displayedMovies =
    rating === "9.5"
      ? [...filteredMovies].filter((e) => e.rating > 9.5)
      : rating === "9"
      ? [...filteredMovies].filter((e) => e.rating > 9)
      : rating === "8.5"
      ? [...filteredMovies].filter((e) => e.rating > 8.5)
      : rating === "8"
      ? [...filteredMovies].filter((e) => e.rating > 8)
      : filteredMovies;

  if (isError.status === 404) {
    return (
      <div>
        <h4>Error {isError.status}</h4>
        <p>{isError.message}</p>
      </div>
    );
  }

  return (
    <div>
      <fieldset>
        <legend>Filters</legend>
        <label>
          All
          <input
            type="radio"
            value="ALL"
            checked={isSelected === "ALL"}
            onChange={(e) => handleSelect(e)}
          />
        </label>
        <label>
          Action
          <input
            type="radio"
            value="ACTION"
            checked={isSelected === "ACTION"}
            onChange={(e) => handleSelect(e)}
          />
        </label>
        <label>
          Drama
          <input
            type="radio"
            value="DRAMA"
            checked={isSelected === "DRAMA"}
            onChange={(e) => handleSelect(e)}
          />
        </label>
        <label>
          Crime
          <input
            type="radio"
            value="CRIME"
            checked={isSelected === "CRIME"}
            onChange={(e) => handleSelect(e)}
          />
        </label>
      </fieldset>
      <select value={rating} onChange={(e) => handleRating(e)}>
        <option>All</option>
        <option value="9.5">9.5+</option>
        <option value="9">9.0+</option>
        <option value="8.5">8.5+</option>
        <option value="8">8.0+</option>
      </select>
      <div>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          displayedMovies.map(({ title, rating, year, category }) => (
            <div>
              <h4>{title}</h4>
              <p>Ratings : {rating}</p>
              <p>Year : {year}</p>
              <p>Category : {category}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Movies;
