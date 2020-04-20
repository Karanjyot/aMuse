import React from 'react';
import '../comment.css';
import profile from "../../../images/profile.jpg"
/**
* @author
* @function 
**/

const  CommentInput= (props) => {

  let profilePic = !props.curUser.profilePicture?profile: props.curUser.profilePicture;
  return(
    <div className="comment-form">
      <img src={profilePic} alt="users profile image shown for comments"  width="6%"/>
        <form className="d-flex flex-row justify-content-between ">
            <input placeholder="Add a public comment..."/>
            <button className="btn btn-dark" type="submit">Comment</button>
        </form>
    </div>
  
   )

 }

export default CommentInput;