import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/previlageLeaderboard.css';

const PrevilegeLeaderBoard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editMode, setEditMode] = useState({ country: false, sport: false, player: false });
    const [formData, setFormData] = useState({
        countryId: '',
        newCountryName: '',
        oldSportName: '',
        newSportName: '',
        playerId: '',
        newPlayerName: '',
        medalType: 'gold'
    });

    const modalRef = useRef(null);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await axios.get('http://localhost:8080/countries');
            setData(response.data);
            setFilteredData(response.data);
            console.log("filtered Data:");
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(
                (item) =>
                    item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.sportName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.medal.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [searchQuery, data]);

    const openModal = (type, item) => {
        setEditMode({ country: false, sport: false, player: false, [type]: true });
        console.log("Item in openModal: " + item);
        if (type === 'country') {
            setFormData({
                ...formData,
                countryId: item._id,
                newCountryName: item.country
            });
        } else if (type === 'sport') {
            setFormData({
                ...formData,
                countryId: item._id,
                oldSportName: item.sportName,
                newSportName: item.sportName
            });
        } else if (type === 'player') {
            setFormData({
                ...formData,
                playerId: item.player_id, // <--- This should be correct
                newPlayerName: item.playerName,
                medalType: item.medal
            });
        }
    };
    

    const closeModal = () => {
        setEditMode({ country: false, sport: false, player: false });
    };

    const handleEditCountry = async (countryId, newCountryName) => {
        try {
            await axios.put(`http://localhost:8080/medals-country/${countryId}`, { newCountryName });
            fetchCountries();
            closeModal();
        } catch (error) {
            console.error('Error updating country:', error);
        }
    };

    const handleEditSport = async (countryId, oldSportName, newSportName) => {
        try {
            await axios.put(`http://localhost:8080/medals-sport/${countryId}`, { oldSportName, newSportName });
            fetchCountries();
            closeModal();
        } catch (error) {
            console.error('Error updating sport:', error);
        }
    };

    const handleEditPlayer = async (playerId, newPlayerName, medalType) => {
        console.log("handleEditPlayer: "+ playerId);
        try {
            await axios.put(`http://localhost:8080/medals-player/${playerId}`, { playerName: newPlayerName, medalType });
            fetchCountries();
            closeModal();
        } catch (error) {
            console.error('Error updating player:', error);
        }
    };

    const handleDeleteCountry = async (countryId) => {
        console.log("handleDeleteCountry: "+countryId);
        try {
            await axios.delete(`http://localhost:8080/medals-country/${countryId}`);
            fetchCountries();
        } catch (error) {
            console.error('Error deleting country:', error);
        }
    };

    const handleDeleteSport = async (countryId, sportName) => {
        console.log("handleDeleteSport: "+countryId);
        try {
            await axios.delete(`http://localhost:8080/medals-sport/${countryId}/${sportName}`);
            fetchCountries();
        } catch (error) {
            console.error('Error deleting sport:', error);
        }
    };

    const handleDeletePlayer = async (playerId) => {
        console.log("handleDeletePlayer: "+playerId);
        try {
            await axios.delete(`http://localhost:8080/medals-player/${playerId}`);
            fetchCountries();
        } catch (error) {
            console.error('Error deleting player:', error);
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (editMode.country) {
            handleEditCountry(formData.countryId, formData.newCountryName);
        } else if (editMode.sport) {
            handleEditSport(formData.countryId, formData.oldSportName, formData.newSportName);
        } else if (editMode.player) {
            handleEditPlayer(formData.playerId, formData.newPlayerName, formData.medalType);
        }
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        if (editMode.country || editMode.sport || editMode.player) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [editMode]);

    return (
        <div className="leaderboard-container-modified">
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-modified"
            />

            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Sport</th>
                        <th>Player</th>
                        <th>Medal</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        
                        <tr key={`${item._id}-${item.playerName}`}>
                            <td>{item.country}</td>
                            <td>{item.sportName}</td>
                            <td>{item.playerName}</td>
                            <td>{item.medal}</td>
                            {/* <td>{item.player_id}</td> */}
                            <td>
                                <button onClick={() => openModal('country', item)} className="editbtn-modified">
                                    Edit Country
                                </button>
                                <button onClick={() => openModal('sport', item)} className="editbtn-modified">
                                    Edit Sport
                                </button>
                                <button onClick={() => openModal('player', item)} className="editbtn-modified">
                                    Edit Player
                                </button>
                                <button onClick={() => handleDeleteCountry(item._id)} className="deletebtn-modified">
                                    Delete Country
                                </button>
                                <button onClick={() => handleDeleteSport(item._id, item.sportName)} className="deletebtn-modified">
                                    Delete Sport
                                </button>
                                <button onClick={() => handleDeletePlayer(item.player_id)} className="deletebtn-modified">
                                    Delete Player
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            {(editMode.country || editMode.sport || editMode.player) && (
                <div className="modal-overlay-modified">
                    <div className="modal-content-modified" ref={modalRef}>
                        <form onSubmit={handleFormSubmit}>
                            {editMode.country && (
                                <>
                                    <h3>Edit Country</h3>
                                    <input
                                        type="text"
                                        placeholder="New Country Name"
                                        value={formData.newCountryName}
                                        onChange={(e) => setFormData({ ...formData, newCountryName: e.target.value })}
                                    />
                                </>
                            )}
                            {editMode.sport && (
                                <>
                                    <h3>Edit Sport</h3>
                                    <input
                                        type="text"
                                        placeholder="New Sport Name"
                                        value={formData.newSportName}
                                        onChange={(e) => setFormData({ ...formData, newSportName: e.target.value })}
                                    />
                                </>
                            )}
                            {editMode.player && (
                                <>
                                    <h3>Edit Player</h3>
                                    <input
                                        type="text"
                                        placeholder="New Player Name"
                                        value={formData.newPlayerName}
                                        onChange={(e) => setFormData({ ...formData, newPlayerName: e.target.value })}
                                    />
                                    <select
                                        value={formData.medalType}
                                        onChange={(e) => setFormData({ ...formData, medalType: e.target.value })}
                                    >
                                        <option value="gold">Gold</option>
                                        <option value="silver">Silver</option>
                                        <option value="bronze">Bronze</option>
                                    </select>
                                </>
                            )}
                            <button type="submit" className="submit-btn-modified">Submit</button>
                            <button type="button" className="cancel-btn-modified" onClick={closeModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrevilegeLeaderBoard;
