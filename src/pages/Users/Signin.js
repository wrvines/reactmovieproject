import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./Sign.css";

function Signin() {
  const serverUrl = "https://cinetrail-server.herokuapp.com";
  const { user, setUser, token, setToken } = React.useContext(UserContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  let navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    // console.log(email, password);

    axios
      .post(`${serverUrl}/users/login`, { email, password })
      .then((res) => {
        // console.log(res.data);
        //save user data and token
        setUser(res.data);
        setToken(res.data.token);
        //save to local storage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));

    navigate("/");
  };

  return (
    <div className="sign-container">
      <form className="signup-form" onSubmit={handleSignin}>
        <div className="title-container">
          <h1>Sign Up</h1>
          <p>Please fill in this form.</p>
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="pwd">Password: </label>
          <input
            type="password"
            placeholder="Password"
            id="pwd"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="button-container">
          <button type="reset" className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="sign-btn">
            Sign In
          </button>
        </div>
        {success ? (
          <p>
            You are signed up! &nbsp;
            <Link to="/signin" className="red-text">
              Sign In
            </Link>
          </p>
        ) : (
          <p className="sign-message">
            Don't have an account? &nbsp;
            <Link to="/signup" className="red-text">
              Sign Up
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}

export default Signin;
