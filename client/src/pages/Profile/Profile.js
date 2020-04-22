import React, {useState, useEffect} from "react"
import "./profile.css"
import axios from 'axios'
import ProfileDisplay from "../../components/ProfileDisplay/ProfileDisplay"
import Header from "../../components/Header/Header"
import UploadMenu from '../../components/SlideMenu/SlideMenu'
import Backdrop from '../../components/Backdrop/Backdrop'
import Footer from '../../components/UI/Footer/Footer'
import MusicDisplayView from '../../components/MusicDisplay/MusicDisplayView/MusicDisplayView'


const Profile = () =>{
    const [showMenu, setShowMenu] = useState(false);//controls the side menu
    const [isUpdating, setIsUpdating] = useState(false);//boolean to control update of general info
    const [account, setAccount] = useState({});//the account object in its entirety
    const [id, setID] = useState(""); //this is the account id(primary key for 'Account' model)
    const [imgs, setImgs] = useState([]);//account image array
    const [updateProfile, setUpdateProfile] = useState(false);
    const [avatar, setAvatar] = useState("");
    //user info
    const [userEmail, setUserEmail] = useState("");
    //form states for when we update the general info
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [desc, setDesc] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
 
    const [updateControl, setUpdateControl] = useState(false);
    //finding the account of the active user
    useEffect(()=> {
      axios.get(`/api/current_user/data`)
        .then(res=> {
          console.log(res.data);
          setUserEmail(res.data.user.email);
          setAccount(res.data.account)
          setID(res.data.account._id);
          setName(res.data.account.artist_nickname);
          setGenre(res.data.account.genre);
          setDesc(res.data.account.description);
          setCountry(res.data.account.country);
          setCity(res.data.account.city);
          setImgs([...res.data.account.images])
          setAvatar(res.data.account.profilePicture);
        }).catch(err=> console.log(err));
    }, [showMenu,updateControl]);

    //Controlling the opening and closing of the sideDrawer Menu
    const updateControlHandler = ()=>{
      setUpdateControl(!updateControl);
    }
    const toggleMenuHandler = () => {
      setShowMenu(!showMenu);
    };
    const closeMenuHandler = () => {
      setShowMenu(false);
    };
    const formUpdateToggle = ()=> {
      setIsUpdating(!isUpdating);
    }
    //Submiting updated values for the general info form
    const submitUpdateHandler = (e)=> {
      e.preventDefault();
      const obj = {
        name,
        genre, 
        desc,
        country, 
        city,
        profilePicture: avatar
      
      }
      axios.post('/api/current_user/update/'+id, obj)
      .then(res => {
        console.log(res);
        setIsUpdating(false);
        updateControlHandler();
      }).catch(err=> {
        console.log(err);
      })
    }
    const submitAvatarChange = (picture)=> {
     const updateObj = {
      name,
      genre, 
      desc,
      country, 
      city,
      profilePicture: picture
     }
     axios.post('/api/current_user/update/'+id, updateObj)
     .then(res => {
       console.log(res);
       setIsUpdating(false);
       setUpdateProfile(false);
       updateControlHandler();
     }).catch(err=> {
       console.log(err);
     })
    }
    let selectProfile = null;
    let selectProfileSectionStyle= "";
    if(updateProfile){
      selectProfileSectionStyle = "image-box";
      if(imgs.length === 0){
        selectProfile = <p>No photos to select from. Upload photo first</p>
      }else{
        selectProfile = imgs.map(img=> {
          return (
            <div className="each-profile-select" key={img._id}>
              <img className="border" src={img.downloadURL}  width="100%"/>
              <button onClick={()=> submitAvatarChange(img.downloadURL)}
               className="btn btn-link-secondary p-0 m-0">
                
                <i className="fas fa-2x fa-user-check"/>
              </button>
            </div>
          )
        });
      }

    }
   
    let backdrop;
    if (showMenu) {
      backdrop = <Backdrop clicked={closeMenuHandler} />;
    }
    let updateInfoStyle = isUpdating ? 'general-info-active': 'general-info';
return (
    <div id="profilePage">
    <div className="container" >
        <Header />
        <ProfileDisplay userEmail={userEmail} userAccount= {account} showForm={formUpdateToggle} uploadMenu = {toggleMenuHandler} update={updateControlHandler}/>
        {/* THE DIV BELOW REQUIRES CONDITIONAL RENDERING */}
        <div className={updateInfoStyle}>
          <button onClick={formUpdateToggle} id="btnClose" className="btn btn-link"><i class="fas fa-times"></i></button>
          <span>
            <h2>General Info</h2>
          </span>
          <div className="row profile-forms-row">
            <div className="col-md-6  d-flex flex-column justify-content-start align-items-center">
              <button onClick={()=> setUpdateProfile(!updateProfile)} className="btn btn-secondary">Select Profile Picture</button>
              <div className={selectProfileSectionStyle}>
                {selectProfile}
                
              </div>
            </div >
            <div className="col-md-6 d-flex flex-column align-items-center justify-content-between">
              <form onSubmit={submitUpdateHandler} className="general-form">
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text"  placeholder="Artistic name"/>
                <input value={genre} onChange={(e)=>setGenre(e.target.value)} type="text"  placeholder="Your genre(s)"/>
                <input value={desc} onChange={(e)=>setDesc(e.target.value)} type="text"  placeholder="Describe yourself" />
                <input value={country} onChange={(e)=>setCountry(e.target.value)} type="text"  placeholder="Your country"/>
                <input value={city} onChange={(e)=>setCity(e.target.value)} type="text"  placeholder="Your city"/>
                <button className="btn btn-primary btn-sm">Update Info</button>
              </form>
            </div>
          </div>
        </div>
        <MusicDisplayView userAccount={account} viewType="profile"/>
        {backdrop}
        <UploadMenu displayForm={isUpdating} acc={account} show={showMenu} accId={id} accountImages = {imgs} update={updateControlHandler} closeMenu={closeMenuHandler}/>     
     
    </div>
    <Footer />
    </div>
)

}

export default Profile