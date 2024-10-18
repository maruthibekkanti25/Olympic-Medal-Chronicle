import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AthleteList.css';
import { Link } from 'react-router-dom';

const defaultMaleImage = "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png"; 
const defaultFemaleImage = "https://th.bing.com/th/id/OIP.biucXG1ppw3IkB5FC8hEYQAAAA?w=225&h=225&rs=1&pid=ImgDetMain"; 

const AthleteList = () => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/players');
        setAthletes(response.data);
      } catch (error) {
        console.error("Error fetching athletes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  if (loading) return <div className="loading">Loading athletes...</div>;

  const filteredAthletes = athletes.filter(athlete =>
    athlete.playerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="athlete-list">
      <h1>Athlete List</h1>
      <input 
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="athlete-container">
        {filteredAthletes.length > 0 ? (
          filteredAthletes.map((athlete) => (
            <div key={athlete.playerName} className="athlete-card">
              <img 
                src={athlete.flag || (athlete.gender === 'female' ? defaultFemaleImage : defaultMaleImage)}
                alt={athlete.playerName}
                className="athlete-image"
              />
              <div className="athlete-details">
                <Link to={`/athletes/${athlete.playerName}`} className="athlete-link">
                  <h2>{athlete.playerName}</h2>
                </Link>
                <p>Sport: <span>{athlete.sportname}</span></p>
                <p>Medal: <span>{athlete.medal}</span></p>
              </div>
            </div>
          ))
        ) : (
          <div>No athletes found</div>
        )}
      </div>
    </div>
  );
};

export default AthleteList;
