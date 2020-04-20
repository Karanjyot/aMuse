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
        setAuthUser(res.data.account);
        }).catch(err=> {console.log(err)});
    }, [])

    return(
        <div className=" audioPage">
            <Header />
            
            <MusicPlayer account={account} artist={author} song={song} />
            <div className="container-fluid comment-section">
                <h3><span># </span>Comments</h3>
                <div className="row">
                    <div className="col-12">
                        <CommentInput curUser={authUser}/>
                    </div>
                    <div className="col-12 users-comments-display">
                        <Comment />
                        <Comment />
                        <Comment />
                    </div>
                </div>
            </div>      
        </div>
    )
}

export default AudioPlayer;