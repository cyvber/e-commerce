import React from 'react';
import './Footer.css';
import facebook from '../../assets/icons/facebook-outline.png'
import instagram from '../../assets/icons/instagram-outline.png'
import whatsapp from '../../assets/icons/whatsapp-outline.png'
import twitter from '../../assets/icons/x-outline.png'


const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-container">
                <div className="footer-top">
                <div className="footer-left">
                    <h1 className="title-logo">ALPHA</h1>
                    <div className="contact">
                        <p className='footer-title'>Contact Information</p>
                        <p>Address: <span>123 Sunset Ave, Toronto, ON, 1M3 B1B</span></p>
                        <p>Email: <span>Alpha@gmail.com</span></p>
                        <p>Phone: <span>+1 (437) 123-4567</span></p>
                    </div>
                    <div className="socials">
                        <p className='footer-title'>Socials</p>
                        <div className="social-icons">
                            <img src={facebook} alt="" />
                            <img src={instagram} alt="" />
                            <img src={whatsapp} alt="" />
                            <img src={twitter} alt="" />
                        </div>
                    </div>
                </div>
                <div className="footer-right">
                    <div className="footer-shop">
                        <h3>Shop</h3>
                        <p>Men</p>
                        <p>Women</p>
                        <p>Featured</p>
                        <p>On Sale</p>
                        <p>New Arrivals</p>
                    </div>

                    <div className="footer-customer">
                        <h3>Customer Service</h3>
                        <p>FAQs</p>
                        <p>Shipping Info</p>
                        <p>Returns</p>
                        <p>Order Tracking</p>
                        <p>Support</p>
                    </div>

                    <div className="footer-about">
                        <h3>About Us</h3>
                        <p>Our Story</p>
                        <p>Careers</p>
                        <p>Sustainability</p>
                        <p>Blog</p>
                    </div>
                </div>
                </div>
                <hr className='mt-2'/>
                <div className="copyright">
                    <p>© 2025, All rights reserved</p>
                    <div className="legals">
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                        <p>Cookies Settings</p>
                    </div>
                </div>
            </div>
            <div className="footer-logo">
                <h1>ALPHA</h1>
            </div>
        </div>
    );
};

export default Footer;
