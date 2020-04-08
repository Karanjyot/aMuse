import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./header.css";

const Header = (props) => {
  // let history = useHistory();

  // const logout = ()=>{

  //     axios.get("/api/logout").then(res=>{
  //         console.log(res);
  //     })

  //     // history.push('/login');
  // }

  return (
    <div>
      {/*Navbar */}
      <nav className="mb-1 navbar navbar-expand-lg navbar-dark elegant-color">
        <div className="container">
          <a className="navbar-brand" href="/home">
            <img
              src={require("../../images/logo.png")}
              height={30}
              alt="aMuse logo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-333"
            aria-controls="navbarSupportedContent-333"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent-333"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Library
                </a>
              </li>
            </ul>
            <form className="form-inline my-1">
              <div className="md-form form-sm my-0">
                <input
                  className="form-control form-control-sm mr-sm-2 mb-0"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
              <button
                className="btn btn-outline-white btn-sm my-0"
                type="submit"
              >
                Search
              </button>
            </form>

            <ul className="navbar-nav ml-auto nav-flex-icons">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Upload
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink-333"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user" />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right dropdown-default"
                  aria-labelledby="navbarDropdownMenuLink-333"
                >
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                  <a className="dropdown-item" href="/api/logout">
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/*/.Navbar */}
    </div>
  );
};

export default Header;


