import React, { useEffect } from 'react'
import { useContext } from 'react';
import { booleanContext } from '../Context';
import NavBar from './NavBar';
const Logout = () => {

    const{isLoggedIn, setIsLoggedIn} =useContext(booleanContext )
useEffect(()=>{
setIsLoggedIn(false)
localStorage.clear()
},[setIsLoggedIn])
  return (
      <>
    <div>You Have Successfuly been logged out</div>
    </>
  )
}

export default Logout