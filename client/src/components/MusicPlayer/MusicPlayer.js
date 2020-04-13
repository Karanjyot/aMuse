import React, {useState, useEffect, useRef}from 'react'
import "./musicplayer.css"

/**
* @author
* @function MusicPlayer
**/


const MusicPlayer = (props) => {
  const player = useRef();
  const [currentSong, setcurrentSong]= useState(null);
  const [isPlaying, setisPlaying]= useState(false);
  const play = ()=>{
    if(isPlaying===false){
      player.current.play()
      setisPlaying(true)
    }else{
      player.current.pause();
      setisPlaying(false)
    }
   
   
    
  }

  const stop = () =>{
    player.current.pause();
  }

  const renderPlay = () =>{
    if(isPlaying=== true){
      return (
        <button className="audioBut"onClick={play}><i className="fa fa-pause" /></button>
      )
    }else{
      return (
      <button className="audioBut"onClick={play}><i className="fa fa-play" /></button>
      )
    }
  }
  useEffect(()=> {
    

    console.log(player.current.duration)
  
  },[])
  
  
  return(
    <div>
    <div>
      <audio ref={player} preload="auto" controls>
        <source src={require("./Recording.m4a")} type ="audio/mpeg"></source>
        </audio>
         

    </div>
  <div className="glow container">
    <div className="text-container">
      <span className="text">{currentSong}</span>
      <br />
      <span className="text">Coding and Stuff</span>
      <br />
      <div className="playback_controls">
        <button className="audioBut"onClick="skip('back')"><i className="fa fa-fast-backward" /></button>
       {renderPlay()}
        <button className="audioBut"onClick={stop}><i className="fa fa-stop" /></button>
        <button className="audioBut"onClick="skip('fwd')"><i className="fa fa-fast-forward" /></button>
      </div>
      <br />
      <div id="seekbar">
        <input type="range" oninput="f" id="seek" defaultValue={0}/>
      </div>
      <br />
      <div className="volume_controls">
        <button className="audioBut" id="mute" onClick="mute()"><i className="fa fa-volume-up" /></button>
        <input type="range" id="volume" oninput="setVolume(this.value)" min={0} max={1} step="0.01" defaultValue={1} />
      </div>
    </div>
  </div>
</div>

   )

 } 

//  <button onclick={ref("player").play()}>Play</button>
//  <button onclick={"document.getElementById('player').pause()"}>Pause</button>
//  <button onclick="document.getElementById('player').muted=!document.getElementById('player').muted">Mute/ Unmute</button>

export default MusicPlayer