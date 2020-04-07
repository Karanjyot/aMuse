import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import "./signup.css"
import axios from 'axios';




const Signup = (props) =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  let history = useHistory();
  const submitFormHandler = (event)=> {
    event.preventDefault();
    const obj= {
      email,
      password
    }
    axios.post('/api/local/signin', obj)
      .then(res=> {
        console.log(res);
        history.push('/home');
      }).catch(err=> console.log(err))
  }

    return(
        <div id="login-box">
          <div className="left">
            <h1>Sign up</h1>
            <form onSubmit ={submitFormHandler}>
              <input onChange={(e)=>{setEmail(e.target.value)}} type="text" name="email" placeholder="E-mail" />
              <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" placeholder="Password" />
              <button type="submit">Sign-Up</button>
            </form>
            <div>
              <p>Already have an account?</p>
              <a href="/login"><button type="button" className="btn btn-dark">Login here</button></a> 
            </div>
            
          </div>

          <div id="right">
            <span className="loginwith"><br/><br/><br/><br/></span>

            <a href="/auth/google"><button className="social-signin google">Log in with Google+</button></a> 
          </div>
          <div className="or">OR</div>
        </div>

    )
}

export default Signup


