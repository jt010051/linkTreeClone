import React, { useEffect, useState, useContext }  from 'react'
import axios from '../api/axios';
import { usersContext } from '../Context'
import { Button } from 'react-bootstrap';

const OtherLinks =  () => {
  const {users, setUsers} =useContext(usersContext)

const username = localStorage.getItem("user")
    const linksURL = `api/links/get/${username}/links`
    const [userLinks, setUserLinks] =useState([])

    const fetchLinks = async(e) =>{
     
        
       
try{
const response = await axios.get(linksURL);
setUserLinks(response.data)
}catch(err){
console.log(err);
}
        
    }
      useEffect(() => {
      

          fetchLinks();

      }, [])
    const displayLinks = userLinks.map((link)=>{
        return (
          <>
          
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
              <td>
             
                <a href={`https://` +link.url}>
                <Button>
                {link.name}
                </Button>
                </a>
              </td>
            </tr>
            </tbody>
            </table>
            </div>
          </React.Fragment>
          </>
        )
        });
        return (
            <div>
             <h1>{username}'s links</h1>
             <th>Links</th>
               {displayLinks} 
            </div>
        );
    
}

export default OtherLinks;