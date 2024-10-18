import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Sportwise.css';

const Sportwise = () => {
  const [sportwiseData, setSportwiseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSportwiseData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/countries');
        setSportwiseData(response.data);
      } catch (error) {
        console.error('Error fetching sportwise data:', error);
      } finally {
        setLoading(false); 
      }
    };
    fetchSportwiseData();
  }, []);
  const groupBySport = (data) => {
    return data.reduce((acc, curr) => {
      const sport = curr.sportName;
      if (!acc[sport]) {
        acc[sport] = []; 
      }
      acc[sport].push(curr);
      return acc;
    }, {});
  };
  const groupedData = groupBySport(sportwiseData);
  const filteredSports = Object.keys(groupedData).filter((sport) =>
    sport.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sportwise-container">
      <h1>Sportwise Medal Winners</h1>
      <input
        type="text"
        placeholder="Search by sport name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-box"
      />
      {loading ? (
        <p>Loading data...</p> 
      ) : Object.keys(groupedData).length === 0 ? (
        <p>No data available</p>
      ) : filteredSports.length === 0 ? (
        <p>No results found for "{searchQuery}"</p>
      ) : (
        filteredSports.map((sport) => (
          <div key={sport} className="sport-card">
            <h2>{sport}</h2>
            <ul className="player-list">
              {groupedData[sport].length > 0 ? (
                groupedData[sport].map((player) => (
                  <li key={player.playerName}>
                    <img src={player.flag} alt={`${player.country} flag`} className="player-flag" />
                    <span className="player-name">{player.playerName}</span>
                    <span className="player-medal">{player.medal}</span>
                  </li>
                ))
              ) : (
                <li>No players available for {sport}</li>
              )}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Sportwise;
