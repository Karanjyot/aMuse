import React, { useState, useRef } from "react";
import "./musicplayer.css";
import profile from '../../images/music.png';
/**
 * @author
 * @function MusicPlayer
 **/

const MusicPlayer = (props) => {
  const player = useRef();


  const [isPlaying, setisPlaying] = useState(false);




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
    player.current.currentTime = 0;
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
              <h5 className="player-artist-section">- {props.artist}</h5>
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
              {/* <br />
              <div id="seekbar">
                <input type="range" id="seek" defaultValue={0}/>
              </div>
              <br /> */}
          </div>
        </div>
             
       </div>
       <div className="col-md-5 d-flex flex-column align-items-center justify-content-around music-player-main">
        <h2>Album by {props.artist}</h2>
        <img id="albumphoto" src={props.song.albumPhoto ? props.song.albumPhoto : profile} width="50%" />
       </div>
      </div>
    </div>
  );
};

export default MusicPlayer;

