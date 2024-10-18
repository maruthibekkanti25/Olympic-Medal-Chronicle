import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Countrywise.css'; // Update the import statement

const Countrywise = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCountriesData = async () => {
    setLoading(true); // Set loading before the fetch
    try {
      const response = await axios.get('http://localhost:8080/countries'); // API endpoint
      console.log('Fetched Countries Data:', response.data); // Log fetched data
      setCountriesData(response.data); // Update state with fetched data
      setLoading(false);
    } catch (err) {
      console.error('Error fetching countries data:', err);
      setError('Failed to load countries data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountriesData(); // Fetch data on component mount
  }, []);

  const filteredCountries = countriesData.filter(country => 
    country.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading-status">Loading countries data...</div>;
  }

  if (error) {
    return <div className="error-alert">{error}</div>;
  }

  return (
    <div className="custom-leaderboard-container">
      <h1 className="leaderboard-heading">Country-wise Leaderboard</h1>

      <input 
        type="text" 
        placeholder="Search by country name" 
        className="country-search-input" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />

      {filteredCountries.length > 0 ? (
        <div className="custom-leaderboard-table">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Flag</th>
                <th>Sport</th>
                <th>Player</th>
                <th>Medal</th>
              </tr>
            </thead>
            <tbody>
              {filteredCountries.map((country) => (
                <tr key={country._id}>
                  <td>{country.country}</td>
                  <td>
                    <img src={country.flag} alt={`${country.country} flag`} className="country-flag-image" />
                  </td>
                  <td>{country.sportName}</td>
                  <td>{country.playerName}</td>
                  <td>{country.medal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-data-alert">No data found for countries.</div>
      )}
    </div>
  );
};

export default Countrywise;
