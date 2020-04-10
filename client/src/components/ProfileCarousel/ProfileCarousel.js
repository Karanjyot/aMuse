import React, {useState, useEffect} from "react";
import axios from "axios";
import "./profileCarousel.css";

/**
* @author
* @function ProfileCarousel
**/

const ProfileCarousel = () =>{

    const [user, setUser] = useState([]);
    const [local, setLocal] = useState([]);


    const fetchResource = async () =>{
        const response = await axios.get("/api/current_user")
 
             console.log(response.data)
             // this.setstate({ user: response.data})

            if(response.data.name){
                setUser(response.data.name)
            }else{
                setUser(response.data.email)
            }
             
 
 
      }

    // const fetchLocal = async() =>{
    //  const response =   await axios.post('/api/local/signin')
     
    //     setLocal(response.data.config.email)
    // }  

    useEffect(() =>{
        fetchResource()
        // fetchLocal()
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
  <button id="imgBut"><i className="fas fa-camera">Upload image</i></button>
</div> 
    
        </div>
    )
}

export default ProfileCarousel