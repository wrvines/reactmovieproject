import "./Header.css";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { ThemeContext } from "../../contexts/ThemeContext";

function Header() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  let navigate = useNavigate();

  const handleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
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
        <input placeholder="Search movies..." className="search-input" />
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
          <button
            className="create-account-btn"
            onClick={() => navigate(`/signup`)}
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
