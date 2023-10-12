import React, { useEffect } from 'react'
import { useContext } from 'react';
import { booleanContext } from '../Context';
import NavBar from './NavBar';
const Logout = () => {

    const{isLoggedIn, setIsLoggedIn} =useContext(booleanContext )

setIsLoggedIn(false)
localStorage.clear()

  return (
      <>
    <div>You Have Successfuly been logged out</div>
    </>
  )
}

export default Logout