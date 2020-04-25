import React from 'react'
import './trendingArtists.css'
import user from '../../images/profile.jpg';
/**
* @author
* @function TrendingArtist
**/

const TrendingArtist = (props) => {

const trendingArtists = props.accounts.map((acc,i)=> {
  if(acc.userId !== props.currentUser._id && i < 3){
    const genre = acc.genre.split(",");
    const description = acc.description.length < 150 ? acc.description:`${acc.description.substring(0, 150)}...` 
    return(
    <div onClick={()=> props.view(acc._id)} key={acc._id} className="col-md-3 d-flex flex-column align-items-center">
      <a  className="btn btn-link trending-artist-link">
        <figure className="account-figure">
        <div className="date">
          <span className="card-date-day">{genre[0]}</span>
          <span className="card-date-month">{acc.city}, {acc.country}</span>
        </div>
          <figcaption>
            <h4> <span>{acc.artist_nickname}</span></h4>
            <p>{description}</p>
            <div className="account-card-userImg">
              <img className="account-card-imageTag"  src ={acc.profilePicture ? acc.profilePicture : user} /> 
            </div>
          </figcaption>
        </figure>
      </a>
    </div>      
      )
  }

})
  return(
    <div className="container trnding-artists-main">
     <div className="trending-artist-title">
       Artists Trending Today
     </div>
      <div className="row d-flex flex-row justify-content-around align-items-center"> 
        {trendingArtists}
      </div>
    </div>  
   )

 }

export default TrendingArtist