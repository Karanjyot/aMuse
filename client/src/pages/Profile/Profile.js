import React from "react";
import "./profile.css"
import ProfileCarousel from "../../components/ProfileCarousel/ProfileCarousel"
import Header from "../../components/Header/Header"
import UserMusic from "../../components/UserMusic/UserMusic"



const Profile = () =>{

return (
    <div id="profilePage">
    <div className="container" >
        <Header />
        <ProfileCarousel />
        <UserMusic />
    </div>
    </div>
)

}

export default Profile