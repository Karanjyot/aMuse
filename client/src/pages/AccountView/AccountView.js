import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import './accountView.css'
import Header from '../../components/Header/Header'
import ProfileViewDisplay from '../../components/ProfileDisplay/ProfileViewDisplay/ProfileViewDisplay'
/**
* @author
* @function AccountView
**/

const AccountView = (props) => {
    const[selectedAccount, setSelectedAccount] = useState({});

    let {id} = useParams();
    useEffect(()=> {
        axios.get(`/api/findUser/${id}`)
            .then(res=> {
                console.log(res.data.accountInfo);
                setSelectedAccount(res.data.accountInfo);
            }).catch(err=> console.log(err))
    }, [])
  return(
    <div id="account-view">
        <Header />
        <div className="container">
            <ProfileViewDisplay userAccount = {selectedAccount} />
        </div>

        

    </div>
   )

 }

export default AccountView