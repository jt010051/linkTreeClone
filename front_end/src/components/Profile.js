import React, {useState, useEffect} from 'react'
import axios from '../api/axios';


const CHECK_LOGIN_URL = '/api/auth/token/refresh';

const Profile = () => {

  const [username, setUsername] = useState('')

    
    const [assigned, setAssigned] = useState(false)
    const refresh = {headers :{
'Content-Type' : 'application/json',
AUTHORIZATION : 'Bearer ' +localStorage.getItem("Refresh Token")

    }}
    const checkLoggedIn = async (e) => {

try{
   
    const response = await axios.get(CHECK_LOGIN_URL, refresh);
    console.log(response);
    setUsername(localStorage.getItem("username"))

setAssigned(true)

}catch (err) {
    
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
  <p>Here are your User Details</p>
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
      <th></th>
    </tr>

    <tr id="row1">
      <td id="first_name">Name</td>
      <td id="last_name">Name</td>
      <td id="last_name">{username}</td>
      <td id="email">{username}@hcl.com</td>
      <td id="adress">1000</td>
      <td id="payment">1234 1234 1234 1234</td>
      <td id="action_row1">
        <input
          type="button"
          id="edit_button1"
          value="Edit"
          className="edit"
        //   onClick="edit_row('1')"
        />
        <input
          type="button"
          id="save_button1"
          value="Save"
          className="save"
        //   onClick="save_row('1')"
        />
      </td>
    </tr>
    </tbody>
  </table>
</div> </>: null}

    
    
    
    </>
  )
}

export default Profile