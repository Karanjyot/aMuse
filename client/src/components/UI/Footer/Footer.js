import React from 'react'
import './footer.css'
import logo from '../../../images/logo.png';
/**
* @author
* @function 
**/

const Footer = (props) => {
  return(
    <div>
    <div className="d-flex flex-row justify-content-center align-items-center" id="page-footer">
        <img src={logo} height="80%" />
    </div>
    </div>
   )

 }

export default Footer;