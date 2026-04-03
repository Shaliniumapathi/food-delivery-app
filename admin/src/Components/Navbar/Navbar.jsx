import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo-4.png'
import profile from '../../assets/profile.jpg'

function Navbar() {
  return (
    <div className='navbar'>
      <img className='logo' src={logo} alt=""/>
      <img className='profile' src={profile} alt=""/>
    </div>
  )
}

export default Navbar