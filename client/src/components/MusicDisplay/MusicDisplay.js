import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./musicdisplay.css";

/**
 * @author
 * @function MusicDisplay
 **/

const MusicDisplay = (props) => {
  useEffect(() => {
    $("li").click(function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
  }, []);

  return (
    <div className="jumbotron">
      <h1 className="genre">Genre</h1>
      <div className="row">
        {/* Song 1 */}
        <div className="col">
          <div className="card">
            <img
              src={require("../../images/jcole.jpg")}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Song Name</h5>
              <p className="card-text">Artist</p>
              <a href="#" className="btn btn-primary">
                Play
              </a>
              <a><i class="fas fa-plus"></i></a>
            </div>
          </div>
        </div>
        {/* Song 2 */}
        <div className="col">
          <div className="card">
            <img
              src={require("../../images/jcole.jpg")}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Song Name</h5>
              <p className="card-text">Artist</p>
              <a href="#" className="btn btn-primary">
                Play
              </a>
              <a><i class="fas fa-plus"></i></a>
            </div>
          </div>
        </div>
        {/* Song 3 */}
        <div className="col">
          <div className="card">
            <img
              src={require("../../images/jcole.jpg")}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Song Name</h5>
              <p className="card-text">Artist</p>
              <a href="#" className="btn btn-primary">
                Play
              </a>
              <a><i class="fas fa-plus"></i></a>
            </div>
          </div>
        </div>
        {/* Song 4 */}
        <div className="col">
          <div className="card">
            <img
              src={require("../../images/jcole.jpg")}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Song Name</h5>
              <p className="card-text">Artist</p>
              <a href="#" className="btn btn-primary">
                Play
              </a>
              <a><i class="fas fa-plus"></i></a>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <nav aria-label="Page navigation example " className="page-padding">
        <ul class="pagination pg-blue justify-content-center">
          <li class="page-item ">
            <a class="page-link" tabindex="-1">
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link">1</a>
          </li>
          <li class="page-item active">
            <a class="page-link">
              2 <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link">3</a>
          </li>
          <li class="page-item ">
            <a class="page-link">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MusicDisplay;
