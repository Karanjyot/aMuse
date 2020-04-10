import React, { useState } from "react";
import "./home.css";
import Header from "../../components/Header/Header";
import Backdrop from "../../components/Backdrop/Backdrop";
import SlideMenu from "../../components/SlideMenu/SlideMenu";
import Carousel from "../../components/Carousel/Carousel";
import MusicDisplay from "../../components/MusicDisplay/MusicDisplay";

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);

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
    <div id="homepage">
      <Header />
      <div className="container">
        <Carousel />
        <MusicDisplay />
        <h2>Dashboard</h2>
        <button
          onClick={toggleMenuHandler}
          className="btn #ff7043 deep-orange lighten-1"
        >
          View Account
        </button>
        {backdrop}
        <SlideMenu show={showMenu} />
      </div>
    </div>
  );
};

export default Home;
