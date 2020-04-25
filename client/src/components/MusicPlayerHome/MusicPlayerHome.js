import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./MusicPlayerHome.css";
import $ from "jquery";
/**
 * @author
 * @function MusicPlayer
 **/

const MusicPlayerHome = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAccountId, setCurrentAccountId] = useState("");
  const [Library, setLibrary] = useState([]);
  const [inLib, setInLib] = useState(false);

  // song props from MusicDisplayAll and MusicDisplayGenre
  const song = {
    title: props.songName,
    author: props.author,
    source: props.downloadURL,
    id: props.songID,
    artist: props.songArtist,
  };

  var songId = props.songID;

  // retrieve account details of the logged in user
  useEffect(() => {
    axios.get(`/api/current_user/data`).then((res) => {
      setCurrentAccountId(res.data.account._id);
      setLibrary(res.data.account.library);
      console.log(res.data.account._id);
      console.log(res.data.account);
      console.log(res.data.account.library);
    });
  }, []);

  // onClick event handler to add songs to library
  const AddLibraryHandler = () => {
    setInLib(true);

    axios
      .post(`/api/current_user/save_song/${currentAccountId}`, { song: songId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // onClick event handler to delete songs from library
  const deleteLibraryHandler = () => {
    setInLib(false);

    axios
      .post(`/api/current_user/delete_song/${currentAccountId}`, {
        song: songId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Check if song is in library when page loads to determine which icon is displayed
  var onLoadLibraryStatus = Library.map((lib) => {
    if (lib._id === song.id) {
      $(`#${song.id}`).remove();

      return (
        <a><span key={song.id + 2}onClick={deleteLibraryHandler} id="heart">
          <i className="fa fa-minus add-delete-btn" />
        </span></a>
      );
    }
  });

  // audio handlers
  const player = useRef();

  const songStatusHandler = () => {
    setIsPlaying(!isPlaying);
    console.log(song.id);
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

  let songState = isPlaying ? (
    <i className="fa fa-pause" />
  ) : (
    <i className="fa fa-play" />
  );

  // let libState= inLib ? (
  //   <span  onClick={deleteHandler}id="heart"><i class="fas fa-trash-alt testt"/> </span>
  // ) : (
  //   <span  onClick={libraryHandler}id="h"><i className="far fa-heart testt" aria-hidden="true" /> </span>
  // )


  const playerCore = (
    <div>
     <a><span id={song.id} onClick={AddLibraryHandler}>
        <i className="fas fa-plus add-delete-btn"></i>
      </span></a>
      <div className="song-name">
        <div className="song-menu">
          <button onClick={songStatusHandler} className="audioBut play-pause-but">
            {songState}
          </button>

          {onLoadLibraryStatus}
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
