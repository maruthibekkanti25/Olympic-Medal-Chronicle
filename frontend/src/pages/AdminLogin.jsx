import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';
import backgroundImage from '../../images/image6.png';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Response:', data); // Log the data received from the server

      if (data.result.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin-dashboard');
      } else {
        console.log('Login failed', data.message);
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div
      className="admin-login-container"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Set the background dynamically
    >
      <div className="form-container">
        <h2 className="title">Admin Login</h2>
        <form>
          <label htmlFor="username" className="label">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
