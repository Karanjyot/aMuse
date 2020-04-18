import React from 'react'
import "../musicdisplay.css"
import defaultPhoto from "../../../images/photo.png"
import defaultMusic from '../../../images/note.png'
import sound from '../../../images/sound.png';//Icons made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
/**
* @author
* @function MusicDisplayView
**/
function getRandomSize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
const MusicDisplayView = (props) => {
    let viewMusic = <div className="d-flex flex-row justify-content-around"><img src={defaultMusic}  width="100px"/>The user did not upload any music</div>;

    if(props.userAccount.songs){
        viewMusic = props.userAccount.songs.map(song=> {
            let name = song.name;
            let cleanedName= name.substring(0, name.length -4);
            return (
                <div className="d-flex flex-column align-items-center justify-content-evenly tunes-by-user" key={song._id}>
                 
                         
                        <p>{cleanedName}</p>
                       
                        <div className="d-flex flex-row align-items-center justify-content-end">
                           
                            <button className="btn btn-outline-link mr-5 p-0"><i class="far fa-3x fa-play-circle"></i></button>
                            <button className="btn btn-outline-info ml-5"><i class="fab fa-angellist"></i>Comment</button>
                            <button className="btn btn-outline-danger ml-2"><i class="fas fa-heart"></i></button>

                        </div>

                </div>
            )
        })
    }
    let viewPhotos =<div className="d-flex flex-row justify-content-around"><img src={defaultPhoto}  width="100px"/>The user did not upload photos</div>;

    if(props.userAccount.images){
        viewPhotos = props.userAccount.images.map(img=> {
            let width = getRandomSize(200, 400);
            let height =  getRandomSize(200, 400);
            return(
                <div key={img._id}>
                    <img src={img.downloadURL} width={width} height={height} />
                </div>
            )
        })
    }
      return(
        <div className="row" id="music-display-view">
            <div className="col-md-7">
                <div className="d-flex flex-row justify-content-start align-items-end mb-4 ">
                <img src={sound} />  <h1>Tunes by {props.userAccount.artist_nickname}</h1>
                </div>
                {viewMusic}
            </div>
            <div id="photos" className="col-md-5 mt-5">
                {viewPhotos}
            </div>
        </div>
       )

 }

export default MusicDisplayView