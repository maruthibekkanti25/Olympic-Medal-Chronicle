import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Overall.css';

const Overall = () => {
  const [medalsData, setMedalsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMedalsData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/overall-medals');
        setMedalsData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching the overall medals data:', err);
        setError('Failed to load data.');
        setLoading(false);
      }
    };

    fetchMedalsData();

  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = medalsData.filter(country => 
    country.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading-container">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="leaderboard-container">
      <h1>Overall Medals Leaderboard</h1>
      <input 
        type="text" 
        placeholder="Search by country..." 
        value={searchTerm} 
        onChange={handleSearchChange} 
        className="search-input"
      />
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Flag</th>
            <th>Gold</th>
            <th>Silver</th>
            <th>Bronze</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((country) => (
            <tr key={country.country}>
              <td>{country.country}</td>
              <td>
                <img src={country.flag} alt={`${country.country} Flag`} className="country-flag" />
              </td>
              <td>{country.gold}</td>
              <td>{country.silver}</td>
              <td>{country.bronze}</td>
              < td>{country.totalMedals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Overall;