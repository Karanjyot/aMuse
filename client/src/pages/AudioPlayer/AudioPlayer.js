import React, {useState, useEffect} from "react";
import "./audioplayer.css";
import axios from "axios";
import {useParams} from 'react-router-dom'
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer"
import Header from "../../components/Header/Header"
import Comment from "../../components/Comment/Comment";
import CommentInput from "../../components/Comment/CommentInput/CommentInput";
import Footer from '../../components/UI/Footer/Footer';

const AudioPlayer = ()=>{
    const [song, setSong] =useState({});
    const [account, setAccount] = useState({})
    const [author, setAuthor] =useState("")
    const [authUser, setAuthUser] = useState({});
    const [loggedIn, setLoggedIn] = useState("")
    //
    const [likeAgain, setLikeAgain] = useState(null);
    const [fresh, setFresh] = useState(false);
    let {id} = useParams();

    useEffect(()=> {
        axios(`/api/song/${id}`)
        .then(res=> {
            setSong(res.data.song)
            setAuthor(res.data.account[0].artist_nickname)
            setAccount(res.data.account[0]);
            setLoggedIn(res.data.currentUser._id);
            console.log(res.data)
        }).catch(err=> {console.log(err)});
    }, [fresh])

    useEffect(()=> {
        axios(`/api/current_user/data`)
        .then(res=> {
            console.log(res);
        setAuthUser(res.data.account);
        }).catch(err=> {console.log(err)});
    }, [])
    const refreshPage = ()=> {
        setFresh(!fresh);
    }
    const likeSongHandler = ()=> {
        let contToAPI = true;
        song.likes.forEach(user=> {
            if(loggedIn === user._id){
                contToAPI = false;
                return;
            }
        });
        if(contToAPI){
            axios.post(`/api/likesong/${id}`)
            .then(res =>{
                console.log(res);
                setLikeAgain("Liked !");
                setFresh(!fresh);
            })
            .catch(err=> {
                console.log(err);
            });
        }else {
            setLikeAgain("Already liked this !");
        }
    }

    //Controlling the total number of comments and likes as well as for duplicates when an item is liked
    const commmentsNum = song.comments ? song.comments.length : 0;
    const likeNum = song.likes ? song.likes.length : 0;
    const likeDuplicate = likeAgain;
    //Setting up the comments display
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
                <h5 >{likeNum}<i onClick={likeSongHandler} className="fas fa-1x fa-heart song-page-like"> </i>{likeDuplicate}
                    <span className="ml-5">{commmentsNum} </span>Comments
                </h5>
                <div className="row">
                    <div className="col-12">
                        <CommentInput fresh={refreshPage} song={song} account={account}  curUser={authUser}/>
                    </div>
                    <div className="col-12 users-comments-display">
                        {/* <Comment />
                        <Comment />
                        <Comment /> */}
                        {comments}
                    </div>
                </div>
            </div>
            <Footer />      
        </div>
    )
}

export default AudioPlayer;