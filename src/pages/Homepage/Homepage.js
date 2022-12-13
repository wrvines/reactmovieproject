import axios from "axios";
import React, { useContext } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Slider from "../../components/SLider/Slider";
import "./Homepage.css";
import { ThemeContext } from "../../contexts/ThemeContext";

function Homepage() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [popularMovies, setPopularMovies] = React.useState([]);
  const [topRatedMovies, setTopRatedMovies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  React.useEffect(() => {
    axios
      .get(`${baseUrl}movie/popular?api_key=${apiKey}&page=${page}`)
      .then((res) => {
        // console.log(res.data.results);
        setPopularMovies(res.data.results);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${baseUrl}movie/top_rated?api_key=${apiKey}&page=1`)
      .then((res) => {
        // console.log(res.data.results);
        setTopRatedMovies(res.data.results.slice(0, 10));
      })
      .catch((err) => console.log(err));
  }, [page]);

  return (
    <div
      className={
        darkMode ? "homepage-container" : "homepage-container homepage-light"
      }
    >
      <Slider />
      <div className="movies-wrapper">
        <div className="popular-container">
          <h3>Popular Movies</h3>
          <div className="popular-cards-wrapper">
            {popularMovies.map((item) => (
              <MovieCard
                key={item.id}
                movie={item}
                imageUrl={item.poster_path}
                imgHeight="300px"
                cardStyle="popular-card"
                brdRadius="16px"
              />
            ))}
          </div>
          <div className="page-numbers">
            <p>Select Page</p>
            {pageNumbers.map((num) => (
              <p key={num} onClick={() => setPage(num)}>
                {num}
              </p>
            ))}
          </div>
        </div>
        <div className="top-rated-container">
          <h3>Top Rated Movies</h3>
          <div className="top-rated-cards-wrapper">
            {topRatedMovies.map((item) => (
              <MovieCard
                key={item.id}
                movie={item}
                imageUrl={item.backdrop_path}
                imgHeight="100px"
                cardStyle="top-rated-card"
                brdRadius="8px"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
