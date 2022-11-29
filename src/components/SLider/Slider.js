import axios from "axios";
import React from "react";
import "./Slider.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function Slider({ apiKey, baseUrl }) {
  //create state for the upcoming movies
  const [upcomingMovies, setUpcomingMovies] = React.useState([]);
  const [index, setIndex] = React.useState(0);
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

  const sliderStyle = {
    backgroundImage: `url("${imageBaseUrl}${upcomingMovies[index]?.backdrop_path}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "60vh",
  };

  return (
    <div style={sliderStyle}>
      <MdKeyboardArrowLeft className="left-arrow" />
      <MdKeyboardArrowRight className="right-arrow" />
      {/* {upcomingMovies[0]?.title} */}
    </div>
  );
}

export default Slider;
