import axios from "axios";
import React from "react";
import "./Slider.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Ratings from "../Ratings/Ratings";
import Genre from "../Genre/Genre";
import { Link } from "react-router-dom";

function Slider() {
  //create state for the upcoming movies
  const [upcomingMovies, setUpcomingMovies] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [currentRating, setCurrentRating] = React.useState(0);

  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

  //call api for data when the component loads
  React.useEffect(() => {
    //call API to get upcoming movies
    axios
      .get(`${baseUrl}movie/upcoming?api_key=${apiKey}`)
      .then((res) => {
        // console.log(res.data.results);
        setUpcomingMovies(res.data.results);
        let rating = res.data.results[index]?.vote_average / 2;
        setCurrentRating(rating);
      })
      .catch((err) => console.log(err));
  }, [index]);

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
    backGroundColor: "white",
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
          <Genre movieGenres={upcomingMovies[index]?.genre_ids} />
          {/* <p>{upcomingMovies[index]?.genre_ids}</p> */}
          <p>{upcomingMovies[index]?.release_date}</p>
          <Ratings stars={currentRating} />
          <Link to={`moviedetails/${upcomingMovies[index]?.id}`}>
            <p className="see-details">See Details</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Slider;
