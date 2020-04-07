import React from "react";


import "./landing.css"


const Landing = () =>{
    return(
        <div >
            <div className="jumbotron jumbotron1 jumbotron-fluid">
              <div className="container">
                <a href="/login"><button type="button" className="btn btn-dark">Login</button></a>
                <a href="/signup"><button type="button" className="btn btn-dark">Signup</button></a>
              </div>
            </div>

        </div>
    );
};

export default Landing