import React, {useEffect, useState} from 'react'
import axios from '../api/axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

const newLinkUrl = "api/links/newLink";
const CHECK_LOGIN_URL = '/api/auth/token/refresh';

function MainPage() {
  const [username, setUsername] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);


    const [userLinks, setUserLinks] =useState([])
    const [linkName, setLinkName] =useState('')
    const [newUrl, setNewURL] =useState('')

    const [errMsg, setErrMsg] = useState('');
    function refreshPage() {
      window.location.reload(false);
    }
    const refresh = {headers :{
      'Content-Type' : 'application/json',
      AUTHORIZATION : 'Bearer ' +localStorage.getItem("Refresh Token")
      
          }}
          const checkLoggedIn = async (e) => {
      
      try{
         
          const response = await axios.get(CHECK_LOGIN_URL, refresh);
          setLoggedIn(true);
       
          

      }catch (err) {
          console.log(err);
      }
          }
        

         
          const fetchLinks = async(e) =>{
     
            const url=`api/links/get/${localStorage.getItem("username")}/links`;
try{
const response = await axios.get(url);
setUserLinks(response.data)
}catch(err){
  console.log(err);
}
            
        }
          useEffect(() => {
              checkLoggedIn()

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
const json = `{"name":"${linkName}", "url":"${newUrl}"}`;

const user = `{"username":"${username}"}`;

const obj = JSON.parse(json);
const userJson = JSON.parse(user);
const fullLink = `${newLinkUrl}?username=${username}`
const handleSubmit = async(e)=>{
  e.preventDefault();

  try {
    const response = await axios.post(fullLink, obj);
    console.log(response);
    fetchLinks();

  }
  catch (err) {
    alert("error with post")
    console.log(err);
                if (!err?.response) {
                  
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    setErrMsg('Missing Link');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg('Post Failed');
                }
                // errRef.current.focus();
            }
}


  return (
<>

{username != "" ? <>
<h1> {username}'s Profile</h1>


{displayLinks}
{ loggedIn ? 

<form onSubmit={handleSubmit}>
        <label htmlFor="header-search">
            <span className="visually-hidden">Add Link</span>
        </label>
        <label htmlFor="name"> Link Name:</label>
                <input
                    type="text"
                    id="name"
                    // ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setLinkName(e.target.value)}
                    value={linkName}
                    required
                />

                <label htmlFor="URL">URL:</label>
                <input
                    type="text"
                    id="URL"
                    onChange={(e) => setNewURL(e.target.value)}
                    value={newUrl}
                    required
                />

                <button>Add Link</button>


    </form> : null
    
}




</> : 
<>
<h1> Welcome to this LinkTree clone! Please Sign In or Register</h1>
<a href='/login'><button>Sign In</button></a>
<a href='/register'><button>Register</button></a>

</>






}




</>
  ) 
}

export default MainPage