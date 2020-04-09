import React from 'react'
import './backdrop.css'
/**
* @author
* @function Backdrop
**/

const Backdrop = (props) => {
  return(
    <div onClick={props.clicked}  
         className="backdrop"></div>
   )

 }

export default Backdrop