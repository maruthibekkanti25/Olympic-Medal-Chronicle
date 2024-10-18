import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginComponent.css';

const LoginComponent = () => {
  const [role, setRole] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    // Logic to handle login can be added here, e.g., authentication API call
    if (role === 'Admin') {
      history.push('/admin-dashboard'); // Navigate to admin dashboard
    } else if (role === 'Event Manager') {
      history.push('/event-manager-dashboard'); // Navigate to event manager dashboard
    }
  };

  return (
    <div className="login-component">
      <h2>Login</h2>
      <div>
        <label>
          <input 
            type="radio" 
            value="Admin" 
            checked={role === 'Admin'} 
            onChange={() => setRole('Admin')} 
          />
          Admin
        </label>
        <label>
          <input 
            type="radio" 
            value="Event Manager" 
            checked={role === 'Event Manager'} 
            onChange={() => setRole('Event Manager')} 
          />
          Event Manager
        </label>
      </div>
      <button onClick={handleLogin} disabled={!role}>
        Login
      </button>
    </div>
  );
};

export default LoginComponent;
