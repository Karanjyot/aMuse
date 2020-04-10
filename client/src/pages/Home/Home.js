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
      <button
          onClick={toggleMenuHandler}
          className="btn #ff7043 deep-orange lighten-1 menu-for-tablet"
        >
          View Account
      </button>
      <div className="container">
        <Carousel />
        <MusicDisplay />
        {backdrop}
        <SlideMenu show={showMenu} />
      </div>
    </div>
  );
};

export default Home;
