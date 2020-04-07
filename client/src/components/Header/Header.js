import React, { useState, useEffect  } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./header.css"

const Header = (props) => {

        return(
            <nav className="#006064 cyan darken-4">
                <div className="nav-wrapper">
                <a href="#" class="brand-logo">aMuse</a>
                   <ul className="right">
                       <li><a href="/api/logout">Logout</a></li>
                   </ul>
                </div>
            </nav>
          
        );
   
};

export default Header;