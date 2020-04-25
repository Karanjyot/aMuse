import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./library.css";
import Header from "../../components/Header/Header";
import LibraryDisplay from "../../components/LibraryDisplay/LibraryDisplay"
import Footer from '../../components/UI/Footer/Footer';
import axios from "axios";


const Library = () => {

  
  return (
  
    <div id="librarypage">
      <Header />
      <div className="container">
     
        <LibraryDisplay />
    
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Library;
