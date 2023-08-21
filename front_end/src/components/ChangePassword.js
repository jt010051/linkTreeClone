import React, {useState, useEffect} from 'react'
import axios from '../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = '/api/auth/login';

const ChangePassword = () => {
    const [checkingPassword, setCheckingPassword] = useState('')

    // const [password, setPassword] = useState('')
    const [editedPassword, setEditedPassword] = useState('')
    const [confirmEditedPassword, setConfirmEditedPassword] = useState('')

    const [username, setUsername] = useState('')
    const [id, setId] = useState(0)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/profile";

    useEffect(() => {
        setUsername(localStorage.getItem("username"))
        setId(localStorage.getItem("id"))

    }, [])


 
    const changePass = async (e) => {
        e.preventDefault();
    
        
            if(editedPassword != confirmEditedPassword) {
                alert("Passwords Don't Match");
                    return;
            } 
          

    try {

        const url2 = `/api/links/get/${username}`;
       

        const response1 = await axios.get(url2);
    
        console.log(response1.data);
const url = `${LOGIN_URL}?username=${username}&password=${checkingPassword}`
const response = await axios.post(url);

alert("Success")
const fullLink = `/api/auth/user/updatePassword?username=${username}&password=${editedPassword}`
console.log(fullLink);
const response2 = await axios.put( fullLink);
        
alert("Password Has Been Changed!")
console.log(response);
console.log(response2);

navigate(from, { replace: true });

    }
    catch(err){
alert("Old password is incorrect")
console.log(err);
    }
}


    return (
        <div>
<form onSubmit={changePass}>
    <h1>Change Password</h1>
<label>
    Old Password
    <input type="password" name="password" onChange={(e) => setCheckingPassword(e.target.value)} required/>
  </label>
  <br/>
  <label>
    New Password
    <input type="password" name="password" onChange={(e) => setEditedPassword(e.target.value) }  
    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"required/>
  </label>
  <br/>
  <label>
    Confirm New Password
    <input type="password" name="password" onChange={(e) => setConfirmEditedPassword(e.target.value)} required />
  </label>
  <div id="message">
 <h3>Password must contain the following:</h3>
 <p id="letter" className="invalid">A <b>lowercase</b> letter</p>
 <p id="capital" className="invalid">A <b>capital (uppercase)</b> letter</p>
 <p id="number" className="invalid">A <b>number</b></p>
 <p id="length" className="invalid">Minimum <b>8 characters</b></p>
</div>
<button>Submit</button>


</form>
        </div>
    );
};

export default ChangePassword;