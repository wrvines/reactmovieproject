import React from "react";
import StarRatings from "react-star-ratings";

function Ratings() {
  const movieRating = 4;

  const [currentRating, setCurrentRating] = React.useState(0);

  return (
    <StarRatings
      rating={movieRating}
      starRatedColor="red"
      starDimension="1rem"
      starSpacing="5px"
    ></StarRatings>
  );
}

export default Ratings;
