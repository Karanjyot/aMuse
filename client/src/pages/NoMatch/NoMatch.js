import React from 'react'
import './noMatch.css'
import logo from '../../images/logo.png'
/**
* @author
* @function NoMatch
**/

const NoMatch = (props) => {
  return(
    <div className="nomatch-parent">
        <div className="nomatch-header">
            <img src={logo} height="90%" />
        </div>
        <div className  ="jumbotron">
            <p>404 - Page Not Found</p>
            <i class="far fa-5x fa-sad-cry "></i>
        </div>
    </div>
   )

 }

export default NoMatch