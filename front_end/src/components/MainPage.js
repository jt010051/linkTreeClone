import React, {useEffect, useState} from 'react'
import axios from 'axios'

const url="http://localhost:8080/allLinks";

function MainPage() {

    const [links, setLinks] =useState([[]])
    const fetchLinks = () =>{

    
        axios.get(url).then(res=>{
          setLinks(res.data)
    
        });
    };
    useEffect(()=>{
        fetchLinks();
      
           
      },[])
      console.log(links);
  return (
<>
{links.map((link) => 
  <li>
  <a href="Links">{link.name}</a>
  </li>
  
 )}
<form>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search Links</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Add New Link"
            name="s" 
           
          
        />
        {/* <Button variant="primary" type='submit'>Submit</Button>{' '} */}

    </form>
<div>

</div>


</>
  )
}

export default MainPage