import { useEffect, useReducer } from "react";
import { fakeFetch } from "./fakeFetch";

const initialState = {
  allMovies: [],
  isLoading: false,
  isError: {},
  categorySelected: "ALL",
  selectedRating: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return {
        ...state,
        isLoading: true
      };
    case "FETCH_MOVIES":
      return {
        ...state,
        allMovies: action.payload,
        isLoading: false
      };
    case "IS_ERROR":
      return {
        ...state,
        isError: action.payload,
        isLoading: false
      };
    case "SELECTED_CATEGORY":
      return {
        ...state,
        categorySelected: action.payload
      };
    case "SELECTED_RATING":
      return {
        ...state,
        selectedRating: action.payload
      };

    default:
      return state;
  }
};

const MoviesUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getMovies = async () => {
    try {
      dispatch({ type: "IS_LOADING" });
      const response = await fakeFetch("https://example.com/api/movies");
      dispatch({ type: "FETCH_MOVIES", payload: response.data });
    } catch (err) {
      dispatch({ type: "IS_ERROR", payload: err });
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  const filteredMovies =
    state.categorySelected === "ACTION"
      ? [...state.allMovies].filter((movie) => movie.category === "Action")
      : state.categorySelected === "DRAMA"
      ? [...state.allMovies].filter((movie) => movie.category === "Drama")
      : state.categorySelected === "CRIME"
      ? [...state.allMovies].filter((movie) => movie.category === "Crime")
      : state.allMovies;

  const displayedMovies =
    state.selectedRating === "9.5"
      ? [...filteredMovies].filter((e) => e.rating > 9.5)
      : state.selectedRating === "9.0"
      ? [...filteredMovies].filter((e) => e.rating > 9)
      : state.selectedRating === "8.5"
      ? [...filteredMovies].filter((e) => e.rating > 8.5)
      : state.selectedRating === "8.0"
      ? [...filteredMovies].filter((e) => e.rating > 8)
      : filteredMovies;

  console.log(state.selectedRating);

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
      <fieldset>
        <legend>Filters </legend>
        <label>
          <input
            type="radio"
            value="ALL"
            checked={state.categorySelected === "ALL"}
            onChange={(e) =>
              dispatch({ type: "SELECTED_CATEGORY", payload: e.target.value })
            }
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="DRAMA"
            checked={state.categorySelected === "DRAMA"}
            onChange={(e) =>
              dispatch({ type: "SELECTED_CATEGORY", payload: e.target.value })
            }
          />
          Drama
        </label>
        <label>
          <input
            type="radio"
            value="CRIME"
            checked={state.categorySelected === "CRIME"}
            onChange={(e) =>
              dispatch({ type: "SELECTED_CATEGORY", payload: e.target.value })
            }
          />
          Crime
        </label>
        <label>
          <input
            type="radio"
            value="ACTION"
            checked={state.categorySelected === "ACTION"}
            onChange={(e) =>
              dispatch({ type: "SELECTED_CATEGORY", payload: e.target.value })
            }
          />
          Action
        </label>
      </fieldset>
      <select
        value={state.selectedRating}
        onChange={(e) =>
          dispatch({ type: "SELECTED_RATING", payload: e.target.value })
        }
      >
        <option>All</option>
        <option value="9.5">9.5</option>
        <option value="9.0">9.0</option>
        <option value="8.5">8.5</option>
        <option value="8.0">8.0</option>
      </select>
      <div>
        {state.isLoading ? (
          <h3>Loading ...</h3>
        ) : (
          displayedMovies.map(({ title, rating, year, category, id }) => (
            <div key={id}>
              <h2>{title}</h2>
              <p>Rating : {rating}</p>
              <p>Year : {year}</p>
              <p>Category : {category}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MoviesUseReducer;
