import React, {useState, useEffect } from 'react';
import $ from "jquery";
import "./musicdisplay.css";

/**
 * @author
 * @function MusicDisplay
 **/

const MusicDisplay = (props) => {

    useEffect(()=>{
        $('li').click(function() {
            $(this).addClass('active').siblings().removeClass('active');
          });
    },[])
   
  return (
    <div className="jumbotron">
        <h1>HipHop</h1>
        <div className ="row">
        <div className ="col">
       <div className="card" >
    <img src={require("../../images/jcole.jpg")} className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
    </div>
  </div>


  <div className ="col">
       <div className="card" >
    <img src={require("../../images/jcole.jpg")} className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
    </div>
  </div>



  <div className ="col">
       <div className="card" >
    <img src={require("../../images/jcole.jpg")} className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
    </div>
  </div>


  <div className ="col">
       <div className="card">
    <img src={require("../../images/jcole.jpg")} className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
    </div>
  </div>
  
  </div>
  <nav aria-label="Page navigation example">
  <ul class="pagination pg-blue justify-content-center">
    <li class="page-item ">
      <a class="page-link" tabindex="-1">Previous</a>
    </li>
    <li class="page-item"><a class="page-link">1</a></li>
    <li class="page-item active">
      <a class="page-link">2 <span class="sr-only">(current)</span></a>
    </li>
    <li class="page-item"><a class="page-link">3</a></li>
    <li class="page-item ">
      <a class="page-link">Next</a>
    </li>
  </ul>
</nav>
  </div>

  
 

  );
};

export default MusicDisplay;
