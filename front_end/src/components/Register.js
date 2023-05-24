import React from 'react'
import NavBar from './NavBar'
import { useRef, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
const LOGIN_URL = '/api/auth/user/save';

const Register = () => {

    const [errMsg, setErrMsg] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const json = `{"username" : "${username}", "password" : "${password}"}`;
useEffect(() => {
    setErrMsg('');
}, [username, password])
const userJson = JSON.parse(json);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, userJson);
            console.log(response);
        }
        catch (err) {
            if (!err?.response) {
              
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Registration Failed');
            }
        }
    }
  return (
    <>
   <h1>Register for Access</h1>

<div className="bg-warning p-1"> </div>

<form >

 <div className="form-group">
   <label htmlFor="username">Username</label>
   <input type="text" className="form-control" id="username" placeholder="user name"  name="username" value={username} onChange={(e) => setUsername(e.target.value)} required
/>
 </div>

 <div className="form-group">
   <label htmlFor="password">Password</label>
   <input type="password" className="form-control" id="password" placeholder="password"  name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
   onChange={(e) => setPassword(e.target.value)}
   value={password} required/>
 </div>
  <div className="form-group">
   <label htmlFor="password">Confirm Password</label>
   <input type="password" className="form-control" id="password" placeholder="password"  name="password" required/>
   
 </div>
<br></br>
 <button type="button" className="btn btn-primary" onClick={handleSubmit} >Register</button>


<div id="message">
 <h3>Password must contain the following:</h3>
 <p id="letter" className="invalid">A <b>lowercase</b> letter</p>
 <p id="capital" className="invalid">A <b>capital (uppercase)</b> letter</p>
 <p id="number" className="invalid">A <b>number</b></p>
 <p id="length" className="invalid">Minimum <b>8 characters</b></p>
</div>
</form>
   </>
  )
}

export default Register