import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Header from '../../components/Header/Header'
import ProfileDisplay from '../../components/ProfileDisplay/ProfileDisplay'
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
    <div>
        <Header />
        <ProfileDisplay userAccount = {selectedAccount} />

    </div>
   )

 }

export default AccountView