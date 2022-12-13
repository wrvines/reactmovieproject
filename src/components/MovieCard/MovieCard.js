import React from "react";
import { Link } from "react-router-dom";
import Ratings from "../Ratings/Ratings";
import "./MovieCard.css";

function MovieCard({ movie, imageUrl, imgHeight, cardStyle, brdRadius }) {
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
  const imageStyle = {
    backgroundImage: `url("${imageBaseUrl}${imageUrl}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: imgHeight,
    width: "200px",
    position: "relative",
    borderRadius: brdRadius,
  };

  return (
    <Link className={cardStyle} to={`moviedetails/${movie?.id}`}>
      <div style={imageStyle}>
        <div className="movie-info-top">
          <Ratings stars={movie.vote_average / 2} />
          {/* <p>{movie.vote_average}</p> */}
        </div>

        <div className="movie-info-bottom">
          <p>{movie.title}</p>
          {/* <p>Rating: {movie.vote_average}</p> */}
        </div>
      </div>
      {cardStyle === "top-rated-card" && (
        <p className="rating-title">{movie.title}</p>
      )}
    </Link>
  );
}

export default MovieCard;
