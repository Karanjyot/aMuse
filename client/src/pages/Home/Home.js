import React from "react";

import "./home.css";
import Header from "../../components/Header/Header";
import Carousel from "../../components/Carousel/Carousel";
import MusicDisplay from "../../components/MusicDisplay/MusicDisplay";
const Home = () => {
  return (
      
    <div id="homepage">
    <Header />
    <div className="container">
      <Carousel />
      <MusicDisplay />
      <MusicDisplay />
      <MusicDisplay />
      <MusicDisplay />
    </div>
    </div>
  );
};

export default Home;
