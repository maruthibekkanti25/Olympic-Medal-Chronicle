import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RoleSelection.css'; // Import your CSS file
import logo from '../../images/shannu1.jpg';

const RoleSelection = () => {
  const navigate = useNavigate();

  // Set the background image dynamically
  useEffect(() => {
    document.body.style.backgroundImage = `url(${logo})`; // Use template literals
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';

    // Cleanup function to reset the background when the component unmounts
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  const handleAdminLogin = () => {
    navigate('/adminlogin');
  };

  const handleEventManagerLogin = () => {
    navigate('/eventmanagerlogin');
  };

  return (
    <div className="container">
      <h1 className="title">Welcome to the Login Management</h1>
      <p className="description">Select your role to proceed:</p>
      <div className="button-container">
        <button className="role-button" onClick={handleAdminLogin}>Admin</button>
        <button className="role-button" onClick={handleEventManagerLogin}>Event Manager</button>
      </div>
    </div>
  );
};

export default RoleSelection;
