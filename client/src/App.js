
import React from "react";
// browser router looks at current url and changes components visible. Route sets up rules.
import { BrowserRouter, Route,} from "react-router-dom";

import Landing from "./components/Landing/Landing"
import Signup from "./components/Signup/Signup"
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"



const App = () =>{



        return (
            <div className="container">
                <BrowserRouter >
                        <Route exact path = "/" component = {Landing} />
                        <Route path = "/signup" component = {Signup} />
                        <Route path = "/login" component = {Login} />
                        <Route path ="/home" component ={Home} />  
                </BrowserRouter>
            </div>
        ) 
};

export default App;


