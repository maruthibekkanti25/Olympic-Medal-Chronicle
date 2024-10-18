import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EventManagerLogin.css'; // Import the CSS file
import backgroundImage from '../../images/image6.png'; // Add your background image if needed

const EventManagerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/event-manager-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('managerToken', data.token);
        navigate('/eventmanager-dashboard');
      } else {
        console.log('Login failed', data.success);
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div
      className="event-manager-login-container"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Set the background dynamically
    >
      <div className="form-container">
        <h2 className="title">Event Manager Login</h2>
        <form>
          <label htmlFor="username" className="label">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
          <label htmlFor="password" className="label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button type="button" onClick={handleLogin} className="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventManagerLogin;
