import React, { useEffect, useState, useContext }  from 'react'
import Login from './LoginPage'
import axios from '../api/axios';
import { booleanContext } from '../Context';

const NavBar = () => {
    const [showProfile, setShowProfile]=useState(false);
    const [showRegister, setShowRegister]=useState(true);
    const [showLogin, setShowLogin]=useState(true);
    const [showLogOut, setShowLogOut]=useState(false);

    // const{isLoggedIn, setIsLoggedIn} =useContext(booleanContext )

    const CHECK_LOGIN_URL = '/api/auth/token/refresh';

    const refresh = {headers :{
      'Content-Type' : 'application/json',
      AUTHORIZATION : 'Bearer ' +localStorage.getItem("Refresh Token")
      
          }}
          const checkLoggedIn = async (e) => {
      
      try{
         
          const response = await axios.get(CHECK_LOGIN_URL, refresh);
          setShowProfile(true)
            setShowRegister(false)
            setShowLogin(false)
            setShowLogOut(true)
          // setIsLoggedIn(true)
      }catch (err) {
          
      }
          }
          useEffect(() => {
              checkLoggedIn()
            // if(isLoggedIn){
            //  

            // }
          }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-text-light bg-dark">

    <a className="navbar-brand" href="/">LinkTree Clone</a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href='/'>Home</a>
        </li>
        <li className="nav-item">
        </li>
        <li className="nav-item">
          <a className="nav-link" href='/about'>About</a>
        </li>
      </ul>
      <div className="form-inline my-2 my-lg-0">
        <ul className="navbar-nav mr-auto2">
          <li className="nav-item">
       
            </li>
        
     
          <li className="nav-item">
            
             { showRegister ? <a className="nav-link" href='/register'>Register</a> : null }
          </li>
          <li className="nav-item">
            
          
              { showLogin ?   <a className="nav-link" href='login'>Login</a> : null }
          </li>
          <li className="nav-item">
            
             { showProfile ?  <a className="nav-link " href= "/profile">Profile</a> : null }
          </li>
          <li className="nav-item">
            
             { showLogOut ?  <a className="nav-link text-danger" href='/logout'>Log Out</a> : null }
          </li>
        </ul>
        
      </div>
    </div>
  </nav>  )
}

export default NavBar