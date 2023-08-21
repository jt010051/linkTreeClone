import React, {useState, useEffect} from 'react'
import axios from '../api/axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



const CHECK_LOGIN_URL = '/api/auth/token/refresh';

const Profile = () => {
  const [editedEmail, setEditedEmail] = useState('')
  const [editedUsername, setEditedUsername] = useState('')
  const [errMsg, setErrMsg] = useState('');
  const [checkingPassword, setCheckingPassword] = useState('')
  const [password, setPassword] = useState('')
  const [editedFirstName, setEditedFirstName] = useState('')
  const [editedLastName, setEditedLastName] = useState('')

  const [editedAddress, setEditedAddress] = useState('')
  const [editedPassword, setEditedPassword] = useState('')

  const [editedCreditCard, setEditedCreditCard] = useState('')
  const [username, setUsername] = useState('')
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState(0)

  const [address, setAddress] = useState('')
  const [creditCard, setCreditCard] = useState('')
    
    const [assigned, setAssigned] = useState(false)
    function refreshPage() {
      window.location.reload(false);
    }
    const refresh = {headers :{
'Content-Type' : 'application/json',
AUTHORIZATION : 'Bearer ' +localStorage.getItem("Refresh Token")

    }}
    const handleInputFocus = ({ target }) => {
      this.setState({
        focused: target.name
      })
    }
    const checkLoggedIn = async (e) => {

try{
   
    const response = await axios.get(CHECK_LOGIN_URL, refresh);
    setUsername(localStorage.getItem("username"))

setAssigned(true)
const user =localStorage.getItem("username")
const url = `/api/links/get/${user}`;

      const response2 = await axios.get(url);
setFirstName(response2.data.firstName);
console.log(response2);

setLastName(response2.data.lastName);
setEmail(response2.data.email);
setAddress(response2.data.address);
setCreditCard(response2.data.creditCard);
setId(response2.data.id)
setPassword(response2.data.password)
localStorage.setItem("id", id)
console.log(localStorage.getItem("id"));

}catch (err) {
    
}


    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const LOGIN_URL = '/api/auth/login';



      try {
       
        




        const json = `{"id":"${id}", "username":"${editedUsername}","firstName":"${editedFirstName}", 
"lastName":"${editedLastName}", "email":"${editedEmail}", "address":"${editedAddress}", "creditCard":"${editedCreditCard}"}`;
        console.log(json);
        const obj = JSON.parse(json);

          const response = await axios.put("/api/auth/user/update", obj);

       
          alert("Success")
          refreshPage()
          // location.reload();
      }
      catch(err){
        alert("error with login")
        console.log(err)
      //   if (err.response?.status === 403) {
      //     setErrMsg('Old Password does not match');
      //     alert(errMsg)
      // }
                  // errRef.current.focus();

      }
    }
    useEffect(() => {
        checkLoggedIn()
    }, [])

 



  return (
    <>
  { assigned ? <>
<div className="a text-align: center">
  <br />
  <h3>Welcome {username}</h3>
  <p>User Details</p>
</div>



<div id="wrapper text-align: center;">
  <table
    align="center"
    cellSpacing="2"
    cellPadding="5"
    id="data_table"
    border="1"
  >
    <tbody>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
      <th>Email</th>
      <th>Address</th>
      <th>Credit Card Number</th>
      <th>Password</th>
      <th>Edit</th>
      

    </tr>

    <tr id="row1">
      <td id="first_name">{firstName}</td>
      <td id="last_name">{lastName}</td>
      <td id="username">{username}</td>
      <td id="email">{email}</td>
      <td id="address">{address}</td>
      <td id="payment">{creditCard}</td>
      <td id='password'>  <a href="/changePassword">

<button>Change Password</button>
</a></td>
      <td id="action_row1">
        

          <Popup trigger={
               <input
               type="button"
               id="edit_button1"
               value="Edit"
               className="edit"
               //  onClick={edit()}
             />
          } position="right center">
    <div>
    <form onSubmit={handleSubmit}>
    <label>
    First Name:
    <input type="text" name="first_name"  onChange={(e) => setEditedFirstName(e.target.value)} placeholder={firstName}/>
  </label>
  <br/>
  <label>
    Last Name:
    <input type="text" name="last_name"  onChange={(e) => setEditedLastName(e.target.value)}placeholder={lastName}/>
  </label>
  <br/>
  <label>
    Userename:
    <input type="text" name="username" onChange={(e) => setEditedUsername(e.target.value)} placeholder={username}/>
  </label>
  <br/>
  <label>
    Email:
    <br/>
    <input type="text" name="email" onChange={(e) => setEditedEmail(e.target.value)}
placeholder={email}/>
  </label>
  <br/>
  <label>
    Address:
    <input type="text" name="address" onChange={(e) => setEditedAddress(e.target.value)} placeholder={address}/>
  </label>
  <br/>
  <label>
    Credit Card Info:
    <input type="number"  className='form-control'
                placeholder='Card Number'
                pattern='[\d| ]{16,22}'
                maxLength='19' name="creditCard" onChange={(e) => setEditedCreditCard(e.target.value)} 
               
                />
  </label>

  <input type="submit" value="Submit" />


</form>


    </div>
    
  </Popup>
      
      </td>
    </tr>
    </tbody>
  </table>
</div> </>: null}

    
    
    
    </>
  )
}

export default Profile