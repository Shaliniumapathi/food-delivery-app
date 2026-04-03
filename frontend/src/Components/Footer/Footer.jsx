import React from 'react'
import './Footer.css'
import { Facebook, Instagram, Twitter } from 'lucide-react';
import logo from '/public/assets/Logo/logo-white.png';

function Footer() {
  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img className='footer-logo'src={logo} alt="footer"/>
                 <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus facere quo alias atque maiores officia aliquam, itaque excepturi pariatur dolorum.</p>
            <div className="footer-social-icons">
              <Facebook />
              <Instagram />
              <Twitter />

            </div>
            </div>
            <div className="footer-content-center">
                 <h2>Company</h2>
                 <ul>
                  <li>Home</li>
                  <li>About Us</li>
                  <li>Delivery</li>
                  <li>Privacy Policy</li>
                 </ul>

            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                  <li>+912454169812</li>
                  <li>contact@fooddelivery.com</li>
                </ul>
            </div>
            <hr className='hr'/>
        </div>
        <p className='copy-right'>copyright 2026 @foodShalls.com - All rights reserved</p>
    </div>
  )
}

export default Footer
