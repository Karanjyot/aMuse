
import React from "react";
// browser router looks at current url and changes components visible. Route sets up rules.
import { BrowserRouter, Route,} from "react-router-dom";
import './App.css';

import Signup from "./pages/Signup/Signup"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile"



const App = () =>{
        return (
            <div>
                <BrowserRouter >
                        <Route exact path = "/" component = {Signup} />
                        <Route path = "/login" component = {Login} />
                        <Route path ="/home" component ={Home} />  
                        <Route path ="/profile" component ={Profile} />  

                </BrowserRouter>
            </div   >
        ) 
};

export default App;


