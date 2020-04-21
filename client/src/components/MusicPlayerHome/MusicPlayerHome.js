import React, { useState, useRef } from "react";
import "./MusicPlayerHome.css";
/**
 * @author
 * @function MusicPlayer
 **/

const MusicPlayerHome = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrntTime] = useState(null);
  const [duration, setDuration] = useState(null);

  const player = useRef();

  const songStatusHandler = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      player.current.pause();
    } else {
      player.current.play();
    }
  };
  const songStopHandler = () => {
    setIsPlaying(false);
    player.current.pause();
    player.current.currentTime = 0;
  };
  const song = {
    title: props.songName,
    author: props.author,
    source: props.downloadURL,
    id: props.songID,
  };
  let songState = isPlaying ? <i className="fa fa-pause" /> : <i className="fa fa-play" />;
  const playerCore = (
    <div>
      <div className="song-name">
        <div className="song-menu">
          <button onClick={songStatusHandler} className="btn btn-primary">
            {songState}
          </button>
          <button className="btn-add">
                  <i className="fas fa-plus"></i>
                </button>
          {/* <button onClick={songStatusHandler}>
          {songState}
            
          </button>
          <button onClick={songStopHandler} className="btn btn-danger">
            Stop
          </button> */}
        </div>
      </div>
    </div>
  );
  return (
    <div className="player-core">
      {playerCore}
      <audio ref={player} src={song.source} />
    </div>
  );
};

export default MusicPlayerHome;
