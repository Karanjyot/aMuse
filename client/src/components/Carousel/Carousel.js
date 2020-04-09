import React from "react";
import "./carousel.css";

/**
 * @author
 * @function Jumbotron
 **/

const Carousel = (props) => {
  return (
    <div>
      <div className="container">
        <div>
          <div
            id="carousel-example-1z"
            className="carousel slide carousel-fade"
            data-ride="carousel"
            data-interval="5000"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carousel-example-1z"
                data-slide-to={0}
                className="active"
              />
              <li data-target="#carousel-example-1z" data-slide-to={1} />
              <li data-target="#carousel-example-1z" data-slide-to={2} />
            </ol>

            <div className="carousel-inner">
              <div className="carousel-item active ">
                <img
                  className="d-block w-100"
                  src={require("../../images/drake.jpg")}
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={require("../../images/nas.jpg")}
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={require("../../images/jcole.jpg")}
                  alt="Third slide"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
