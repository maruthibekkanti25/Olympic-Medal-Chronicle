import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <h3>About Olympics</h3>
                    <p>
                        The Olympics 2024 aims to bring athletes from all around the world to compete
                        in various sports and foster global unity through sportsmanship.
                    </p>
                </div>
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/overall">Overall</a></li>
                        <li><a href="/athletes">Athletes</a></li>
                        <li><a href="/countrywise">Countrywise</a></li>
                        <li><a href="/sportwise">Sportwise</a></li>
                    </ul>
                </div>
                <div className="footer-section social-media">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        <a href="https://facebook.com" className="social-icon fb"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://twitter.com" className="social-icon twitter"><i className="fab fa-twitter"></i></a>
                        <a href="https://instagram.com" className="social-icon ig"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className="footer-section subscribe">
                    <h3>Newsletter</h3>
                    <form>
                        <input type="email" placeholder="Enter your email" className="subscribe-input" />
                        <button type="submit" className="subscribe-btn">Subscribe</button>
                    </form>
                </div>
            </div>
            <p className="footer-bottom">© 2024 Olympics. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
