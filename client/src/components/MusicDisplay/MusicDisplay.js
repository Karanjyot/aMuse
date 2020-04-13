import React, { useState, useEffect} from "react";
import $ from "jquery";
import "./musicdisplay.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

/**
 * @author
 * @function MusicDisplay
 **/

 /******************************** slick slider functions**************************************************/ 
function Arrow(props) {
  let className = props.type === "next" ? "nextArrow" : "prevArrow";
  className += " arrow";
  const char = props.type === "next" ? "👉" : "👈";
  return (
    <span className={className} onClick={props.onClick}>
      {char}
    </span>
  );
}


function customPaging(i) {
  return <span>{i + 1}</span>;
}

function appendDots(dots) {
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <ul style={{ margin: "3px" }}> {dots} </ul>
    </div>
  );
}


/********************************************** Component to render****************************************************/ 
const MusicDisplay = (props) => {
  useEffect(() => {
    $("li").click(function () {
      $(this).addClass("active").siblings().removeClass("active");
      
  
    });
  }, []);

  const renderSlides = () =>
  [1, 2, 3, 4, 5, 6, 7, 8].map(num => (
    <div>
        <div className="col">
          <div className="card">
            <img
              src={require("../../images/jcole.jpg")}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <a href="/audioplayer"><h5 className="card-title">Song Name</h5></a>
              <a href="/audioplayer"><p className="card-text">Artist</p></a>
              <button className="btn btn-primary"><i className="fas fa-play"></i></button>
              <button className="btn-add"><i className="fas fa-plus"></i></button>
            </div>
          </div>
        </div>
    </div>
  ));

   
  return (
    <div>
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
              <button className="btn btn-primary"><i className="fas fa-play"></i></button>
              <button className="btn-add"><i className="fas fa-plus"></i></button>
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
              <button className="btn btn-primary"><i className="fas fa-play"></i></button>
              <button className="btn-add"><i className="fas fa-plus"></i></button>
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
              <button className="btn btn-primary"><i className="fas fa-play"></i></button>
              <button className="btn-add"><i className="fas fa-plus"></i></button>
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
              <button className="btn btn-primary"><i className="fas fa-play"></i></button>
              <button className="btn-add"><i className="fas fa-plus"></i></button>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <nav aria-label="Page navigation example " className="page-padding">
  <ul className="pagination pg-blue justify-content-center">
    <li className="page-item ">
      <a className="page-link" tabIndex={-1}>
        Previous
      </a>
    </li>
    <li className="page-item">
      <a className="page-link">1</a>
    </li>
    <li className="page-item active">
      <a className="page-link">
        2 <span className="sr-only">(current)</span>
      </a>
    </li>
    <li className="page-item">
      <a className="page-link">3</a>
    </li>
    <li className="page-item ">
      <a className="page-link">Next</a>
    </li>
  </ul>
</nav>
     

</div>

{ /********************************************** Slider ****************************************************/ }
<div className="App jumbotron">
  <h1 className="genre">Genre</h1>
    
    <Slider
     
        slidesToShow={4}
        slidesToScroll={2}
        autoplay={false}
        // autoplaySpeed={3000}
        nextArrow={<Arrow type="next" />}
        prevArrow={<Arrow type="prev" />}
        dots={true}
        customPaging={customPaging}
        appendDots={appendDots}
      >
        {renderSlides()} 
      </Slider>
    </div>

</div>
   
  );
};

export default MusicDisplay;
