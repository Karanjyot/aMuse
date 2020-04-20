import React, { useState, useRef } from "react";
import "./musicplayer.css";


import axios from "axios"


import drake from '../../images/drake.jpg';
/**
 * @author
 * @function MusicPlayer
 **/

const MusicPlayer = (props) => {

  const [isPlaying, setisPlaying] = useState(false);
  const [url, setURL] = useState("");


  const player = useRef();


  // Function to control state if song is playing or paused
  const play = () => {
    if (!isPlaying) {
      setisPlaying(true);
      player.current.play();
   
    } else {
      setisPlaying(false);
      player.current.pause();
    
    }
  };

  // stop song from playing
  const stop = () => {
    player.current.pause();
  };

  //Update play/pause button based off of state
  const renderPlay = () => {
    if (isPlaying === true) {
      return (
        <button className="audioBut" onClick={play}>
          <i className="fa fa-pause" />
        </button>
      );
    } else {
      return (
        <button className="audioBut" onClick={play}>
          <i className="fa fa-play" />
        </button>
      );
    }
  };

  let name = props.song.name;

  return (
    <div className="container ">
      <div className="row mt-4 d-flex flex-row justify-content-between">
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <audio ref={player} src={props.song.downloadURL} />
          <div className="glow container">
            <div className="text-container">
              <span className="text">{name}</span>
              <br />
              <div className="playback_controls">
                <button className="audioBut" >
                  <i className="fa fa-fast-backward" />
                </button>
                {renderPlay()}
                <button className="audioBut" onClick={stop}>
                  <i className="fa fa-stop" />
                </button>
                <button className="audioBut">
                  <i className="fa fa-fast-forward" />
                </button>
              </div>
              <br />
              <div id="seekbar">
                <input type="range" id="seek" defaultValue={0} />
              </div>
              <br />
          </div>
        </div>
        <i className="fas fa-2x fa-heart song-page-like"> 4</i>      
       </div>
       <div className="col-md-5 d-flex flex-column align-items-center justify-content-around music-player-main">
        <h2>{props.artist}</h2>
        <img src={props.song.albumPhoto} width="90%" fluid/>
       </div>
      </div>
    </div>
  );
};

export default MusicPlayer;

          {/* <div className="volume_controls">
            <button className="audioBut" id="mute" onClick="mute()">
              <i className="fa fa-volume-up" />
            </button>
            <input
              type="range"
              id="volume"
              oninput="setVolume(this.value)"
              min={0}
              max={1}
              step="0.01"
              defaultValue={1}
            />
          </div> */}

      {/* playlist
      <div className="play-list">
        <div className="container  ">
          <div className="row ">
            <div className="col-12 col-sm-8 col-lg-5">
              <h6 className="text-muted">Album/Playlist Name</h6>
              <ul className="list-group">
                <li className="list-group-item d-flex align-items-center">
                  <div className="image-parent">
                    <img
                      src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/things_fall_apart.jpg"
                      className="img-fluid"
                      alt="things"
                    />
                  </div>
                  1. Song Name{" "}
                  <div className="play-listitem">{renderPlay()}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}