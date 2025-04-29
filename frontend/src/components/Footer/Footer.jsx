import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets.js'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique est temporibus aliquam magnam libero, quod neque dolore delectus ipsam corporis!</p>
                    <div className='footer-social-icons'>
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>Get in Touch</h2>
                    <ul>
                        <li>Phone: +1234567890</li>
                        <li>Email:jahed@ahmed.com</li>
                        <li>Address: 123, ABC Road, XYZ City</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>© 2025 All rights reserved</p>
        </div>
    )
}

export default Footer