import React from "react";

import "./header.css";
import { Link } from "react-router-dom";
import Search from "../../components/Search/search"

const Header = (props) => {

 
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
                <a className="nav-link" href="/home">
                  Home
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/library">
                  Library
                </a>
              </li>
            </ul>
   
            <div>
              <Search />
            </div>

            <ul className="navbar-nav ml-auto nav-flex-icons">
              {/* <li className="nav-item">
                <a className="nav-link" href="/upload">
                  Upload
                </a>
              </li> */}
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
                  <a className="dropdown-item" href="/profile">
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
