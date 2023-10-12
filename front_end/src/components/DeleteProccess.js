import React, {useState, useEffect, useContext} from 'react'
import axios from '../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { booleanContext } from '../Context';

function DeleteProccess() {
    const [password, setPassword] = useState('')
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const URL = `/api/auth/deleteUser/${username}?password=${password}`
    const LOGIN_URL = '/api/auth/login';
    const{isLoggedIn, setIsLoggedIn} =useContext(booleanContext )


    const handleSubmit = async ()=>{
try{


  const roleCheck =  ``
  const url = `${LOGIN_URL}?username=${username}&password=${password}`
const loginRespose = await axios.get(url);




const response = await axios.delete(URL);
alert("Success")
localStorage.clear()
setIsLoggedIn(false)
navigate(from, { replace: true });

}
catch(err){
  alert(err)
  console.log(err);
}
    }
    return(
        <>
        <h1>Enter Password</h1>
        <label>
          Password:
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleSubmit}>Submit</button>
        </>
        
              );
}

export default DeleteProccess;