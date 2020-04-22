import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./library.css";
import Header from "../../components/Header/Header";
import LibraryDisplay from "../../components/LibraryDisplay/LibraryDisplay"
import axios from "axios";


const Library = () => {

  
  return (
  
    <div id="homepage">
      <Header />
      <div className="container">
     
        <LibraryDisplay />

      </div>
    </div>
  );
};

export default Library;
