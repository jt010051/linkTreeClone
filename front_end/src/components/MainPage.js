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
  const [username, setUsername] = useState('jt0100')
  const [loggedIn, setLoggedIn] = useState(false);
const url=`api/links/get/${username}/links`;

    const [userLinks, setUserLinks] =useState([])
    const [linkName, setLinkName] =useState('')
    const [newUrl, setNewURL] =useState('')

    const [errMsg, setErrMsg] = useState('');
    const refresh = {headers :{
      'Content-Type' : 'application/json',
      AUTHORIZATION : 'Bearer ' +localStorage.getItem("Refresh Token")
      
          }}
          const checkLoggedIn = async (e) => {
      
      try{
         
          const response = await axios.get(CHECK_LOGIN_URL, refresh);
          console.log(response);
          setLoggedIn(true);
          if(localStorage.getItem("username") === null){
            setUsername("jt0100");

          }else{
            setUsername(localStorage.getItem("username"))
          }

      }catch (err) {
          
      }
          }
          const fetchLinks = () =>{

    
            axios.get(url).then(res=>{
              setUserLinks(res.data)
    console.log(res.data);
            })
            .catch(function(error) {
              console.log(error);
            });
        };
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



</>
  )
}

export default MainPage