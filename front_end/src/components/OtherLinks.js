import React, { useEffect, useState, useContext }  from 'react'
import axios from '../api/axios';
import { usersContext } from '../Context'

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
            <tr>
              <td>
                <a href={`https://` +link.url}>
                {link.name}
                </a>
              </td>
            </tr>
          </React.Fragment>
          </>
        )
        });
        return (
            <div>
             <h1>{username}'s links</h1>

               {displayLinks} 
            </div>
        );
    
}

export default OtherLinks;