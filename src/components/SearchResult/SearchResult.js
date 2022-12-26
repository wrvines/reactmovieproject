import React from "react";
import { Link } from "react-router-dom";
import "./SearchResult.css";
import noImage from "../../assets/no-image.png";

function SearchResult({ movie, setQuery }) {
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

  const [imageError, setImageError] = React.useState(false);

  return (
    <Link
      to={`/moviedetails/${movie.id}`}
      className="search-link"
      onClick={() => setQuery("")}
    >
      <img
        onError={() => setImageError(true)}
        src={imageError ? noImage : `${imageBaseUrl}${movie.backdrop_path}`}
      />
      <p>{movie.original_title}</p>
    </Link>
  );
}

export default SearchResult;
