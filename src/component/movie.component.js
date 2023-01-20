import React from "react";

import "./movie.styles.css";

const MovieCard = ({ movie }) => {
  const { title, overview, poster_path } = movie;
  return (
    <div className="card-container">
      <img
        className="poster"
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
      />
      <p className="title" key={Math.random() * 1000}>
        {title}
      </p>
      <small className="overview">
        {overview}
      </small>
    </div>
  );
};

export default MovieCard;
