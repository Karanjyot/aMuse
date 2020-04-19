import React from "react";
import "./audioplayer.css";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer"
import Header from "../../components/Header/Header"
import profile from "../../images/profile.jpg"


const AudioPlayer = ()=>{

    return(
        <div className=" audioPage">
            <Header />
            
            <MusicPlayer />
            <div className="container-fluid comment-section">
                <h3><span># </span>Comments</h3>
                <div className="row">
                    <div className="col-sm-3 d-flex flex-column align-items-end">
                        <div>
                            <img src={profile} alt="users profile image shown for comments"  width="50px"/>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <form className="d-flex flex-row justify-content-between comment-form">
                            <input placeholder="Add a public comment..."/>
                            <button className="btn btn-dark" type="submit">Comment</button>
                        </form>
                        <div className="users-comments-display">
                            
                        </div>
                    </div>
                </div>
            </div>      
        </div>
    )
}

export default AudioPlayer;