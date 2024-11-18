import React from 'react'
import Logo from "../../Assets/logo.jpg"
import { Link } from "react-router-dom";

//import { signOut } from 'firebase/auth';
//import { database } from './FirebaseConfig';
import { useNavigate } from 'react-router-dom'
const Navbar = () => {


  const history = useNavigate();
  const handleClick = () => {
    /*signOut(database).then(val => {
        console.log(val, "val");
        history('/')
    })
    */
    history('/register')
  }
  return <nav> <div className="nav-logo-container">
    <img src={Logo} alt="" id='log' />
    <div className='head'>
      <h2 className='loghead'>EmpowerHer</h2>
    </div>
  </div>
    <div className="navbar-links-container">
      <a href='/home'>Home</a>
      <Link to="/about">About</Link>
    
      <button className="primary-button" onClick={handleClick}>Login/Sign Up</button>
    </div>
  </nav>;
};

export default Navbar
