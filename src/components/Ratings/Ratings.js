import React from "react";
import StarRatings from "react-star-ratings";
import "./Ratings.css";

function Ratings({ stars }) {
  // const movieRating = 4;

  // const [currentRating, setCurrentRating] = React.useState(0);

  return (
    <StarRatings
      rating={stars}
      starRatedColor="red"
      starDimension="1rem"
      starSpacing="5px"
    ></StarRatings>
  );
}

export default Ratings;
