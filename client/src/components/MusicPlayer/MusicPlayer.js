import React, { useState, useEffect, useRef } from "react";
import "./musicplayer.css";
import axios from "axios"

/**
 * @author
 * @function MusicPlayer
 **/

const MusicPlayer = (props) => {
  const player = useRef();
  const [isPlaying, setisPlaying] = useState(false);


 


  // Function to control state if song is playing or paused
  const play = () => {
    if (isPlaying === false) {
      player.current.play();
      setisPlaying(true);
    } else {
      player.current.pause();
      setisPlaying(false);
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

  return (
    <div>
      <div>
        <audio ref={player} preload="auto" controls>
          <source src={require("./Nas.mp3")} type="audio/mpeg"></source>
        </audio>
      </div>
      <div className="glow container">
        <div className="text-container">
          <span className="text">Song Name</span>
          <br />
          <span className="text">Artist</span>
          <br />
          <div className="playback_controls">
            <button className="audioBut" onClick="skip('back')">
              <i className="fa fa-fast-backward" />
            </button>
            {renderPlay()}
            <button className="audioBut" onClick={stop}>
              <i className="fa fa-stop" />
            </button>
            <button className="audioBut" onClick="skip('fwd')">
              <i className="fa fa-fast-forward" />
            </button>
          </div>
          <br />
          <div id="seekbar">
            <input type="range" oninput="f" id="seek" defaultValue={0} />
          </div>
          <br />
          <div className="volume_controls">
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
          </div>
        </div>
      </div>

      {/* playlist */}
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
      </div>
    </div>
  );
};

export default MusicPlayer;
