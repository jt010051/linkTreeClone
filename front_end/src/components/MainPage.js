import React, {useEffect, useState} from 'react'
import axios from '../api/axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

const newLinkUrl = "api/links/newLink";

function MainPage() {
  const [username, setUsername] = ('')
const url=`api/links/get/jt0100/links`;

    const [userLinks, setUserLinks] =useState([])
    const [linkName, setLinkName] =useState('')
    const [newUrl, setNewURL] =useState('')

    const [errMsg, setErrMsg] = useState('');

    const fetchLinks = () =>{

    
        axios.get(url).then(res=>{
          setUserLinks(res.data)

        })
        .catch(function(error) {
          console.log(error);
        });
    };

    useEffect(()=>{
        fetchLinks();
      
           
      },[]);


const displayLinks = userLinks.map((link)=>{
return (
  <>
  
    <tbody>
    <tr>
      <td>
        <a href={`https://` +link.url}>
        {link.name}
        </a>
      </td>
    </tr>
  </tbody>
  </>
)
});
const json = `{"name":"${linkName}", "url":"${newUrl}"}`;
const obj = JSON.parse(json);

const handleSubmit = async(e)=>{
  e.preventDefault();

  const postLink = newLinkUrl  +obj;
  try {
    const response = await axios.post(postLink);
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


<h1>Add New Link</h1>


{displayLinks}

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

                <label htmlFor="url">URL:</label>
                <input
                    type="text"
                    id="url"
                    onChange={(e) => setNewURL(e.target.value)}
                    value={newUrl}
                    required
                />

                <button>Add Link</button>


    </form>
<div>

</div>


</>
  )
}

export default MainPage