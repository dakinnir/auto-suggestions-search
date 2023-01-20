import "./App.css";

import { useState, useEffect } from "react";
import MovieCard from "./component/movie.component";

import { apiKey } from "./utils/secrets";
import { useDebounce } from "./hooks/debounce/useDebounce";

function App() {
  console.log("render");
  // movies data to search through
  const [moviesData, setMoviesData] = useState([]);
  console.log(13)
  // query search
  const [search, setSearch] = useState("");
  console.log(16)

  const [suggestions, setSuggestions] = useState(moviesData);
  console.log(19)

  const debouncedValue = useDebounce(search, 300);
  console.log(21)

  const url = "https://api.themoviedb.org/3/trending/movie/week";

  const fetchData = async () => {
    const response = await fetch(`${url}?api_key=${apiKey}`);
    const data = await response.json();
    const arrayObject = data.results;
    return arrayObject;
  };

  useEffect(() => {
    fetchData().then((movies) => {
      setMoviesData(movies);
    });
  }, []);

  // update the search results depending on when the search changes
  useEffect(() => {
    setSuggestions(
      moviesData.filter((movie) => {
        return movie.title.toLowerCase().includes(debouncedValue.toLowerCase());
      })
    );
  }, [debouncedValue, moviesData]);

  const onSearchHandler = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

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
            return <MovieCard key={movie.id} movie={movie} />;
          })}
      </div>
    </div>
  );
}

export default App;