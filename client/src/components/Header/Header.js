import React, { useState, useEffect  } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./header.css"

const Header = (props) => {


    const [user, setUser] = useState([]);


    const fetchResource = async () =>{
        const response = await axios.get("/api/current_user")
 
             console.log(response.data)
             // this.setstate({ user: response.data})

             setUser(response.data)
 
 
      }
    useEffect(() =>{
        fetchResource()
    }, [])

   const renderContent = () => {
        if(user){
            return <li><a href="/api/logout">Logout</a></li>
        }else{
           return <li><a href="/auth/google">Login With Google</a></li>
        }
    }
    
        console.log(user)
        return(
            <div>
            <nav>
                <div className="nav-wrapper">
                    <Link to={user ? "/home"  : "/"}>
                        aMuse
                    </Link>
                    <ul className="right">
                        <li>
                            {renderContent()}
                        </li>
                    </ul>



                </div>
            </nav>
            </div>
        );
    

   
};

export default Header;