import React from "react";
import "./profile.css"
import ProfileDisplay from "../../components/ProfileDisplay/ProfileDisplay"
import Header from "../../components/Header/Header"
import UserMusic from "../../components/UserMusic/UserMusic"



const Profile = () =>{

return (
    <div id="profilePage">
    <div className="container" >
        <Header />
        <ProfileDisplay />
        <UserMusic />
    </div>
    </div>
)

}

export default Profile