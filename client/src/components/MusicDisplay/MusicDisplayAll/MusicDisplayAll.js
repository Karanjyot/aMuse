import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import "./musicdisplayall.css";
import MusicPlayerHome from "../../MusicPlayerHome/MusicPlayerHome";

/**
 * @author
 * @function MusicDisplay
 **/

/********************************************** Component to render****************************************************/

const MusicDisplayAll = (props) => {
  const [accounts, setAccounts] = useState([]);

  // retrieve information for all accounts
  useEffect(() => {
    axios
      .get("api/accounts/find")
      .then((res) => {
        console.log(res.data.accounts);
        setAccounts(res.data.accounts);
      })
      .catch((err) => console.log(err));
    console.log(props.accounts);
  }, []);

  // search for a song
  useEffect(() => {
    $(document).ready(function () {
      $("#listSearch1").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myList1 li").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });
  }, []);

  // display all songs
  var allSongs = accounts.map((account, index) => {
    return account.songs.map((song, i) => {
      return (
        <li key={song._id} className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4 ">
              {
                <img
                  src={
                    song.albumPhoto
                      ? song.albumPhoto
                      : "https://assets.audiomack.com/default-song-image.jpg"
                  }
                  className="card-img album-img"
                  alt="..."
                />
              }
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <a href={`/view-song/${song._id}`}>
                  <h5 className="card-title song-name">
                    {song.name.replace(/\.[^/.]+$/, "")}
                  </h5>
                </a>
                <a href={`/view-account/${account._id}`}>
                  <p className="card-text artist-name">
                    {account.artist_nickname}
                  </p>
                </a>
                <MusicPlayerHome
                  artist={account.artist_nickname}
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
  });

  return (
    <div className="App jumbotron">
      <h1 className="genre">Explore Music</h1>

      <div className="container list-section-home">
        <div className="active-pink-3 active-pink-4">
          <input
            className="form-control"
            id="listSearch1"
            type="text"
            placeholder="Search for a song"
          />
          <br />
          <div className="jb">
            <ul className="list-group" id="myList1">
              {allSongs}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicDisplayAll;
