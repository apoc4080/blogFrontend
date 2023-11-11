import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Movies.css";
import {moviesData} from "./info";

const Movies = () => {
  const [moviesByYear, setMoviesByYear] = useState({});

  useEffect(() => {
    // Group movies by year
    const groupedMovies = moviesData.reduce((acc, movie) => {
      const year = movie.year;
      acc[year] = acc[year] || [];
      acc[year].push(movie);
      return acc;
    }, {});

    setMoviesByYear(groupedMovies);
  }, []);

  return (
    <div>
      <div className="movies-header">
        <h1>Queer Movies</h1>
      </div>
      {Object.entries(moviesByYear).map(([year, movies]) => (
        <div key={year}>
          <h2>{year}</h2>
          <div className="movies-list">
            {movies.map((movie, index) => (
              <Link to={movie.url} key={index} target="_blank">
                <div className="movie-card">
                  <img src={movie.poster} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;
