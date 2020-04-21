import React, { useState, useEffect, useRef } from "react";

import $ from "jquery";
import "./musicdisplay.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import Search from "../../components/Search/search";

/**
 * @author
 * @function MusicDisplay
 **/

/********************************************** Component to render****************************************************/

const MusicDisplay = (props) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios
      .get("api/accounts/find")
      .then((res) => {
        console.log(res.data.accounts);
        setAccounts(res.data.accounts);
      })

      .catch((err) => console.log(err));
      $(document).ready(function () {
        $("#listSearch").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myList li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
          });
        });
    });
    console.log(props.accounts);
  }, []);

  const player = useRef();
  const [isPlaying, setisPlaying] = useState(false);
  const [song, setSong] = useState("");

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
        <button className="btn btn-primary" onClick={play}>
          <i className="fa fa-pause" />
        </button> 
      );
    } else {
      return (
        <button className="btn btn-primary" onClick={play}>
          <i className="fa fa-play" />
        </button>
      );
    }
  };

  // display all songs
  var allSongs = accounts.map((account, index) => {
    console.log("text");
    return account.songs.map((song, i) => {
      return (
        <li key={song._id} className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4 ">
              {
                <img
                  src={song.albumPhoto}
                  className="card-img album-img"
                  alt="..."
                />
              }
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <a href="/audioplayer">
                  <h5 className="card-title">
                    {song.name.replace(/\.[^/.]+$/, "")}
                  </h5>
                </a>
                <a href="/audioplayer">
                  <p className="card-text">{account.artist_nickname}</p>
                </a>
               
                <audio ref={player} src={song.downloadURL} />
               {renderPlay()}
                <button className="btn-add">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
      );
    });
  });

  // display rap
  var genre = accounts.map((account, index) => {
    if (account.genre === "rap") {
      return (
        <div key={index}>
          {account.songs.map((song, i) => {
            return (
              <div key={song._id} className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4 ">
                    {
                      <img
                        src={song.albumPhoto}
                        className="card-img album-img"
                        alt="..."
                      />
                    }
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <a href="/audioplayer">
                        <h5 className="card-title">
                          {song.name.replace(/\.[^/.]+$/, "")}
                        </h5>
                      </a>
                      <a href="/audioplayer">
                        <p className="card-text">{account.artist_nickname}</p>
                      </a>
                      <a href="/audioplayer">
                        <button className="btn btn-primary">
                          <i className="fas fa-play"></i>
                        </button>
                      </a>
                      <button className="btn-add">
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return;
    }
  });

  return (
    <div>
      <div className="App jumbotron">
        <h1 className="genre">Explore</h1>

        <div className="container">
          <div className="active-pink-3 active-pink-4">
            <input
              className="form-control"
              id="listSearch"
              type="text"
              placeholder="Search for a song"
            />
            <br />
            <div className="jb">
              <div className="row">
                <ul className="list-group" id="myList">
                  {allSongs}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="App jumbotron">
        <h1 className="genre">Rap</h1>
        <div className="jb">
          <div className="row">{genre}</div>
        </div>
      </div>
    </div>
  );
};

export default MusicDisplay;
