import React, {useState, useEffect} from "react";
import "./profile.css"
import axios from 'axios';
import ProfileDisplay from "../../components/ProfileDisplay/ProfileDisplay"
import Header from "../../components/Header/Header"
import UserMusic from "../../components/UserMusic/UserMusic"
import UploadMenu from '../../components/SlideMenu/SlideMenu'
import Backdrop from '../../components/Backdrop/Backdrop';



const Profile = () =>{
    const [showMenu, setShowMenu] = useState(false);
    const [wantUpdate, setWantUpdate] = useState(false);
    const [account, setAccount] = useState({});
    const [id, setID] = useState("");

    //form states 
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [desc, setDesc] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    //finding the account of the active user
    useEffect(()=> {
      axios.get(`/api/current_user/data`)
        .then(res=> {
          console.log(res.data.account);
          setAccount(res.data.account)
          setID(res.data.account._id);
          setName(res.data.account.artist_nickname);
          setGenre(res.data.account.genre);
          setDesc(res.data.account.description);
          setCountry(res.data.account.country);
          setCity(res.data.account.city);
        }).catch(err=> console.log(err));
    }, []);

    const submitUpdateHandler = (e)=> {
      e.preventDefault();
      const obj = {
        name,
        genre, 
        desc,
        country, 
        city
      }
      axios.post('/api/current_user/update/'+id, obj)
      .then(res => {
        console.log(res);
      }).catch(err=> {
        console.log(err);
      })
    }
    const toggleMenuHandler = () => {
      setShowMenu(!showMenu);
    };
    const closeMenuHandler = () => {
      setShowMenu(false);
    };
    let backdrop;
    if (showMenu) {
      backdrop = <Backdrop clicked={closeMenuHandler} />;
    }
return (
    <div id="profilePage">
    <div className="container" >
        <Header />
        <ProfileDisplay uploadMenu = {toggleMenuHandler} />
        {/* THE DIV BELOW REQUIRES CONDITIONAL RENDERING */}
        <div className="general-info">
          <span>
            <h2>General Info</h2>
            <a onClick={()=>setWantUpdate(!wantUpdate)}
               className="float-right" href="">update</a>
          </span>
          
          <form onSubmit={submitUpdateHandler} className="general-form">
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text"  placeholder="Artistic name"/>
            <input value={genre} onChange={(e)=>setGenre(e.target.value)} type="text"  placeholder="Your genre(s)"/>
            <input value={desc} onChange={(e)=>setDesc(e.target.value)} type="text"  placeholder="Describe yourself" />
            <input value={country} onChange={(e)=>setCountry(e.target.value)} type="text"  placeholder="Your country"/>
            <input value={city} onChange={(e)=>setCity(e.target.value)} type="text"  placeholder="Your city"/>
            <button className="btn btn-primary btn-sm">Update Info</button>
          </form>
        </div>
        <UserMusic />
        {backdrop}
        <UploadMenu show={showMenu}/>     
    </div>
    </div>
)

}

export default Profile