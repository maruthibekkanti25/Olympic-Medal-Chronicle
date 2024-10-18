import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: linear-gradient(to right, #b06ab6, #4568dc);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  color: black;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const SaveButton = styled.button`
  padding: 12px 25px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  margin-left: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4cae4c;
  }
`;

const EventManagerList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`;

const EventManagerItem = styled.li`
  padding: 15px;
  margin: 10px 0;
  font-size: 24px;
  color: black;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  padding: 12px 25px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  margin-left: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #c9302c;
  }
`;

const Button = styled.button`
  padding: 12px 25px;
  background-color : #5cb85c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  margin-left: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4cae4c;
  }
`;

const ManageEventManagers = () => {
  const [eventManagers, setEventManagers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentEventManager, setCurrentEventManager] = useState({ _id: '', username: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/event-managers')
      .then((res) => {
        console.log('Fetched event managers:', res.data);
        setEventManagers(res.data);
      })
      .catch((err) => console.log('Error fetching event managers:', err));
  }, [showForm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEventManager({ ...currentEventManager, [name]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/event-managers/${currentEventManager._id}`, currentEventManager, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEventManagers(eventManagers.map((eventManager) => (eventManager._id === currentEventManager._id ? currentEventManager : eventManager)));
      } else {
        const response = await axios.post('http://localhost:8080/event-managers', currentEventManager, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setEventManagers([...eventManagers, response.data]);
        } else {
          console.error('Failed to add event manager:', response.data.message);
        }
      }
      setCurrentEventManager({ username: '', password: '' });
      setIsEditing(false);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving event manager:', error);
    }
  };

  const handleEdit = (eventManager) => {
    setCurrentEventManager(eventManager);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (eventManager) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await axios.delete(`http://localhost:8080/event-managers/${eventManager._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { username: eventManager.username },
      });
      if (response.data.success) {
        setEventManagers(eventManagers.filter((m) => m._id !== eventManager._id));
      } else {
        console.error('Failed to delete event manager:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting event manager:', error);
    }
  };

  return (
    <div>
      <h1>Manage Event Managers</h1>
      <Button $primary onClick={() => {
        setShowForm(true);
        setIsEditing(false);
        setCurrentEventManager({ _id: '', username: '', password: '' });
      }}>Add New Event Manager</Button>
      {showForm && (
        <FormContainer>
          <Input
            type="text"
            name="username"
            value={currentEventManager.username}
            placeholder="Username"
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            value={currentEventManager.password}
            placeholder="Password"
            onChange={handleInputChange}
          />
          <SaveButton onClick={handleSave}>{isEditing ? 'Update Event Manager' : 'Save Event Manager'}</SaveButton>
        </FormContainer>
      )}
      <EventManagerList>
        {eventManagers.map((eventManager) => (
          <EventManagerItem key={eventManager._id}>
            <span>{eventManager.username}</span>
            <div>
              <Button onClick={() => handleEdit(eventManager)}>Edit</Button>
              <DeleteButton onClick={() => handleDelete(eventManager)}>Delete</DeleteButton>
            </div>
          </EventManagerItem>
        ))}
      </EventManagerList>
    </div>
  );
};

export default ManageEventManagers;