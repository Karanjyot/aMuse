import React, {useState} from 'react'
import './slideMenu.css'
import logo from '../../images/logo.png'
import firebase from 'firebase'
import storage from '../../Firebase/index'
import Loader from '../../components/UI/LoaderCirc/LoaderCirc'
import axios from 'axios';
import note from '../../images/note.png';// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
import photo from '../../images/photo.png';// Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSongUploading, setIsSongUploading] = useState(false);
  
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
        setIsLoading(false);
      }).catch(err=> {
        console.log(err);
        setIsLoading(false);
      });
  }
  const uploadFileHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      .then(res=> {
        setIsSongUploading(false);
      })
      .catch(err=>{
        setIsSongUploading(false);
      });
  }
  const uploadMP3Handler = (e)=> {
    e.preventDefault();
    setIsSongUploading(true)
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
  //The photograph display for song uploads
  let userPhotos = <div className="usrPhoto">
                      <img src={defaultAlbum} height="80px"/>
                      <p>You have not uploaded any photos.</p>
                      <p>A default image will be used for your album cover <span >or upload an album cover below</span></p>
                  </div>
    if(props.accountImages.length > 0 && imgURL === ""){
 
      userPhotos = props.accountImages.map(img=> {
        return <div className="each-photo" key={img._id}>
                  <div>
                    <img className="mb-2" src={img.downloadURL} width="100%" height="auto" />
                    <a><img onClick={()=> setImgURL(img.downloadURL)} className="add-image-btn" src={plus}/></a>
                  </div>
              </div>
      });
    }else if(imgURL !== ""){
      userPhotos = <div className="usrPhoto">
                      <h5>Use this as an album cover for a song upload?</h5>
                      <img className="song-cover-img" src={imgURL} height="100px" width="auto" />

                      <p><a className="btn btn-danger btn-sm"
                            onClick={()=> {setImgURL(""); 
                                           props.update()}}>Change Image
                        </a>
                        or upload a new image below
                      </p>
                   </div>
    }
  //Loader that controls the upload of images
    let loader;
    if(isLoading){
      loader = <div>
                <p>{theProgress}%</p>
                <Loader />
               </div>
    }else {
      loader = null;
    }
  //Loader that controls the uploads of songs
  let mp3Loader;
  if(isSongUploading){
   mp3Loader = <div>
                 <p>{progress}%</p>
                 <Loader />
               </div>
  }else{
    mp3Loader = null;
  }
  //class that support the opening and closing of the menu
  let drawerClasses = 'side-drawer'
    if(props.show) {
       drawerClasses = 'side-drawer open'
    }

  return(
    <div className = {drawerClasses}>
      <div className="uploader-title-main">
        <span>aMuse<img src={logo} height="50"/></span>Account Uploads
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
          <img className="mt-4"  src={photo} width="auto" height="50" />
          <form onSubmit={uploadFileHandler}>  
            <div className="form-group">
              <label>Upload New Album Cover</label>
              <input onChange={handleImgChange} type="file" className="form-control-file" />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Upload</button>
          </form>         
            {loader} 
       </div>
       <div className="upload-song-form">
          <img  className="mt-4" src={note} height="50" width="auto" />
          <form onSubmit={uploadMP3Handler}>  
            <div className="form-group">
              <label>Upload New Song</label>
              <input onChange={handleChange} type="file" className="form-control-file" />
            </div>
            <button type="submit" className="btn btn-info btn-sm">Upload</button>
          </form>
          {mp3Loader}
       </div>
      </div>
      
    </div>
   )

 }

export default SlideMenu