import axios from "axios";
import React from "react";

export default function Genre({ movieGenres }) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [allGenres, setAllGenres] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${baseUrl}genre/movie/list?api_key=${apiKey}`)
      .then((res) => {
        // console.log(res.data.genres);
        setAllGenres(res.data.genres);
      })
      .catch((err) => console.log(err));
  }, []);

  const genreList = () => {
    //search for the ids in movieGenres
    //store names in array
    const genre = [];
    movieGenres?.map((id) => {
      //search allGenres array to find this id
      for (let i = 0; i < allGenres.length; i++) {
        //check for matching id
        if (id === allGenres[i].id) {
          //add to genres array
          genre.push(allGenres[i].name);
        }
      }
    });
    return genre.join(", ");
  };

  return (
    <div>
      <p>Genres:&nbsp;&nbsp;{genreList()}</p>
    </div>
  );
}
