import React, { useEffect, useState } from "react";
import "./librarydisplay.css";
import axios from "axios";
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


  var allSongs = Library.map((song, index) => {
    return (
      <li key={`${song._id}1`} className="card mb-3">
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
              {/* <a href="/audioplayer">
                      <p className="card-text">{account.artist_nickname}</p>
                    </a> */}

              {/* <audio controls ref={player} src={song.downloadURL} />
                    {renderPlay()} */}
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

  return (
    <div className="App jumbotron">
      <h1 className="genre">Library</h1>

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
            <div className="row">
              <ul className="list-group" id="myList1">
                {allSongs}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryDisplay;
