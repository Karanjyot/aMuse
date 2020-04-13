import React from "react";
import "./audioplayer.css";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer"
import Header from "../../components/Header/Header"



const AudioPlayer = ()=>{

    return(
        <div className="audioPage">
            <Header />
            <MusicPlayer />
            
        </div>
    )
}

export default AudioPlayer;