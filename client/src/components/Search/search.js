import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";

const Search = () => {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get("api/songs")
      .then((res) => {
        console.log(res.data.songs);
        setSongs(res.data.songs);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredSong = songs.filter((song) => {
    return song.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  return (
    <div>
      <form className="form-inline my-1">
        <div className="md-form form-sm my-0">
          <input
            className="form-control form-control-sm mr-sm-2 mb-0"
            type="text"
            placeholder="Search"
            aria-label="Search"
            list="browsers"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <datalist id="browsers">
            {filteredSong.map((song) => {
              return <option value={song.name}></option>;
            })}
          </datalist>
        </div>
        <button className="btn btn-outline-white btn-sm my-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
