import axios from "axios";
import React from "react";
import "./Slider.css";

function Slider({ apiKey, baseUrl }) {
  //create state for the upcoming movies
  const [upcomingMovies, setUpcomingMovies] = React.useState([]);

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

  // return <div>{upcomingMovies[0].title}</div>;
}

export default Slider;
