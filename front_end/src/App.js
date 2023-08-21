import logo from './logo.svg';
import './App.css';
import {React,useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { booleanContext, usernameContext, oppositeContext, incrementContext, refreshContext } from './Context';

import MainPage from './components/MainPage';
import Login from './components/LoginPage';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Profile from './components/Profile';
import Logout from './components/Logout';
import About from './components/About';
import ChangePassword from './components/ChangePassword';
function App() {
  const [isLoggedIn, setIsLoggedIn]=useState(false);

  useEffect(()=>{
    if(isLoggedIn){
          localStorage.setItem("Logged In", true);
    
    }
    
    
    },[isLoggedIn])



  return (
<>
{/* <refreshContext.Provider/>
  <incrementContext.Provider/>
<booleanContext.Provider/>
<oppositeContext.Provider/> */}
  <booleanContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
  <usernameContext.Provider value={''}>


<NavBar/>

<Routes>
<Route index element={<MainPage />} />

<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/profile" element={<Profile />} />
<Route path="/logout" element={<Logout />} />
<Route path="/about" element={<About />} />
<Route path="/changePassword" element={<ChangePassword />} />

<Route>
          <Route path="/" element={<MainPage />} />
        </Route>



</Routes>
</usernameContext.Provider>

</booleanContext.Provider>

</>
  );
}

export default App;
