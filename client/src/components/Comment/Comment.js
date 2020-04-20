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
                <p>Username</p>
                <p>Date: Nov 01, 2019</p>
            </div>  
            <h6>umour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</h6>
            <img src={profile} width="5%" height="50%"/>
        </div> 
   )

 }

export default Comment