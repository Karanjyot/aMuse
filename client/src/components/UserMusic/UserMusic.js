import React, { useState, useEffect } from "react"
import "./usermusic.css"
import $ from "jquery";



const UserMusic = () =>{

        useEffect(() => {
          $("li").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            
          });
        
        }, []);

      const renderMusic = ()=>
        [1,2,3,4,5,6,7,8].map(song=>{

              return (<div className="col-3">
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
                    <button className="btn-add"><i className="fas fa-trash-alt"></i></button>
                  </div>
                </div>
              </div>
              )
            })
        

    return(
        <div>
             <div className="jumbotron">
      <h1 className="genre">My Music</h1>
      <div className="row">
       {renderMusic()}
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
        </div>
    )
}

export default UserMusic