import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const onLoginHandler = (e) => {
    e.preventDefault();
    const obj = {
      email,
      password,
    };
    axios
      .post("/api/local/login", obj)
      .then((res) => {
        console.log(res);
        history.push("/home");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div id="signupstyle">
      <div className="signup-form">
        <form onSubmit={onLoginHandler}>
          <h2>Login</h2>
          <p className="hint-text">
            Login with your social media account or email address
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
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          Don't have an account? <a href="/">Signup here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
