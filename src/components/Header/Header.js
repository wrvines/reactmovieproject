import "./Header.css";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import SearchResult from "../SearchResult/SearchResult";

function Header() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { user, setUser, token, setToken } = React.useContext(UserContext);
  const [profileOptions, setProfileOptions] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [queryResults, setQueryResults] = React.useState([]);
  let navigate = useNavigate();
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode1", !darkMode);
  };

  const handleLogout = () => {
    //clear local storage
    localStorage.clear();
    //reset and token global state
    setUser("");
    setToken("");
    navigate("/");
  };

  const handleSearch = (e) => {
    console.log(e);
    setQuery(e.target.value);
    axios
      .get(`${baseUrl}search/movie?api_key=${apiKey}&query=${e.target.value}`)
      .then((res) => {
        // console.log(res.data.results);
        setQueryResults(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={
        darkMode ? "header-container" : "header-container header-light"
      }
    >
      <Link to="/" className="logo">
        CineTrail
      </Link>
      <div className="search-container">
        <input
          placeholder="Search movies..."
          className="search-input"
          onChange={handleSearch}
        />
        {query !== "" ? (
          <div className="search-results-container">
            {queryResults?.map((item) => (
              <SearchResult movie={item} setQuery={setQuery} />
            ))}
          </div>
        ) : null}
      </div>
      <div className="header-buttons-container">
        <div className="theme-button-container">
          {darkMode ? (
            <div className="theme-buttons" onClick={handleTheme}>
              <MdOutlineLightMode className="theme-icon" />
              <MdOutlineDarkMode className="theme-icon theme-icon-active" />
            </div>
          ) : (
            <div className="theme-buttons" onClick={handleTheme}>
              <MdOutlineLightMode className="theme-icon theme-icon-active" />
              <MdOutlineDarkMode className="theme-icon" />
            </div>
          )}
        </div>
        <div>
          {token ? (
            <div className="profile-container">
              <img
                src={user.image_url}
                className="profile-img"
                onClick={() => setProfileOptions(!profileOptions)}
              />
              <p>Welcome, {user.username}</p>
              {profileOptions ? (
                <div>
                  <Link to="/myfavorites" className="fav-div">
                    My Favorites
                  </Link>
                  <p className="logout" onClick={handleLogout}>
                    Logout
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <button
              className="create-account-btn"
              onClick={() => navigate(`/signup`)}
            >
              Create an Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
