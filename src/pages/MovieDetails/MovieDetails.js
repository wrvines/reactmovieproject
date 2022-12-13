import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

function MovieDetails() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

  const { movieId } = useParams();
  // console.log(movieId);

  const [videoLink, setVideoLink] = React.useState("");

  React.useEffect(() => {
    axios
      .get(`${baseUrl}movie/${movieId}/videos?api_key=${apiKey}`)
      .then((res) => {
        // console.log(res.data.results);

        const youTubeLink = res.data.results.filter(
          (item) => item.site === "YouTube" && item.type === "Trailer"
        );

        setVideoLink(youTubeLink[0]?.key);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div className="details-container">MovieDetails</div>;
}

export default MovieDetails;
