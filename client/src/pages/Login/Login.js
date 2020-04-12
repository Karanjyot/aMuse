import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import "./login.css"
import axios from 'axios';


const Login = () =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const onLoginHandler = (e)=> {
    e.preventDefault();
    const obj= {
      email,
      password
    }
    axios.post('/api/local/login', obj)
      .then(res=> {
        history.push('/home');
      }).catch(err=> console.log(err))
  }
    return(
        <div id="login-box">
          <div className="left">
            <h1>Login</h1>
            <form onSubmit={onLoginHandler}>
              <input onChange={(e)=>{setEmail(e.target.value)}} type="text" name="email" placeholder="E-mail" />
              <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" placeholder="Password" />
              <button class="btn waves-effect waves-light" type="submit" name="action">Login
                <i class="material-icons right">send</i>
              </button>
            </form>
            <div className="auth-type">
              <blockquote>
                <p>Dont have an account ?</p>
              </blockquote>
              
              <a href="/"><button type="button" className="btn #ff7043 deep-orange lighten-1 btn-small">Signup Here</button></a>
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

export default Login