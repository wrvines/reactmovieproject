import axios from "axios";
import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import Ratings from "../../components/Ratings/Ratings";
import Review from "../../components/Review/Review";
import "./MovieDetails.css";

function MovieDetails() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

  const { movieId } = useParams();
  // console.log(movieId);

  const [videoLink, setVideoLink] = React.useState("");
  const [movie, setMovie] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [reviews, setReviews] = React.useState([]);
  const [reviewNumber, setReviewNumber] = React.useState(3);
  const [totalReviews, setTotalReviews] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(`${baseUrl}movie/${movieId}/videos?api_key=${apiKey}`)
      .then((res) => {
        // console.log(res.data.results);

        const youTubeLink = res.data.results.filter(
          (item) => item.site === "YouTube" && item.type === "Trailer"
        );

        setVideoLink(youTubeLink[0].key);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${baseUrl}movie/${movieId}?api_key=${apiKey}`)
      .then((res) => {
        // console.log(res.data);
        setMovie(res.data);
        setRating(res.data.vote_average / 2);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${baseUrl}movie/${movieId}/reviews?api_key=${apiKey}`)
      .then((res) => {
        console.log(res.data.results);
        setTotalReviews(res.data.total_results);
        setReviews(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="details-container">
      {videoLink ? (
        <div className="trailer-container">
          <ReactPlayer
            className="trailer-player"
            url={`https://www.youtube.com/watch?v=${videoLink}`}
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <div
          className="trailer-container-blank"
          style={{
            backgroundImage: `url("${imageBaseUrl}/${movie?.backdrop_path}")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <p>No trailers released yet</p>
        </div>
      )}
      <div className="info-container">
        {movie?.original_title}
        <Ratings stars={rating} />
        <div className="moviedetails-info">
          <img
            className="details-poster"
            src={`${imageBaseUrl}/${movie?.poster_path}`}
          />
          <div className="moviedetails-right">
            <h2>{movie?.tagline}</h2>
            <h4>{movie?.overview}</h4>
            <h4>
              Status: <span>{movie?.status}</span>
            </h4>
            <h4>
              Runtime: <span>{movie?.runtime}</span>
            </h4>
            <h4>
              Budget: <span>{movie?.budget}</span>
            </h4>
          </div>
        </div>
      </div>
      <div className="review-container">
        {reviews.slice(0, reviewNumber).map((item) => (
          <Review review={item} key={item.id} />
        ))}
      </div>
      {reviewNumber <= totalReviews ? (
        <p
          className="more-reviews"
          onClick={() => setReviewNumber(reviewNumber + 3)}
        >
          Read More Reviews
        </p>
      ) : (
        <p className="more-reviews" onClick={() => setReviewNumber(3)}>
          End Of Reviews
        </p>
      )}
    </div>
  );
}

export default MovieDetails;
