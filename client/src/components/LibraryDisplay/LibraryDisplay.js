import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "./librarydisplay.css";
import MusicPlayerHome from "../../components/MusicPlayerHome/MusicPlayerHome";
/**
 * @author
 * @function Jumbotron
 **/

const LibraryDisplay = (props) => {
  const [Library, setCurrentLibrary] = useState([]);

  // retrieve library of current user
  useEffect(() => {
    axios.get(`/api/current_user/data`).then((res) => {
      console.log(res.data.account.library);
      setCurrentLibrary(res.data.account.library);
    });
  }, []);

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

  // Display all songs in library
  var allSongs = Library.map((song, index) => {
    return (
      <li key={`${song._id}1`} className="card mb-3">
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
              <a href={`/view-account/${song.accountID}`}>
                <p className="card-text">{song.artist}</p>
              </a>
              <MusicPlayerHome
                songName={song.name}
                downloadURL={song.downloadURL}
                songID={song._id}
                songArtist={song.artist}
              />
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="App jumbotron">
      <h1 className="genre">My Favourites</h1>

      <div className="container">
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

export default LibraryDisplay;
