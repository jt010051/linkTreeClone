import React, {useState, useEffect, useContext, useRef} from 'react'
import axios from '../api/axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { booleanContext } from '../Context';
import { usersContext } from '../Context'
import { Button } from 'react-bootstrap';



const CHECK_LOGIN_URL = '/api/auth/token/refresh';
const LOGIN_URL = '/api/auth/login';

const Profile = () => {
  const [editedEmail, setEditedEmail] = useState('')
  const [editedUsername, setEditedUsername] = useState('')
  const [errMsg, setErrMsg] = useState('');
  const [checkingPassword, setCheckingPassword] = useState('')
  const [password, setPassword] = useState('')
  const [editedFirstName, setEditedFirstName] = useState('')
  const [editedLastName, setEditedLastName] = useState('')
  const{isLoggedIn, setIsLoggedIn} =useContext(booleanContext)
  const [editedAddress, setEditedAddress] = useState('')
  const [editedPassword, setEditedPassword] = useState('')
  const [editedCreditCard, setEditedCreditCard] = useState('')
  const [username, setUsername] = useState('')     
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState(0)
  const [role, setRole] = useState('')
  const [roleToUser, setRoleToUser] = useState('')
  const [address, setAddress] = useState('')
  const [creditCard, setCreditCard] = useState('')
  const [assigned, setAssigned] = useState(false)
  const firstUpdate = useRef(true);
  const {users, setUsers} =useContext(usersContext)

 const userProfile = `{"id":"${id}", "username":"${username}", "password":"${password}","firstName":"${firstName}", 
"lastName":"${lastName}", "email":"${email}", "address":"${address}", "creditCard":"${creditCard}"}`


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



    const submitRole = async () =>{

      try{
        if(assigned === true){
          const url = `/api/auth/role/addtouser`
          const roleToUserForm = `{"username":"${roleToUser}", "roleName":"ROLE_ADMIN"}`;                  
          const objRole = JSON.parse(roleToUserForm);
          const response = await axios.post(url,objRole, refresh)
                  

        }else{
          const url = `/api/auth/user/pendingRole?thisPendingRole="ROLE_USER"&username=${roleToUser}`
          const response = await axios.post(url)  
        }

         alert("success")
          refreshPage()
      }
      catch(err){
console.log(err);
alert(err)
      }
    }


    const checkLoggedIn = async (e) => {

try{
    const response = await axios.get(CHECK_LOGIN_URL, refresh);
    setUsername(localStorage.getItem("username"))
    setAssigned(true)
    setIsLoggedIn(true)
    const user =localStorage.getItem("username")
    const url = `/api/links/get/${user}`;
    const response2 = await axios.get(url);
setRole(response2.data.role)
    setFirstName(response2.data.firstName);
    setLastName(response2.data.lastName);
    setEmail(response2.data.email);
    setAddress(response2.data.address);
    setCreditCard(response2.data.creditCard);


if(response2.data.pending === true) setRole("Pending")
else {
  if (localStorage.getItem("role") === "[ROLE_ADMIN]") setRole("Administrator")
  else setRole("User")
}

setId(response2.data.id)
setPassword(localStorage.getItem("password"))

localStorage.setItem("id", id)
}catch (err) {
    alert(err)
}


    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
      const json = `{"id":"${id}", "username":"${editedUsername}","firstName":"${editedFirstName}", 
      "lastName":"${editedLastName}", "email":"${editedEmail}", "address":"${editedAddress}", 
      "creditCard":"${editedCreditCard}"}`;
        console.log(json);
        const obj = JSON.parse(json);
        const response = await axios.put("/api/auth/user/update", obj);
        alert("Success")
        const url = `${LOGIN_URL}?username=${editedUsername}&password=${password}`
        const response2 = await axios.post(url);
        const accessToken = response2?.data?.access_token;
        const refreshToken = response2?.data?.refresh_token;
        const roles = response2?.data?.authorities;                  
        localStorage.setItem("Refresh Token", refreshToken);
        localStorage.setItem("Access Token", accessToken);
        localStorage.setItem("username", editedUsername);
        localStorage.setItem("password", password);
        setUsername(editedUsername)
        window.location.reload(false);
              }
      catch(err){
        alert("error with login")
        console.log(err)
      }
    }

    useEffect(() => {
        checkLoggedIn()
    }, [])

    const displayUsers = users.map((user)=>{
   
     if(user.pending === true){
      
      return (
        <>
        
          <React.Fragment>
          <tr>
            <td>
              <Popup trigger={
               <input
               type="button"
               id="edit_button1"
               value={user.username === localStorage.getItem("username") ? null : user.username}
               className="edit"
               //  onClick={edit()}
             />
          } position="right center">
                  <h4>Requested Admin Role</h4>
                  <input type="radio" id="approve" name="role" value="approve" onClick={(e) => {
                    setAssigned(true)
                    setRoleToUser(user.username)
                  }}
                  />
                      <label htmlFor="approve">Approve</label>
                      <input type="radio" id="deny" name="role" value="deny" onClick={(e) => {
                        setAssigned(false)
                        setRoleToUser(user.username)
                      
                      }} />
                      <label htmlFor="deny">Deny</label> 

                          <Button onClick={()=>{

                            submitRole()
                          }}>Submit</Button>
                                    </Popup>
                                      </td>
                                    </tr>
                                    
                                  </React.Fragment>
                                  
                                  </>
                                )
                                } });



      useEffect(() => {
  
      }, [])   


  return (
    <>
  { isLoggedIn ? <>
<div className="a text-align: center">
  <br />
  <h1>Welcome {username}</h1>
  <h3>User Details</h3>
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
      <th>Role</th>
      <th>Password</th>
      <th>Edit</th>
      <th>Delete Account</th>


    </tr>

    <tr id="row1">
      <td id="first_name">{firstName}</td>
      <td id="last_name">{lastName}</td>
      <td id="username">{username}</td>
      <td id="email">{email}</td>
      <td id="address">{address}</td>
      <td id="roles">{role}</td>

      <td id='password'>  <a href="/changePassword">

<Button>Change Password</Button>
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
      <td id="action_row1">
      <Popup trigger={
               <input
               type="button"
               id="delete_button1"
               value="Delete"
               className="delete"
               //  onClick={edit()}
             />
          } position="right center"> 
          <h3>Are You Sure you want to Delete your Account</h3>
          <a href='/delete'><Button>Delete</Button></a>

          </Popup>


      </td>
    </tr>
    </tbody>
  </table>
</div> 
{role === "Administrator" ? <div>
<h1>Pending Tasks</h1>
{displayUsers}
<a href='/adminUsersInDatabase'>
<Button>Users in Database</Button>
</a>
    </div> : null

}



</>: 
<h1>Please Log In</h1>

}

    
    
    
    </>
  )
}

export default Profile