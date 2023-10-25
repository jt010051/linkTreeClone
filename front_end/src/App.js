import logo from './logo.svg';
import './App.css';
import {React,useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { booleanContext, usernameContext, oppositeContext, incrementContext, refreshContext, usersContext, proccessContext } from './Context';

import MainPage from './components/MainPage';
import Login from './components/LoginPage';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Profile from './components/Profile';
import Logout from './components/Logout';
import About from './components/About';
import Users from './components/Users';
import DeleteProccess from './components/DeleteProccess';
import ChangePassword from './components/ChangePassword';
import OtherLinks from './components/OtherLinks';
import UsersAdmin from './components/Users (Admin_View)';
import axios from './api/axios'
import 'bootstrap/dist/css/bootstrap.min.css';



const URL = "/api/auth/users";

function App() {
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const[users, setUsers] = useState([])
  const[proccess, setProccess] = useState('pending')

  const fetchUsers = async(e) =>{
     
    try{
    const response = await axios.get(URL);
    setUsers(response.data)
    }catch(err){
    console.log(err);
    alert("Server Error")
    }
            
        }
        
  useEffect(()=>{

    fetchUsers()

    
    },[])


  return (
<>
{/* <refreshContext.Provider/>
  <incrementContext.Provider/>
<booleanContext.Provider/>
<oppositeContext.Provider/> */}
  <booleanContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
  <usersContext.Provider value={{users, setUsers}}>
  <proccessContext.Provider value={{proccess, setProccess}}>



<NavBar/>

<Routes>
<Route index element={<MainPage />} />

<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/profile" element={<Profile />} />
<Route path="/logout" element={<Logout />} />
<Route path="/about" element={<About />} />
<Route path="/changePassword" element={<ChangePassword />} />
<Route path="/users" element={<Users />} />
<Route path="/delete" element={<DeleteProccess />} />
<Route path="/links" element={<OtherLinks />} />
<Route path = "/adminUsersInDatabase" element={<UsersAdmin />} />
<Route>
          <Route path="/" element={<MainPage />} />
        </Route>



</Routes>
</proccessContext.Provider>

</usersContext.Provider>

</booleanContext.Provider>

</>
  );
}

export default App;
