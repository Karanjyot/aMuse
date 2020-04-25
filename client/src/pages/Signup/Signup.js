import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./signup.css";
import axios from "axios";
// import "materialize-css/dist/css/materialize.min.css"

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const submitFormHandler = (event) => {
    event.preventDefault();
    const obj = {
      email,
      password,
    };
    axios
      .post("/api/local/signin", obj)
      .then((res) => {
        history.push("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="signupstyle">
      <div className="signup-form">
        <form onSubmit={submitFormHandler}>
          <h2>Create an Account</h2>
          <p className="hint-text">
            Sign up with your social media account or email address
          </p>
          <div className="social-btn text-center">
            <a href="/auth/google" className="btn btn-danger btn-lg">
              <i className="fab fa-google" /> Google
            </a>
          </div>
          <div className="or-seperator">
            <b>or</b>
          </div>
          <div className="form-group">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
              placeholder="E-mail"
              type="email"
              className="form-control form-signup input-lg"
              required="required"
            />
          </div>
          <div className="form-group">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="form-control form-signup input-lg"
              name="password"
              placeholder="Password"
              required="required"
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-success btn-lg btn-block signup-btn"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
