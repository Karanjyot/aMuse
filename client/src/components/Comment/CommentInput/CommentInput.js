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
          props.fresh();
        }).catch(err=> console.log(err));
}

  let profilePic = !props.curUser.profilePicture ? profile: props.curUser.profilePicture;
  return(
    <div className="row comment-form">
      <div className="col-md-2 p-0 m-0 d-flex align-items-start justify-content-center order-2 order-md-1">
      <img src={profilePic} alt="users profile image shown for comments"  width="60px" />
      </div>
      <div className="col-md-10 p-0 mb-3 mb-md-0 d-flex align-items-start justify-content-center order-1 order-md-2">
      <form onSubmit={uploadCommentHandler} className="d-flex flex-row justify-content-between ">
            <input value={comment} onChange={(e)=> setComment(e.target.value)}
             placeholder="Add a public comment..."/>
            <button className="btn btn-dark" type="submit">Comment</button>
        </form>
      </div>
    </div>
  
   )

 }

export default CommentInput;