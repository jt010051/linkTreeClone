import React, {useEffect, useState, useContext, useRef} from 'react'
import axios from '../api/axios'
import { booleanContext } from '../Context';
import usePrevious from './usePrevious';
import Popup from 'reactjs-popup';
import { Button, Stack } from 'react-bootstrap';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

const newLinkUrl = "api/links/newLink";
const CHECK_LOGIN_URL = '/api/auth/token/refresh';
const deleteUrl = '/api/links/deleteLink';

function MainPage() {

    const [username, setUsername] = useState('')
    const{isLoggedIn, setIsLoggedIn} =useContext(booleanContext)

    const [deleteLinks, setDeleteLinks] = useState(false)
    const[linkId, setLinkId] = useState(0)
    const[edit, setEdit] = useState(false)

    const[editedUrl, setEditedUrl] = useState('')
    const[editedLink, setEditedLink] = useState('')

    const [userLinks, setUserLinks] =useState([])
    const [linkName, setLinkName] =useState('')
    const [newUrl, setNewURL] =useState('')

    const [errMsg, setErrMsg] = useState('');
    const updateLink   = `api/links/updateLink/${linkId}`


    const refresh = {headers :{
      'Content-Type' : 'application/json',
      AUTHORIZATION : 'Bearer ' +localStorage.getItem("Refresh Token")
      
          }}




const checkLoggedIn = async (e) => {
      
                    try{
                      
                        const response = await axios.get(CHECK_LOGIN_URL, refresh);
                       
                    setUsername(localStorage.getItem("username"))
                      fetchLinks()

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

const displayLinks = userLinks.map((link)=>{
  return (
  <>
  
    <React.Fragment>
<tr>
      <td>
        <a href={`https://` +link.url}>
          <Button>
        {link.name}
        </Button>
        </a>
       
        <Button onClick={() =>{
                  setEdit(true)
                  setLinkId(link.id)
                  setLinkName(link.name)
                  setNewURL(link.url)
        }}>Edit</Button>
        <Button onClick={ () => {
                  setLinkId(link.id)
                  setLinkName(link.name)
                  setNewURL(link.url)
                  

                  setDeleteLinks(true)

        }}>Delete</Button>

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


const handleNewSubmit = async(e)=>{
  e.preventDefault();
                try {
                  console.log(obj);
                  const response = await axios.post(fullLink, obj);
                  console.log(response);
                alert("success")
                setLinkId(0)
                setLinkName('')
                setNewURL('')
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
                  const editJson = `{"name":"${editedLink}", "url":"${editedUrl}"}`; 
                  const objEdit = JSON.parse(editJson);



const editLinks = async(e) =>{
                  console.log(objEdit);

                  try {
                        const response = await axios.put(updateLink, objEdit);
                        console.log(response);
                  alert("Success")
                  window.location.reload(false);
                      }
                      catch (err) {
                        alert(err)
                        console.log(err);
                      }
}







const deleteLink = async(e) =>{

      
        const deleteUrlFull = `${deleteUrl}/${username}`


        const link = { data : {id:linkId, name:linkName, url:newUrl}};
              try {
                       if(deleteLinks){
                        // console.log(deleteJson);

                        console.log(link);

                        const response = await axios.delete(deleteUrlFull, link);
                        setLinkId(0)
                        setLinkName('')
                        setNewURL('')
                        console.log(response);
                        setDeleteLinks(false)
                       }
                      
                          
              }catch(err){
                          alert(err)
                          console.log(err);
                          setDeleteLinks(false)
                          setLinkId(0)
                          setLinkName('')
                          setNewURL('')

              }
}



useEffect(() => {

            checkLoggedIn()
          
}, [])
useEffect(() => {
  deleteLink()
  fetchLinks()
}, [deleteLinks])

useEffect(() => {
 
  fetchLinks()
}, [linkName])

return (
                  <>

                    {username !== "" ? <>
                      <h1> My Links</h1>
                      




                          { localStorage.getItem("Logged In") ? 

                              !edit ? <>
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
                                  {displayLinks}
</tr>
<tr>
  <td>
                                <form onSubmit={handleNewSubmit}>
                                      <label htmlFor="header-search">
                                          <span className="visually-hidden">Add Link</span>
                                      </label>
                                      <label htmlFor="name"> Link Name:</label>
                                              <input
                                                  type="text"
                                                  id="name"
                                                  // ref={userRef}
                                                  autoComplete="off"
                                                  onChange={(e) => {
                                                  setLinkName(e.target.value)
                                                  }
                                                    
                                                    }
                                                  value={linkName}
                                                  required
                                              />

                                              <label htmlFor="URL">URL:</label>
                                              <input
                                                  type="text"
                                                  id="URL"
                                                  onChange={(e) => {
                                                    setNewURL(e.target.value)
                                                  }}
                                                  value={newUrl}
                                                  required
                                              />

                                              <Button onClick={handleNewSubmit}>Add Link</Button>
                                              
                                              

                                  </form>  
                                  </td>
                                 </tr>
                                              </tbody> 
                                              </table>
                                              </div>
                                  </> : <>
                                  <form >
                                    <table>
                                      <tr>
                                        
                                    <label>
                                    New Link Name:
                                    <input type="text" name="linkName"  onChange={(e) => setEditedLink(e.target.value)} placeholder={linkName}/>
                                  </label>
                                  <tr>
                                <tr>

                                  <label>
                                    New Link Url:
                                    <input type="text" name="urlName"  onChange={(e) => setEditedUrl(e.target.value)}placeholder={newUrl}/>

                                  </label>
                                  </tr>
                                  </tr>
                                  <br/>
                          
                                  <Button onClick={() => editLinks()}>Submit</Button>
                                 
                              
                          <Button onClick={() => {
                            setEdit(false)
                            setLinkId(0)
                            setLinkName('')
                            setNewURL('')
                          }}>Cancel</Button>
                          </tr>
                          </table>
                          </form>
                            </>





                          : null
                              
                          }




                    </> : 
                    <>
                          <h1> Welcome to this LinkTree clone! Please Sign In or Register</h1>
                          <Stack direction="horizontal" gap={2}>

                          <a href='/login'><Button  variant="primary">Sign In</Button></a>
                          <a href='/register'><Button   variant="primary">Register</Button></a>
                          <a href='/users'><Button variant="primary">Users Already Registered</Button></a>
                            </Stack>
                    </>

                    }




                  </>
                    ) 
}

export default MainPage