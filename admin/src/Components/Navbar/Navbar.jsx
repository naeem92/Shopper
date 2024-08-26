import React from 'react'
import './Navbar.css'
import nav_logo from '../../assets/nav-logo.svg'
import nav_Profile from '../../assets/nav-profile.jpg'


const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={nav_logo} alt="" className="nav-logo" />
      <img src={nav_Profile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar
