import React, {useState} from 'react'
import './slideMenu.css'
import logo from '../../images/logo.png'
import firebase from 'firebase'
import storage from '../../Firebase/index'
/**
* @author
* @function SlideMenu
**/

const SlideMenu = (props) => {
  //State pertaining to song upload
  const [src, setSrc] = useState(null);
  const [url, setURL] = useState("");
  const [progress, setProgress] = useState(0);
  const [accountId, setAccountId] = useState("");
  //state pertaining to photo upload
  const [photoSrc, setPhotoSrc] = useState(null);
  const [imgURL, setImgURL] = useState("");
  const [theProgress, setTheProgress] =useState(0);

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
          console.log('File can be retrieved at the following URL =>', url);
          setImgURL(linkURL);
        });
      }
    )   
    console.log(photoSrc);
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
          console.log('File can be retrieved at the following URL =>', url);
          console.log('Song uploaded is called', nameofSong)
          setURL(linkURL);
          setProgress(0);
          
          //Now here we are going to call the function that will store the song for us
        });
      }
    )
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
        Select Album Cover
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