import React, {useState} from 'react'
import './slideMenu.css'
import logo from '../../images/logo.png'
import firebase from 'firebase'
import storage from '../../Firebase/index'
import axios from 'axios';
import plus from '../../images/plus.png'; //Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
import defaultAlbum from '../../images/music.png'; // Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
/**
* @author
* @function SlideMenu
**/

const SlideMenu = (props) => {
  //State pertaining to song upload
  const [src, setSrc] = useState(null);
  const [url, setURL] = useState("");
  const [progress, setProgress] = useState(0);
  
  //state pertaining to photo upload
  const [photoSrc, setPhotoSrc] = useState(null);
  const [imgURL, setImgURL] = useState("");
  const [theProgress, setTheProgress] =useState(0);
  //Account info

  //Dom control 

  
  //Manages Change of the input field in the form for MP3 files
  const handleChange = (e)=> {
    if(e.target.files[0]){
      const file = e.target.files[0];
      setSrc(file);
    }
  }
  //Manages Change of the input field of the form for Album cover
  const handleImgChange = (e)=>{
    if(e.target.files[0]){
      const file = e.target.files[0];
      setPhotoSrc(file);
    }
  }

  const saveImageDBHandler = (imgName, urlDownload)=>{
    const imgObject = {
      name: imgName, 
      downloadURL: urlDownload
    }
    axios.post(`/api/current_user/upload_img/${props.accId}`, imgObject)
      .then(res=> {
        console.log(res);
      }).catch(err=> console.log(err));
  }
  const uploadFileHandler = (e) => {
    e.preventDefault();
    const photo = photoSrc;
    const photoName = photo.name.toString();
    const photoMeta = photo.type.toString();
  
    const metadata = {
      contentType: photoMeta
    }
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child("photos/"+photo.name).put(photo, metadata);
    uploadTask.on(
      'state_changed',
      snapshot=> {
        //progress of upload
        const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        setTheProgress(progress);
      },
      error => console.log(error),
      ()=> {
        uploadTask.snapshot.ref.getDownloadURL().then(url=> {
          const linkURL = url.toString();
          console.log('File can be retrieved at the following URL =>', url);//**REMOVE
          setImgURL(linkURL);
          setTheProgress(0);
          saveImageDBHandler(photoName, linkURL);
        });
      }
    )   
    console.log(photoSrc);
  }


  const saveSongDBHandler = (songName, urlDownload)=> {
    const songObject = {
      name: songName, 
      downloadURL: urlDownload,
      albumPhoto: imgURL
    }
    axios.post(`/api/current_user/upload_song/${props.accId}`, songObject)
      .then(res=> console.log(res))
      .catch(err=> console.log(err));
  }
  const uploadMP3Handler = (e)=> {
    e.preventDefault();
    const song = src;
    const nameofSong = song.name.toString();
    const metadata = {
      contentType: 'audio/mp3'
    }
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child("music/"+song.name).put(song, metadata);
    uploadTask.on(
      'state_changed',
      snapshot=> {
        //progress of upload
        const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        setProgress(progress);
      },
      error => console.log(error),
      ()=> {
        uploadTask.snapshot.ref.getDownloadURL().then(url=> {
          const linkURL = url.toString();
          console.log('File can be retrieved at the following URL =>', url);//**REMOVE
          console.log('Song uploaded is called', nameofSong)//**REMOVE
          setURL(linkURL);
          setProgress(0);
          saveSongDBHandler(nameofSong,linkURL)
          
          //Now here we are going to call the function that will store the song for us
        });
      }
    )
  }

  let userPhotos = <div>
                      <img src={defaultAlbum} height="80px"/>
                      <p>You have not uploaded any photos.</p>
                      <p>A default image above will be used for your album cover <span >or upload an album cover below</span></p>
                  </div>
    if(props.accountImages.length > 0){
 
      userPhotos = props.accountImages.map(img=> {
        return <div className="each-photo" key={img._id}>
                  <div>
                    <img className="mb-2" src={img.downloadURL} width="95%" height="auto" />
                    <a><img onClick={()=> setImgURL(img.downloadURL)} className="add-image-btn" src={plus}/></a>
                  </div>
              </div>
      });
    }
  let drawerClasses = 'side-drawer'
    if(props.show) {
       drawerClasses = 'side-drawer open'
    }
  return(
    <div className = {drawerClasses}>
      <div className="uploader-title-main">
        <img src={logo} height="100%"/> Account Uploads
      </div>
      <div className="select-album-cover">
        <div className="select-album-title">
          Select Album Cover
        </div>
        <div className="images-to-select">
          {userPhotos}
        </div> 
      </div>
      <div className="song-upload">
       <div className="song-upload-title">
          Album Uploads
       </div>
       <div className="upload-song-form">
          <form onSubmit={uploadFileHandler}>  
            <div className="form-group">
              <label>Upload New Album Cover</label>
              <input onChange={handleImgChange} type="file" className="form-control-file" />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Upload</button>
          </form>
        <p>{theProgress}</p>
       </div>
       <div className="upload-song-form">
          
          <form onSubmit={uploadMP3Handler}>  
            <div className="form-group">
              <label>Upload New Song</label>
              <input onChange={handleChange} type="file" className="form-control-file" />
            </div>
            <button type="submit" className="btn btn-danger btn-sm">Upload</button>
          </form>
          <p>{progress}</p>
       </div>
      </div>
      
    </div>
   )

 }

export default SlideMenu