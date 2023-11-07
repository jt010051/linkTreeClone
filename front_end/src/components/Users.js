import React, { useEffect, useState, useContext }  from 'react'
import { usersContext } from '../Context'
import axios from '../api/axios';
import { Button } from 'react-bootstrap';

function Users() {
    const {users, setUsers} =useContext(usersContext)
    


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
          <td id="row1"> 
                <a href={`/links`} id='link'>
                  <Button onClick={e => localStorage.setItem("user", e.target.innerText)}>
                {user.username === localStorage.getItem("username") ? null : user.username}
                </Button>
                </a>
                </td>
              <td id="role">
              {role}
           
              </td>
              </tr>
             
     
      }
          </>
        )
        });
    return (
      <>
        <div>
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


</tr>
   
            {displayUsers}
           {/* {localStorage.setItem("user", document.getElementById("link"))} */}
     
      </tbody>
      </table>
      </div>
      </React.Fragment>
        </div>
        </>
    );
}

export default Users;