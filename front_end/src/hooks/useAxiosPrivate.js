// import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken"
import useAuth from "./useAuth";

import { axiosPrivate } from "../api/axios.js";
import React from 'react'

 const useAxiosPrivate = () => {

    const refresh = useRefreshToken();  
    const {auth} = useAuth();
    console.log(auth);

useEffect(()=>{

    const reqIntercept = axiosPrivate.interceptors.request.use(
config=>{
if(!config.headers["Authorization"]){
        console.log(auth.accessToken);

 config.headers["Authorization"]=`Bearer ${auth?.accessToken}`;



}
return config
}, (error)=>Promise.reject(error)

    )
const resIntercept=axiosPrivate.interceptors.response.use(

    res=>res,
    async(error)=>{
        const prev= error?.config;
        if(error?.response?.status===403 && !prev.sent){
prev.sent=true;
const newAccessToken = await refresh();
prev.header['Authorization'] = `Bearer ${newAccessToken}`;
return axiosPrivate(prev)

        }
        return Promise.reject(error)
    }
);
return () =>{
    axiosPrivate.interceptors.request.eject(reqIntercept)
        axiosPrivate.interceptors.response.eject(resIntercept)

}

},[auth, refresh])



    return axiosPrivate;
}
export default useAxiosPrivate