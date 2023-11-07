import React, { useEffect, useState, useContext }  from 'react'
import { usersContext } from '../Context'
import axios from '../api/axios';
import { json } from 'react-router-dom';
import { Button } from 'react-bootstrap';



const LOGIN_URL = '/api/auth/login';

function UsersAdmin() {
    const {users, setUsers} =useContext(usersContext)
    const [userToDelete, setUserToDelete] = useState('')
    const [deleteUsers, setDeleteUsers] = useState(false)
    const adminUser = localStorage.getItem("username")
    const password = localStorage.getItem("password")
    function refreshPage() {
      window.location.reload(false);
    }
    const refresh = {headers :{
      'Content-Type' : 'application/json',
      AUTHORIZATION : 'Bearer ' +localStorage.getItem("Refresh Token")
          }}
    const deleteUsersFunction = async(e) =>{
      const URL = `/api/auth/deleteUser/admin/${userToDelete}`


try{


const adminUserProfile = `{"username":"${adminUser}", "password":"${password}"}`
const obj = JSON.parse(adminUserProfile);
console.log(obj);
  const response2 = await axios.delete(URL, refresh);
  console.log(response2);
alert("Success")
refreshPage()

}catch(err){
  alert(err)
  console.log(err);


}
setDeleteUsers(false)  

}
useEffect(() => {
if(deleteUsers){
  deleteUsersFunction()
 
}
}, [deleteUsers ]);

      const displayUsers = users.map((user)=>{
        let stringRole = JSON.stringify(user.roles.map((u)=>u.name))
    let role = ''
    for(let i = 0; i < stringRole.length; i++){
      if(stringRole[i] != '[' && stringRole[i] != ']' && stringRole[i] != '"') role += stringRole[i];
    }
    role = role.replace('ROLE_', ''); 
    console.log(role);
        return (
          <>
          
            
              {user.username === localStorage.getItem("username") ? null : 
              
              <tr>
              <td>
 
              {user.username}
              </td>
              
            
              <td id="role">
              {role}
           
              </td>
              <td id="action_row1">
              
              <Button onClick={ () =>{
                    setUserToDelete(user.username)
                    setDeleteUsers(true)
                  }}>
                    Delete
                </Button>

</td>

</tr>       

      }
          </>
        )
        });
    return (
        <div>

            <h1>Users</h1>
            <React.Fragment>
                <div id="wrapper text-align: center;">
  <table
    align="center"
    cellSpacing="2"
    cellPadding="5"
    id="data_table"
    border="1"
    className='table'
  >
    <tbody>
<tr>
    <th>Username</th>
    <th>Role</th>
    <th>Action</th>
    </tr>

            {displayUsers}
           {/* {localStorage.setItem("user", document.getElementById("link"))} */}
        
            
           
            </tbody>
            </table>
            </div>
            </React.Fragment>
        </div>
    );
}

export default UsersAdmin;