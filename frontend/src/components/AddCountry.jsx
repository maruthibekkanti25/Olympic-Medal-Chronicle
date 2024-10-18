import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddCountry.css';

const AddCountry = ({ fetchCountries }) => { 
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        countryName: '',
        flag: '',
        sportName: '',
        playerName: '',
        medal: 'gold'
    });

    const modalRef = useRef(null);

    const toggleFormVisibility = () => {
        setFormVisible(!formVisible);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/medals', {
                country: formData.countryName,
                flag: formData.flag,
                sportName: formData.sportName,
                playerName: formData.playerName,
                medal: formData.medal
            });
            toggleFormVisibility(); // Close the form after submission
            console.log(formData);
            // fetchCountries(); // Fetch countries after adding a new one
            window.location.reload(); 
            // Clear the form data
            setFormData({
                countryName: '',
                flag: '',
                sportName: '',
                playerName: '',
                medal: 'gold'
            });
        } catch (error) {
            console.error('Error adding medal:', error);
        }
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            toggleFormVisibility();
        }
    };

    useEffect(() => {
        if (formVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [formVisible]);

    return (
        <div className="add-country-container">
            <button onClick={toggleFormVisibility} className="addCountrybtn">Add Country</button>
            {formVisible && (
                <div className="modal-overlay">
                    <div className="modal-content" ref={modalRef}>
                        <form onSubmit={handleFormSubmit}>
                            <h3>Add Country</h3>
                            <input
                                type="text"
                                placeholder="Country Name"
                                value={formData.countryName}
                                onChange={(e) => setFormData({ ...formData, countryName: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Flag URL"
                                value={formData.flag}
                                onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Sport Name"
                                value={formData.sportName}
                                onChange={(e) => setFormData({ ...formData, sportName: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Player Name"
                                value={formData.playerName}
                                onChange={(e) => setFormData({ ...formData, playerName: e.target.value })}
                                required
                            />
                            <select
                                value={formData.medal}
                                onChange={(e) => setFormData({ ...formData, medal: e.target.value })}
                            >
                                <option value="gold">Gold</option>
                                <option value="silver">Silver</option>
                                <option value="bronze">Bronze</option>
                            </select>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCountry;
