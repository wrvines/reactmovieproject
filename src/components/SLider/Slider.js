import axios from "axios";
import React from "react";
import "./Slider.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Ratings from "../Ratings/Ratings";
import StarRatings from "react-star-ratings";

function Slider({ apiKey, baseUrl }) {
  //create state for the upcoming movies
  const [upcomingMovies, setUpcomingMovies] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [currentRating, setCurrentRating] = React.useState(0);

  //baseurl for images
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  //call api for data when the component loads
  React.useEffect(() => {
    //call API to get upcoming movies
    axios
      .get(`${baseUrl}movie/upcoming?api_key=${apiKey}`)
      .then((res) => {
        console.log(res.data.results);
        setUpcomingMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLeft = () => {
    // console.log("left");
    //at beginng wrap to end
    index === 0 ? setIndex(upcomingMovies.length - 1) : setIndex(index - 1);
    let rating = Math.round(upcomingMovies[index]?.vote_average / 2);
    setCurrentRating(rating);
  };
  const handleRight = () => {
    // console.log("right");
    //at end wrap back to 0
    index === upcomingMovies.length - 1 ? setIndex(0) : setIndex(index + 1);
    let rating = Math.round(upcomingMovies[index]?.vote_average / 2);
    setCurrentRating(rating);
  };

  const sliderStyle = {
    backgroundImage: `url("${imageBaseUrl}${upcomingMovies[index]?.backdrop_path}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "60vh",
    position: "relative",
  };

  return (
    <div style={sliderStyle}>
      <div className="slider-overlay">
        <MdKeyboardArrowLeft className="left-arrow" onClick={handleLeft} />
        <MdKeyboardArrowRight className="right-arrow" onClick={handleRight} />

        <div className="movie-info">
          <h1>{upcomingMovies[index]?.title}</h1>
          <p>{upcomingMovies[index]?.overview.slice(0, 120)}</p>
          {/* <p>{upcomingMovies[index]?.genre_ids}</p> */}
          <p>{upcomingMovies[index]?.release_date}</p>
          {/* <Ratings /> */}
          <StarRatings
            rating={currentRating}
            starRatedColor="red"
            starDimension="1rem"
            starSpacing="5px"
          />
          <p className="see-details">See Details</p>
        </div>
      </div>
    </div>
  );
}

export default Slider;
