import React from "react";
import { Link } from "react-router-dom";
import "./Sign.css";

function Signin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const handleSignin = () => {};

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
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}

export default Signin;
