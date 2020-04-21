import React, {useState, useEffect} from "react";
import "./audioplayer.css";
import axios from "axios";
import {useParams} from 'react-router-dom'
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer"
import Header from "../../components/Header/Header"
import Comment from "../../components/Comment/Comment";
import CommentInput from "../../components/Comment/CommentInput/CommentInput";


const AudioPlayer = ()=>{
    const [song, setSong] =useState({});
    const [account, setAccount] = useState({})
    const [author, setAuthor] =useState("")
    const [authUser, setAuthUser] = useState({});

    let {id} = useParams();

    useEffect(()=> {
        axios(`/api/song/${id}`)
        .then(res=> {
            setSong(res.data.song)
            setAuthor(res.data.account[0].artist_nickname)
            setAccount(res.data.account[0]);
            console.log(res.data)
        }).catch(err=> {console.log(err)});
    }, [])

    useEffect(()=> {
        axios(`/api/current_user/data`)
        .then(res=> {
            console.log(res);
        setAuthUser(res.data.account);
        }).catch(err=> {console.log(err)});
    }, [])

    const likeSongHandler = ()=> {
        axios.post(`/api/likesong/${id}`)
        .then(res => console.log(res.data))
        .catch(err=> console.log(err));
    }

    const commmentsNum = song.comments ? song.comments.length : 0;
    const likeNum = song.likes ? song.likes.length : 0;
    let comments = <h2>No added comments</h2>
    if(song.comments && song.comments.length > 0){
        comments = song.comments.map(com=> {
           return <Comment key={com._id} value={com} curUser={authUser}/>
        })
    }
    return(
        <div className=" audioPage">
            <Header />
            
            <MusicPlayer account={account} artist={author} song={song} />
            <div className="container-fluid comment-section">
                <h4 >{likeNum}<i onClick={likeSongHandler} className="fas fa-1x fa-heart song-page-like"> </i>
                    <span className="ml-5">{commmentsNum} </span>Comments
                </h4>
                <div className="row">
                    <div className="col-12">
                        <CommentInput  song={song} account={account}  curUser={authUser}/>
                    </div>
                    <div className="col-12 users-comments-display">
                        {/* <Comment />
                        <Comment />
                        <Comment /> */}
                        {comments}
                    </div>
                </div>
            </div>      
        </div>
    )
}

export default AudioPlayer;