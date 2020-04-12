import React, { useState, useEffect } from "react";
import "./home.css";
import Header from "../../components/Header/Header";
import axios from "axios";
import Carousel from "../../components/Carousel/Carousel";
import MusicDisplay from "../../components/MusicDisplay/MusicDisplay";

const Home = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentUser, setCurrentUser]= useState({});

  useEffect(()=> {
    axios('api/accounts/find')
      .then(res=> {
        setAccounts(res.data.accounts);
        setCurrentUser(res.data.currentUser);
        console.log(res);
        console.log(res.data.accounts,res.data.currentUser);
      }).catch(err=> console.log(err));
  },[])

  return (
    <div id="homepage">
      <Header />

      <div className="container">
        <Carousel />
        <MusicDisplay />
      </div>
    </div>
  );
};

export default Home;
