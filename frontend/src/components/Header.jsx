import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../../images/logo.png';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="Olympics Logo" className="logo" />
                <h1 className="title">Olympics 2024</h1>
            </div>
            <div className="right-section">
                <nav className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/overall">Overall</Link>
                    <Link to="/athletes">Athletes</Link>
                    <Link to="/countrywise">Countrywise</Link>
                    <Link to="/sportwise">Sportwise</Link>
                </nav>
                <Link to="/role-selection" className="login-btn">
                    Login
                </Link>
            </div>
        </header>
    );
};

export default Header;
