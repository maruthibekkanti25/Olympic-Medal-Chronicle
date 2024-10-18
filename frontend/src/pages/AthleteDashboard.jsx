import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../styles/AthleteDashboard.css';

const AthleteDashboard = () => {
  const { id } = useParams();
  const playerName = id;
  const [athlete, setAthlete] = useState(null);

  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/player-medals/${playerName}`);
        console.log(response.data);
        setAthlete(response.data[0]);
      } catch (error) {
        console.error("Error fetching athlete:", error);
      }
    };

    fetchAthlete();
  }, [playerName]);

  if (!athlete) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">{athlete.playerName}</h1>
      <div className="athlete-card">
        <img 
          className="athlete-image"
          src={athlete.flag} 
          alt={athlete._id} 
        />
        <div className="athlete-info">
          <p><strong>Name:</strong> {athlete.playerName}</p>
          <p><strong>Sport:</strong> {athlete.sportname}</p>
          <p><strong>Medal:</strong> {athlete.medal}</p>
        </div>
      </div>
      <Link to="/athletes" className="back-link">Back to Athlete List</Link>
    </div>
  );
};

export default AthleteDashboard;
