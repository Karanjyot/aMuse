import React, { useState, useRef,useEffect } from "react";
import axios from "axios"
import "./MusicPlayerHome.css";
/**
 * @author
 * @function MusicPlayer
 **/

const MusicPlayerHome = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrntTime] = useState(null);
  const [duration, setDuration] = useState(null);

  const [currentAccountId, setCurrentAccountId] = useState("")

  
  const song = {
    title: props.songName,
    author: props.author,
    source: props.downloadURL,
    id: props.songID,
  };

  var songId = props.songID
  useEffect(()=> {
    axios.get(`/api/current_user/data`)
      .then(res=> {
        console.log(res.data.account._id);
        setCurrentAccountId(res.data.account._id);
      });
  }, []);

   // event handler for adding song to library
const libraryHandler = ()=>{
  axios.post(`/api/current_user/save_song/${currentAccountId}`,{song:songId})
  .then((res)=>{
    console.log(res)
  })
  .catch(err =>{
    console.log(err)
  })
}
   

  const player = useRef();

  const songStatusHandler = () => {
    setIsPlaying(!isPlaying);
    console.log(song.id)
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

  let songState = isPlaying ? <i className="fa fa-pause" /> : <i className="fa fa-play" />;
  const playerCore = (
    <div>
      <div className="song-name">
        <div className="song-menu">
          <button onClick={songStatusHandler} className="btn btn-primary">
            {songState}
          </button>
          <button onClick={libraryHandler} className="btn-add">
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
