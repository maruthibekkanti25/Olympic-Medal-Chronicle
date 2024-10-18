import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../styles/EventManagerDashboard.css';
import EventManagerHeader from '../components/EventManagerHeader';
import PrevilegeLeaderBoard from '../components/PrevilageLeaderboard';
import AddCountry from '../components/AddCountry';
const DashboardContainer = styled.div`
  text-align: center;
  padding-top: 50px;
  min-height: 100vh;
  background: linear-gradient(to right, #1c92d2, #f2fcfe);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
`;

const WelcomeMessage = styled.h1`
  font-size: 36px;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: bold;
`;

const InfoMessage = styled.p`
  font-size: 20px;
  color: #34495e;
  margin-bottom: 15px;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 50px;
  right: 50px;
  padding: 12px 30px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c0392b;
    box-shadow: 0 8px 15px rgba(231, 76, 60, 0.3);
    transform: scale(1.05);
  }
`;

const SectionWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomSelect = styled.select`
  padding: 12px 15px;
  border: 2px solid #2c3e50;
  border-radius: 8px;
  background-color: white;
  color: #34495e;
  font-size: 16px;
  appearance: none;
  cursor: pointer;
  position: relative;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e74c3c;
  }

  &:hover {
    border-color: #c0392b;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 15px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #34495e;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

const EventManagerDashboard = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventManagerData = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/countries', {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage('Failed to fetch event manager data');
      }
    };
    fetchEventManagerData();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:8080/countries');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('managerToken');
    navigate('/');
  };

  return (
    <>
      <EventManagerHeader />
      <DashboardContainer>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        <InfoMessage>{message || 'Welcome to the dashboard!'}</InfoMessage>
        <SectionWrapper>
          <AddCountry fetchCountries={fetchCountries} />
          <PrevilegeLeaderBoard />
        </SectionWrapper>
      </DashboardContainer>
    </>
  );
};

export default EventManagerDashboard;
