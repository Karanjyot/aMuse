import React, {useState} from 'react'
import "../MusicDisplayAll/musicdisplayall.css"
import firebase from "firebase";
import {useHistory} from "react-router-dom"
import axios from 'axios';
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
    const [viewPhoto, setViewPhoto] = useState(false);
    const [viewTunes, setViewTunes] = useState(false);

    let history = useHistory();

    const songPageHandler = (id)=> {
        history.push(`/view-song/${id}`)
    }

    const deleteSongHandler = (id)=>{
        axios.delete(`/api/remove-song/${id}`)
            .then(res => console.log(res))
            .catch(err=> console.log(err));
    }
    const deleteImageHandler = (id)=>{
        axios.delete(`/api/remove-image/${id}`)
            .then(res => console.log(res))
            .catch(err=> console.log(err));
    }

    const deleteSongStorageHandler = (id,name)=> {
        const storageRef = firebase.storage().ref();
        const songRef = storageRef.child(`music/${name}`);
        songRef.delete()
            .then(()=>{
                console.log(`${name} deleted from Firebase Storage`);
                deleteSongHandler(id);
            }).catch(err=> console.log(err))
    }
    const deleteImageStorageHandler = (id,name)=> {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`photos/${name}`);
        imageRef.delete()
        .then(()=>{
            console.log(`${name} deleted from Firebase Storage`);
            deleteImageHandler(id);
        }).catch(err=> console.log(err))
    }

    let viewMusic = <div className="d-flex flex-row justify-content-around"><img src={defaultMusic}  width="100px"/>The user did not upload any music</div>;
    if(props.userAccount.songs){
        viewMusic = props.userAccount.songs.map(song=> {
            let name = song.name;
            let cleanedName= name.substring(0, name.length -4);
            let comments = song.comments.length;
            let likes = song.likes.length;
            if(props.viewType === "account"){
                return (
                    //Controls for song output when user views someones account
                    <div className="d-flex flex-column align-items-center justify-content-evenly tunes-by-user" key={song._id}>                     
                        <p onClick={()=>songPageHandler(song._id)} className="tunes-byuser-songname">{cleanedName}</p>                  
                        <div className="d-flex flex-row align-items-center justify-content-end">                        
                            <button onClick={()=>songPageHandler(song._id)} className="btn btn-outline-link mr-5 d-flex  p-0">
                                <i class="far fa-3x fa-play-circle"></i>
                            </button>
                            <div className="d-flex flex-row align-items-center justify-content-end ml-5 ">
                                <p >{comments}</p>
                                <button onClick={()=>songPageHandler(song._id)} className="btn btn-outline-info px-2 py-1">
                                    comments
                                </button>
                            </div >
                            <div className="d-flex flex-row align-items-center justify-content-end ml-1">
                                <p>{likes}</p>
                                <button  onClick={()=>songPageHandler(song._id)} className="btn btn-outline-danger py-1 px-2">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }else if(props.viewType === "profile"){
                return (
                    //Controls for song output when user views his profile account
                    <div className="d-flex flex-column align-items-center justify-content-evenly tunes-by-user" key={song._id}>                     
                        <p onClick={()=>songPageHandler(song._id)} className="tunes-byuser-songname">{cleanedName}</p>                  
                        <div className="d-flex flex-row align-items-start">                        
                            <button onClick={()=>songPageHandler(song._id)} className="btn btn-outline-link mr-5 d-flex  p-0">
                                <i class="far fa-3x fa-play-circle"></i>
                            </button>
                            <div className="d-flex flex-row align-items-center justify-content-end ml-3 ">
                                <p className="profile-song-comments">{comments} Comments</p>
                            </div >
                            <div className="d-flex flex-row align-items-center justify-content-end ml-3">
                                <p className="profile-song-like">{likes} Likes</p>
                            </div>
                            {viewTunes ? <button onClick={()=>deleteSongStorageHandler(song._id, name)}className="btn btn-outline-danger btn-sm py-1 px-2 ml-4"><i class="fas fa-2x fa-trash-alt"></i></button> : null}
                        </div>
                    </div>
                )  
            }
        })
    }
    let viewPhotos =<div className="d-flex flex-row justify-content-around"><img src={defaultPhoto}  width="100px"/>The user did not upload photos</div>;

    if(props.userAccount.images){
        viewPhotos = props.userAccount.images.map(img=> {
            let width = getRandomSize(200, 400);
            let height =  getRandomSize(200, 400);
            return(
                <div key={img._id}>
                    {viewPhoto ? <button onClick={()=> deleteImageStorageHandler(img._id,img.name)} className="btn btn-danger px-2 py-1"><i class="far fa-trash-alt"></i></button> : null}
                    <img src={img.downloadURL} width={width} height={height} />
                </div>
            )
        })
    }
      return(
        <div className="row" id="music-display-view">
            <div className="col-12  d-flex flex-row justify-content-between manager-profile-controls">
                {props.viewType === 'profile' ? <button onClick={()=>setViewTunes(!viewTunes)} className="btn btn-link-warning">Manage Music</button> : null}
                
                {props.viewType === 'profile' ? <button onClick={()=> setViewPhoto(!viewPhoto)} className="btn btn-link-warning" >Manage Images</button>: null}

            </div>
           
            <div className="col-md-7 d-flex flex-column align-items-center">
            <img src={sound} />
                <div className="d-flex flex-row justify-content-start align-items-start mb-4 ">
                  <h1>Music by <span className="tunes-by-namedisplay">{props.userAccount.artist_nickname}</span></h1>
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