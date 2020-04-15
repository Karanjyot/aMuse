import React from 'react'
import './trendingArtists.css'
import user from '../../images/profile.jpg';
/**
* @author
* @function TrendingArtist
**/

const TrendingArtist = (props) => {
  return(
    <div className="container trnding-artists-main">
     <div className="trending-artist-title">
       Artists Trending Today
     </div>
      <div className="row d-flex flex-row justify-content-around align-items-center"> 
        <div className="col-md-3 d-flex flex-column align-items-center">
          <a  className="btn btn-link trending-artist-link">
            <figure className="account-figure">
              <div className="date"><span className="card-date-day">Genre</span><span className="card-date-month">Location</span></div>
              <figcaption>
                <h4> <span>Artists Name</span></h4>
                <p>Description: The magic Indian is a mysterious spiritual force.</p>
                <div className="account-card-userImg">
                  <img  src ={user} width="50%" />
                </div>
              </figcaption>
            </figure>
          </a>
        </div>
        <div className="col-md-3 d-flex flex-column align-items-center">
          <a className="btn btn-link trending-artist-link">
            <figure className="account-figure">
              <div className="date"><span className="card-date-day">Genre</span><span className="card-date-month">Location</span></div>
              <figcaption>
                <h4> <span>Artists Name</span></h4>
                <p>Description: The magic Indian is a mysterious spiritual force, and we're going to Cathedral Rock, and that's the vortex of the heart.</p>
                <div className="account-card-userImg">
                  <img  src ={user} width="50%" />
                </div>
              </figcaption>
            </figure>
          </a>
        </div>
        <div className="col-md-3 d-flex flex-column align-items-center">
          <a className="btn btn-link trending-artist-link">
            <figure className="account-figure">
              <div className="date"><span className="card-date-day">Genre</span><span className="card-date-month">Location</span></div>
              <figcaption>
                <h4> <span>Artists Name</span></h4>
                <p>Description: The magic Indian is a mysterious spiritual force, and we're going to Cathedral Rock, and that's the vortex of the heart.</p>
                <div className="account-card-userImg">
                  <img  src ={user} width="50%" />
                </div>
              </figcaption>
            </figure>
          </a>
        </div>
      </div>
    </div>  
   )

 }

export default TrendingArtist