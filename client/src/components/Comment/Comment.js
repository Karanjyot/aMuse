import React from 'react'
import "./comment.css"
import profile from "../../images/profile.jpg"
/**
* @author
* @function Comment
**/

const Comment = (props) => {
  return(
        <div className="each-comment">
            <div className="d-inline">
                <p>{props.value.authorName}</p>
                <p>{props.value.datePosted}</p>
            </div>  
            <h6>{props.value.text}</h6>
            <img src={props.value.authorImage} width="5%" height="50%"/>
        </div> 
   )

 }

export default Comment