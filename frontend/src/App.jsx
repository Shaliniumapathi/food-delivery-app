import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import { Routes, Route } from "react-router-dom";
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Footer from './Components/Footer/Footer';
import Loginpopup from './Components/Loginpopup/Loginpopup';
import OrderHistory from './Components/OrderHistory/OrderHistory';
import Verify from './Components/Verify/Verify';
import Admin from './Pages/Admin/Admin';
import {useState} from 'react'

function App() {
  const [showLogin, setShowLogin] =useState(false)
  return (
    <>
    {showLogin?<Loginpopup setShowLogin={setShowLogin}/>:<></>}
    <div className = 'app'>
     
      <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/order" element={<PlaceOrder/>} />
      <Route path="/myorders" element={<OrderHistory/>} />
      <Route path="/verify" element={<Verify/>} />
      <Route path="/admin" element={<Admin/>} />
    </Routes>
      <Footer/>
      
      
    </div>
    </>
  )
}

export default App