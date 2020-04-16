import React from 'react'
import "../profiledisplay.css";
import profile from "../../../images/profile.jpg";
/**
* @author
* @function ProfileViewDisplay
**/

const ProfileViewDisplay = (props) => {

   let nameDisplay = props.userAccount.artist_nickname ? props.userAccount.artist_nickname : props.userEmail;
   let description = props.userAccount.description ? props.userAccount.description : "Description: ??";
   let genre = props.userAccount.genre ? props.userAccount.genre : 'Genre: ??';
   let profilePic = props.userAccount.profilePicture ? props.userAccount.profilePicture : profile;
   let location = <p>Location: ??</p>;
   if(props.userAccount.country && props.userAccount.city){
     location = <p>{props.userAccount.city}, {props.userAccount.country}</p>
   }else if((props.userAccount.country && !props.userAccount.city) ||(!props.userAccount.country && props.userAccount.city)){
     location = <p>{props.userAccount.city}{props.userAccount.country}</p>
   }
  return(
  
    <div class ="jumbotron" id="profileJumbotron">
        <div className="container">
          <div className="fb-profile">
            <img align="left" className="fb-image-lg" src={require("../../../images/profilebackground.jpg")} alt="Profile image banner" />
            <div className="profile-image-container"><img align="left" className="fb-image-profile thumbnail" src={profilePic} alt="Profile image" /></div>
            <div className="fb-profile-text">
             <h1>{nameDisplay}</h1>{genre}
             <p>{description}</p>
              <div className="profile-location-view">
                <i className="fas fa-map-marker-alt mr-2"/>
                <p >{location}</p> 
              </div>
       
              <button className="float-right">Message {nameDisplay}</button>
            </div>
          </div>
        </div> 
    </div>

   )

 }

export default ProfileViewDisplay