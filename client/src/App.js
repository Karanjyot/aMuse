
import React from "react";
// browser router looks at current url and changes components visible. Route sets up rules.
import { BrowserRouter, Route,Switch} from "react-router-dom";
import './App.css';

import Signup from "./pages/Signup/Signup"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile"
import AudioPlayer from "./pages/AudioPlayer/AudioPlayer"
import NoMatch from "./pages/NoMatch/NoMatch"
import AccountView from "./pages/AccountView/AccountView"

const App = () =>{
        return (
            <div>
                <BrowserRouter >
                    <Switch>
                        <Route exact path = "/" component = {Signup} />
                        <Route path = "/login" component = {Login} />
                        <Route path ="/home" component ={Home} />  
                        <Route path ="/profile" component ={Profile} />  
                        <Route path ="/audioplayer" component ={AudioPlayer} /> 
                        <Route exact path ="/view-account/:id" component ={AccountView} /> 
                        <Route path ="/view-song/:id" component ={AudioPlayer} />
                        <Route path="*" component={NoMatch} />
                    </Switch>
                </BrowserRouter>
            </div   >
        ) 
};

export default App;


