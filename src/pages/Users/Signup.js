import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sign.css";

function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const baseUrl = "https://cinetrail-server.herokuapp.com";
  let navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/users/signup`, { email, password, username })
      .then((res) => {
        console.log(res.data);
        //status 409 means user already exists
        if (res.data.status === 409) {
          alert("email already exists");
        } else {
          setSuccess(true);
          setEmail("");
          setPassword("");
          setUsername("");
        }
      })
      .catch((err) => console.log(err));
    navigate("/");
  };

  return (
    <div className="sign-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="title-container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
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
        <div className="input-wrapper">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="button-container">
          <button type="reset" className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="sign-btn">
            Sign Up
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
            Already have an account? &nbsp;
            <Link to="/signin" className="red-text">
              Sign In
            </Link>{" "}
          </p>
        )}
      </form>
    </div>
  );
}

export default Signup;
