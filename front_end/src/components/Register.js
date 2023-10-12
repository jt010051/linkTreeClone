import React from 'react'
import NavBar from './NavBar'
import { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { proccessContext } from '../Context';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";
    const [errMsg, setErrMsg] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [address, setAddress] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [creditCard, setCreditCard] = useState('')
const[street, setStreet] = useState('')
const[state, setState] = useState('')

const[city, setCity] = useState('')
const[zipCode, setZipCode] = useState('')
const [role, setRole] = useState('')
const{proccess, setProccess} =useContext(proccessContext)
const LOGIN_URL = '/api/auth/user/save';


console.log(role);
   
useEffect(() => {
    setAddress(street +" " +city +", " +state +" " +zipCode)
   

    setErrMsg('');
}, [username, password, address, zipCode])
const json = `{"username" : "${username}", "password" : "${password}", 
"firstName" : "${firstName}", "lastName" : "${lastName}", "email" : "${email}",
 "address" : "${address}", "creditCard" : "${creditCard}",  
 "isPending" : "${true}"}`;
const userJson = JSON.parse(json);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, userJson);
    if(response.data !== ''){
      console.log(response);
      console.log("Account not found, creating new account");
           nextResponse()
    }
        else{
          alert("User already in database")
        }   

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
    const nextResponse = async() =>{
      const pendingRoleUrl = `/api/auth/user/pendingRole?thisPendingRole=${role}&username=${username}`
      navigate(from, { replace: true });
try{

  const response = await axios.post(pendingRoleUrl)
  alert("Account Created")
}catch(err){
  console.log(err);
}
    }
  return (
    <>
   <h1>Register for Access</h1>

<div className="bg-warning p-1"> </div>

<form >
<div>
        <label htmlFor="name">First Name</label>
        <input required type="text" id="fName" className="name" autoComplete="name" enterKeyHint="next" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
      </div>
      <div>
        <label htmlFor="name">Last Name</label>
        <input required type="text" id="lName" className="name" autoComplete="name" enterKeyHint="next" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
      </div>
<div>
        <label htmlFor="street-address">Street address</label>
        <input type="text" id="street-address" name="street-address" autoComplete="street-address" required enterKeyHint="next" value={street} onChange={(e) => setStreet(e.target.value)}></input>
      
      </div>
  
      <div>
        <label htmlFor="city">City</label>
        <input required type="text" id="city" name="city" autoComplete="address-level2" enterKeyHint="next" value={city} onChange={(e) => setCity(e.target.value)}></input>
      </div>
      <div>
      <select value={state} onChange={(e) => setState(e.target.value)} >
	<option value="AL">Alabama</option>
	<option value="AK">Alaska</option>
	<option value="AZ">Arizona</option>
	<option value="AR">Arkansas</option>
	<option value="CA">California</option>
	<option value="CO">Colorado</option>
	<option value="CT">Connecticut</option>
	<option value="DE">Delaware</option>
	<option value="DC">District Of Columbia</option>
	<option value="FL">Florida</option>
	<option value="GA">Georgia</option>
	<option value="HI">Hawaii</option>
	<option value="ID">Idaho</option>
	<option value="IL">Illinois</option>
	<option value="IN">Indiana</option>
	<option value="IA">Iowa</option>
	<option value="KS">Kansas</option>
	<option value="KY">Kentucky</option>
	<option value="LA">Louisiana</option>
	<option value="ME">Maine</option>
	<option value="MD">Maryland</option>
	<option value="MA">Massachusetts</option>
	<option value="MI">Michigan</option>
	<option value="MN">Minnesota</option>
	<option value="MS">Mississippi</option>
	<option value="MO">Missouri</option>
	<option value="MT">Montana</option>
	<option value="NE">Nebraska</option>
	<option value="NV">Nevada</option>
	<option value="NH">New Hampshire</option>
	<option value="NJ">New Jersey</option>
	<option value="NM">New Mexico</option>
	<option value="NY">New York</option>
	<option value="NC">North Carolina</option>
	<option value="ND">North Dakota</option>
	<option value="OH">Ohio</option>
	<option value="OK">Oklahoma</option>
	<option value="OR">Oregon</option>
	<option value="PA">Pennsylvania</option>
	<option value="RI">Rhode Island</option>
	<option value="SC">South Carolina</option>
	<option value="SD">South Dakota</option>
	<option value="TN">Tennessee</option>
	<option value="TX">Texas</option>
	<option value="UT">Utah</option>
	<option value="VT">Vermont</option>
	<option value="VA">Virginia</option>
	<option value="WA">Washington</option>
	<option value="WV">West Virginia</option>
	<option value="WI">Wisconsin</option>
	<option value="WY">Wyoming</option>
</select>
      </div>
      <div>
        <label htmlFor="postal-code">ZIP or postal code </label>
        <input className="postal-code" id="postal-code" name="postal-code" autoComplete="postal-code" enterKeyHint="next" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required></input>
      </div>
      <div className='form-group'>
              <label htmlFor="creditCard">Credit Card Number:</label>

              <input
                type='tel'
                name='number'
                className='form-control'
                placeholder='Card Number'
                pattern='[\d| ]{16,22}'
                maxLength='19'
                value={creditCard} onChange={(e) => setCreditCard(e.target.value)} 
                required
                
              />
            </div>
            <div>
            <label htmlFor="email">Email:</label>
<input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
            </div>
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
 <div>
<h3>Role Requested</h3>
<input type="radio" id="user" name="role" value="user" onClick={(e) => setRole('user')}
required />
    <label htmlFor="user">Standard User</label>
    <input type="radio" id="admin" name="role" value="admin" onClick={(e) => setRole('admin')} required/>
    <label htmlFor="admin">Administrator</label>
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