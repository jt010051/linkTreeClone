import React from 'react'
import axios from '../api/axios.js'
import useAuth from './useAuth'
import { refreshContext } from '../Context'
import { useContext } from 'react'
 const useRefreshToken = () => {
    const {setAuth} =useAuth();
const reftoken = localStorage.getItem("refToken");
const refresh =async ()=>{
    const res = await axios.get('/api/auth/token/refresh',
    {
      headers: {
      'Authorization':'Bearer '+reftoken,
      'Content-Type':'application/json'
      },
                withCredentials: true

    })

    setAuth(prev=>{
        console.log(JSON.stringify(prev));
        console.log(res.data.access_token);
        return{...prev, access_token: res.data.access_token}
    })
    return res.data.access_token
}


  return refresh
}
export default useRefreshToken;  