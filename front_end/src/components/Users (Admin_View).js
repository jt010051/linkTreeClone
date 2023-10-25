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
       
        return (
          <>
          
            
              {user.username === localStorage.getItem("username") ? null : 
              
              
              <React.Fragment>
            <tr>
              <td>
              
              {user.username}

                {/* <a href={`/deleteThisUser`} id='link'> */}
                  <Button onClick={ () =>{
                    setUserToDelete(user.username)
                    setDeleteUsers(true)
                  }}>
                    Delete
                </Button>
                {/* </a> */}
              </td>
            </tr>
          </React.Fragment>
      }
          </>
        )
        });
    return (
        <div>
            <h1>Users</h1>
            {displayUsers}
           {/* {localStorage.setItem("user", document.getElementById("link"))} */}
        </div>
    );
}

export default UsersAdmin;