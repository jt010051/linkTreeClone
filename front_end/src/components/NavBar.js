import React, { useEffect, useState }  from 'react'
import Login from './LoginPage'

const NavBar = () => {
    const [showProfile, setShowProfile]=useState(true);

  return (
    <nav className="navbar navbar-expand-lg navbar-text-light bg-dark">

    <a className="navbar-brand" href="/">LinkTree Clone</a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href='/'>Home</a>
        </li>
        <li className="nav-item">
          {/* <a className="nav-link" href='/products'>Products</a> */}
        </li>
        <li className="nav-item">
          {/* <a className="nav-link" href='/about'>About</a> */}
        </li>
      </ul>
      <div className="form-inline my-2 my-lg-0">
        <ul className="navbar-nav mr-auto2">
          <li className="nav-item">
            {/* <Link className="nav-link" to={{
      pathname: "/cart",
      search: "?sort=name",
      hash: "#the-hash",
      state: { fromDashboard: true }
    }}>
           Cart({cart})
            </Link> */}
            </li>
        
     <li className="nav-item">
          
              <a className="nav-link" 
      href= "/login">
          Login
            </a>
        </li>
          <li className="nav-item">
            
             {/* { showRegister ? <a className="nav-link" href='/register'>Register</a> : null } */}
          </li>
          <li className="nav-item">
            
          
              {/* { showLogIn ?   <a className="nav-link" href='login'>Login</a> : null } */}
          </li>
          <li className="nav-item">
            
             { showProfile ?  <a className="nav-link " href= "/profile">Profile</a> : null }
          </li>
          <li className="nav-item">
            
             {/* { showLogOut ?  <a className="nav-link text-danger" href='/logout'>Log Out</a> : null } */}
          </li>
        </ul>
        
      </div>
    </div>
  </nav>  )
}

export default NavBar