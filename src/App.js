import "./App.css";

import { useState, useEffect } from "react";
import MovieCard from "./component/movie.component";

import { apiKey } from "./utils/secrets";

function App() {
  console.log("render");
  // movies data to search through
  const [moviesData, setMoviesData] = useState([]);
  // query search
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState(moviesData);

  const url = "https://api.themoviedb.org/3/trending/movie/week";
  const apiKey = process.env.REACT_APP_API_KEY
  useEffect(() => {
    fetch(
      console.log(apiKey)
      `${url}?api_key=${apiKey}`
    )
      .then((data) => data.json())
      .then((pageObject) => {
         return pageObject.results
      })
      .then((movies) => {
        setMoviesData(movies)
      })
      // .then(moviess => console.log(moviess))
  }, []);
  // update the search results depending on when the search changes
  useEffect(() => {
    setSuggestions(
      moviesData.filter((movie) => {
        return movie.title.includes(search);
      })
    );
  }, [search, moviesData]);

  const onSearchHandler = (event) => {
    const value = event.target.value;
    if (value.length === 0) {
      setMessage("Start searching");
    } else if (!suggestions === 0) {
      setMessage("No suggested movies matching the search.");
    }
    setSearch(value);
  };

  const [message, setMessage] = useState("Start searching");

  return (
    <div className="App">
      <h2>Trending Movies</h2>
      <input
        className="input"
        type="search"
        name="searchField"
        placeholder="Search for movie(s)"
        value={search}
        onChange={onSearchHandler}
      />
      <div className="suggestions-container">
        {suggestions &&
          suggestions.map((movie) => {
            return <MovieCard key={movie.id} movie={movie}/>
          })}
      </div>
      {!suggestions && <p>{message}</p>}
    </div>
  );
}

export default App;
