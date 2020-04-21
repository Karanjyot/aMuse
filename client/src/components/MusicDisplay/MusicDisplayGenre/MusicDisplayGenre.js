import React, { useState, useEffect, useRef } from "react";

import $ from "jquery";
import "./musicdisplaygenre.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import MusicPlayer from "../../MusicPlayer/MusicPlayer";
import Search from "../../Search/search";
import MusicPlayerHome from "../../MusicPlayerHome/MusicPlayerHome";

/**
 * @author
 * @function MusicDisplay
 **/

/********************************************** Component to render****************************************************/

const MusicDisplayGenre = (props) => {
  const [accounts, setAccounts] = useState([]);
  const song = {
    genre: props.genre,
  };

  useEffect(() => {
    axios
      .get("api/accounts/find")
      .then((res) => {
        console.log(res.data.accounts);
        setAccounts(res.data.accounts);
      })

      .catch((err) => console.log(err));
    $(document).ready(function () {
      $(`#${song.genre}1`).on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(`#${song.genre} li`).filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });
    console.log(props.accounts);
  }, []);

  // display specified genre
  var genre = accounts.map((account, index) => {
    if (account.genre === song.genre) {
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

                  <MusicPlayerHome
                    songName={song.name}
                    downloadURL={song.downloadURL}
                    songID={song._id}
                  />
                </div>
              </div>
            </div>
          </li>
        );
      });
    } else {
      return;
    }
  });

  return (
    <div className="App jumbotron">
      <h1 className="genre">
        {song.genre.charAt(0).toUpperCase() + song.genre.slice(1)}
      </h1>
      <div className="container">
        <div className="active-pink-3 active-pink-4">
          <input
            className="form-control"
            id={`${song.genre}1`}
            type="text"
            placeholder="Search for a song"
          />
          <br />
          <div className="jb">
            <div className="row">
              <ul className="list-group" id={`${song.genre}`}>
                {genre}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicDisplayGenre;
