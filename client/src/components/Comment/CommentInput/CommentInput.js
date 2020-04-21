import React, {useState} from 'react';
import '../comment.css';
import axios from "axios";
import profile from "../../../images/profile.jpg"
/**
* @author
* @function 
**/

const  CommentInput= (props) => {
  const [comment, setComment] = useState("");

  const uploadCommentHandler = (e)=>{
    e.preventDefault();
    const com = {
        text: comment,
        authorID: props.curUser._id,
        authorName: props.curUser.artist_nickname,
        authorImage: props.curUser.profilePicture
    }
    axios.post(`/api/comment/${props.song._id}`, com)
        .then(res=> {
          setComment("");
          console.log(res)})
        .catch(err=> console.log(err));
}

  let profilePic = !props.curUser.profilePicture?profile: props.curUser.profilePicture;
  return(
    <div className="comment-form">
      <img src={profilePic} alt="users profile image shown for comments"  width="6%"/>
        <form onSubmit={uploadCommentHandler} className="d-flex flex-row justify-content-between ">
            <input  onChange={(e)=> setComment(e.target.value)}
             placeholder="Add a public comment..."/>
            <button className="btn btn-dark" type="submit">Comment</button>
        </form>
    </div>
  
   )

 }

export default CommentInput;