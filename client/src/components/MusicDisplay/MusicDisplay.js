import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./musicdisplay.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";

/**
 * @author
 * @function MusicDisplay
 **/

/******************************** slick slider functions**************************************************/

function Arrow(props) {
  let className = props.type === "next" ? "nextArrow" : "prevArrow";
  className += " arrow";
  const char = props.type === "next" ? "👉" : "👈";
  return (
    <span className={className} onClick={props.onClick}>
      {char}
    </span>
  );
}

function customPaging(i) {
  return <span>{i + 1}</span>;
}

function appendDots(dots) {
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <ul style={{ margin: "3px" }}> {dots} </ul>
    </div>
  );
}

/********************************************** Component to render****************************************************/

const MusicDisplay = (props) => {
  const [allSongs, setAllSongs] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // axios.get("/api/songs").then(res=>{
    //   console.log(res.data.songs);

    //    setAllSongs(res.data.songs);

    axios
      .get("api/accounts/find")
      .then((res) => {
        console.log(res.data.accounts);
        setAccounts(res.data.accounts);
      })
      .catch((err) => console.log(err));

    // renderSlides()
  }, []);

  const handleClick = () => {
    console.log("hello");
  };

  // const renderSlides = () =>
  // allSongs.map(song => (
  //   <div>
  //       <div className="col">
  //         <div className="card">
  //           <img
  //             src={require("../../images/jcole.jpg")}
  //             className="card-img-top"
  //             alt="..."
  //           />
  //           <div className="card-body">
  //             <a href="/audioplayer" onClick={handleClick}><h5 className="card-title">{song.name}</h5></a>
  //             <a href="/audioplayer"><p className="card-text">Artist</p></a>
  //             <a href="/audioplayer"><button className="btn btn-primary"><i className="fas fa-play"></i></button></a>
  //             <button className="btn-add"><i className="fas fa-plus"></i></button>
  //           </div>
  //         </div>
  //       </div>
  //   </div>
  // ));

  // var namesList = accounts.map(function(account){
  //     {account.songs.map(song=>{
  //       return <li>Helloo</li>;
  //     })
  //   }

  //    })

  var namesList = accounts.map((account, index) => {
    return (
      <div key={index}>
        {account.songs.map((song, i) => {
          return (
            //   <div className="card" >
            //     <img
            //       src={song.albumPhoto}
            //       className="card-img-top"
            //       alt="..."
            //     />
            //     <div className="card-body">
            //       <a href="/audioplayer" onClick={handleClick}><h5 className="card-title">{song.name}</h5></a>
            //       <a href="/audioplayer"><p className="card-text">{account.artist_nickname}</p></a>
            //       <a href="/audioplayer"><button className="btn btn-primary"><i className="fas fa-play"></i></button></a>
            //       <button className="btn-add"><i className="fas fa-plus"></i></button>
            //     </div>

            // </div>

            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={song.albumPhoto} className="card-img" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <a href="/audioplayer" onClick={handleClick}>
                      <h5 className="card-title">{song.name}</h5>
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
  });

  return (
    <div>
      {/********************************************** Slider ****************************************************/}
      <div className="App jumbotron">
        <div class="jb">
          <h1 className="genre">Genre</h1>
          <div className="row">{namesList}</div>
        </div>

        {/* <Slider
     
        slidesToShow={4}
        slidesToScroll={2}
        autoplay={false}
        // autoplaySpeed={3000}
        nextArrow={<Arrow type="next" />}
        prevArrow={<Arrow type="prev" />}
        dots={true}
        customPaging={customPaging}
        appendDots={appendDots}
      >
        
        {renderSlides()} 
      
      </Slider> */}
      </div>
    </div>
  );
};

export default MusicDisplay;
