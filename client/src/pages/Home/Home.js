import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./home.css";
import Header from "../../components/Header/Header";
import axios from "axios";
import Carousel from "../../components/Carousel/Carousel";
import MusicDisplay from "../../components/MusicDisplay/MusicDisplay";
import TrendingArtists from "../../components/TrendingArtists/TrendingArtists";

const Home = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentUser, setCurrentUser]= useState({});
  let history = useHistory();
  useEffect(()=> {
    axios('api/accounts/find')
      .then(res=> {
        setAccounts(res.data.accounts);
        setCurrentUser(res.data.currentUser);
        console.log(res);
        console.log(res.data.accounts,res.data.currentUser);
      }).catch(err=> console.log(err));
  },[]);

  const viewArtistHadler = (accId)=> {
    history.push(`/view-account/${accId}`);
  }

  return (
    <div id="homepage">
      <Header />
      <div className="container">
        <Carousel />
        <MusicDisplay />
        <TrendingArtists view={viewArtistHadler} currentUser={currentUser} accounts={accounts} />
      </div>
    </div>
  );
};

export default Home;
