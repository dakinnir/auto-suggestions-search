import "./App.css";

import { useState, useEffect } from "react";
import MovieCard from "./component/movie.component";

import { apiKey } from "./utils/secrets";
import { useDebounce } from "./hooks/debounce/useDebounce";

function App() {
  // movies data to search through
  const [moviesData, setMoviesData] = useState([]);
  // query search
  const [search, setSearch] = useState("");
  // suggestions
  const [suggestions, setSuggestions] = useState(moviesData);
  const [loading, setLoading] = useState(true);

  const debouncedValue = useDebounce(search, 300);

  const url = "https://api.themoviedb.org/3/trending/movie/week";

  const fetchData = async () => {
    setLoading(true);
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
    setLoading(false)
  }, [debouncedValue, moviesData]);

  const onSearchHandler = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  return (
    <div className='App'>
      <h2>Trending Movies</h2>
      <input
        className='input'
        type='search'
        name='searchField'
        placeholder='Search for movie(s)'
        value={search}
        onChange={onSearchHandler}
      />
      {loading && (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <img
            style={{ width: "30px" }}
            src='https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif'
            alt=''
          />
        </div>
      )}
      <div className='suggestions-container'>
        {suggestions &&
          suggestions.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
      </div>
    </div>
  );
}

export default App;
