import React, {useState, useEffect} from "react";
import axios from "axios";
import "./profiledisplay.css";
import { PromiseProvider } from "mongoose";

/**
* @author
* @function ProfileCarousel
**/

const ProfileDisplay = (props) =>{

    const [user, setUser] = useState([]);


    const fetchUser = () =>{
        axios.get("/api/current_user").then(response =>{
          
          console.log(response.data)
          if(response.data.name){
            setUser(response.data.name)
        }else{
            setUser(response.data.email)
        }
        })}
 

    useEffect(() =>{
        fetchUser()
    }, [])


    return(
        <div class ="jumbotron" id="profileJumbotron">
          <div className="container">
          <div className="fb-profile">
            <img align="left" className="fb-image-lg" src={require("../../images/profilebackground.jpg")} alt="Profile image banner" />
            <img align="left" className="fb-image-profile thumbnail" src={require("../../images/profile.jpg")} alt="Profile image" />
            <div className="fb-profile-text">
              <h1>{user}</h1>
              <p>The best rapper out there</p>
            </div>
          </div>
          <button onClick={()=> props.uploadMenu()}
                  id="imgBut"><i className="fas fa-camera">Upload image</i>
          </button>
        </div> 
        </div>
    )
}

export default ProfileDisplay