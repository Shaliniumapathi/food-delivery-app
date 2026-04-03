import React from 'react'
import './Navbar.css';
import logo from '/assets/Logo/logo-4.png';
import { Search, ShoppingBasket, Menu } from 'lucide-react';
import {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {StoreContext} from '../../Context/StoreContext.jsx';


function Navbar({setShowLogin}) {
  const [openMenu,setOpenMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menu, setmenu] = useState("home");
  const {getTotalCartAmount, token, logout} = useContext(StoreContext)
  const navigate = useNavigate();
  
  const onLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  }

  return (
    <div className = "navbar">
    <Link to="/"><img src={logo} alt= "logo" className='logo'/></Link>
    <ul className={`navbar-menu ${openMenu ? "active-menu" : ""}`}>
      <Link to='/'  onClick={() => setmenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
      <a href='#explore-menu' onClick={() => setmenu("menu")} className={menu === "menu"  ? "active" : ""}>menu</a>
      <a href='#app-download' onClick={() => setmenu("mobile app")} className={menu === "mobile app"  ? "active" : ""}>mobile app</a>
      <a href='#footer' onClick={() => setmenu("contact us")} className={menu === "contact us"  ? "active" : ""}>contact us</a>
    </ul>
    <div className='navbar-right'>
      < Search/>
      <div className='navbar-search-icon'>
       <Link to="/cart">
          <ShoppingBasket/>
       </Link>
       <div className={getTotalCartAmount()===0?"":"dot"}></div>
      </div>
      {!token ? (
        <button onClick={()=>setShowLogin(true)}>Sign in</button>
      ) : (
        <div className='navbar-profile-dropdown'>
          <button className='profile-btn' onClick={() => setProfileOpen((prev) => !prev)}>
            Profile
          </button>
          {profileOpen && (
            <div className='profile-menu'>
              <button onClick={() => {setProfileOpen(false); navigate('/myorders');}}>Orders</button>
              <button onClick={() => {setProfileOpen(false); navigate('/admin');}}>Admin</button>
              <button onClick={onLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
       <Menu 
          className="mobile-menu-icon"
          onClick={()=>setOpenMenu(!openMenu)}
        />


    </div>
    </div>
  )
}

export default Navbar