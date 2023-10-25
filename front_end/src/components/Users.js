import React, { useEffect, useState, useContext }  from 'react'
import { usersContext } from '../Context'
import axios from '../api/axios';
import { Button } from 'react-bootstrap';

function Users() {
    const {users, setUsers} =useContext(usersContext)
    


      const displayUsers = users.map((user)=>{
       
        return (
          <>
          
            <React.Fragment>
            <tr>
              <td>
                <a href={`/links`} id='link'>
                  <Button onClick={e => localStorage.setItem("user", e.target.innerText)}>
                {user.username === localStorage.getItem("username") ? null : user.username}
                </Button>
                </a>
              </td>
            </tr>
          </React.Fragment>
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

export default Users;