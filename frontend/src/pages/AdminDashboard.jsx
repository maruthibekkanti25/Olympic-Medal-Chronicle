import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import PrevilegeLeaderBoard from '../components/PrevilageLeaderboard';
import AddCountry from '../components/AddCountry';
const DashboardContainer = styled.div`
  background: linear-gradient(to right, #1c92d2, #f2fcfe);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Roboto', sans-serif;
  position: relative;
`;

const Header = styled.div`
  width: 100%; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  background-color: black;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  position: relative; 
  box-sizing: border-box; 
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled.button`
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  background-color:#FF7F50;
  cursor: pointer;
  margin-right: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: lightgray;
  }
`;

const LogoutButton = styled.button`
  background-color: #e53e3e;
  color: #fff;
  padding: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size:16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c53030;
  }
`;

const WelcomeMessage = styled.h1`
  font-size: 32px;
  color: #3f51b5;
  margin-bottom: 30px;
  font-weight: bold;
`;

const InfoMessage = styled.p`
  font-size: 22px;
  color: #333;
  margin-bottom: 15px;
  font-weight: bold;
  text-align: center;
`;

const FormContainer = styled.div`
  background: linear-gradient(135deg, #439e52, #ce5050);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  width: 80%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Input = styled.input`
  width: 90%;
  padding: 12px;
  margin: 15px 0;
  font-size: 18px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: #6a11cb;
    box-shadow: 0 4px 12px rgba(106, 17, 203, 0.3);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 14px 30px;
  background-color: ${(props) => (props.$primary ? '#5a67d8' : '#f56565')};
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  margin-left: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: inline-block;

  &:hover {
    background-color: ${(props) => (props.$primary ? '#4c51bf' : '#e53e3e')};
    transform: scale(1.05);
  }
`;

const SaveButton = styled(Button)`
  background-color: #48bb78;
  margin-top: 15px;
  &:hover {
    background-color: #38a169;
  }
`;

const DeleteButton = styled(Button)`
 background-color: #e53e3e;
  &:hover {
    background-color: #c53030;
  }
`;

const AdminList = styled.ul`
  list-style-type: none;
  padding: 0px;
  margin-top: 30px;
  width: 100%;
  max-width:1200px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AdminItem = styled.li`
  padding: 30px;
  font-size: 22px;
  color: #333;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  span {
    font-weight: 500;
  }
`;

const EventManagerList = styled(AdminList)``;

const EventManagerItem = styled(AdminItem)``;

const LeaderboardList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`;
const AddAdminButton = styled(Button)`
  background-color: #34c759;
  color: #fff;
  padding:15px;
  margin-left:85px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2ecc71;
  }
`;
const LeaderboardItem = styled.li`
  background-color: #fff;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({ _id: '', username: '', password: '' });

  // Change event managers state and handling
  const [eventManagers, setEventManagers] = useState([]);
  const [isEditingEventManager, setIsEditingEventManager] = useState(false);
  const [showEventManagerForm, setShowEventManagerForm] = useState(false);
  const [currentEventManager, setCurrentEventManager] = useState({ _id: '', username: '', password: '' }); 

  // Leaderboard state and handling
  const [leaderboards, setLeaderboards] = useState([]);
  const [isEditingLeaderboard, setIsEditingLeaderboard] = useState(false);
  const [showLeaderboardForm, setShowLeaderboardForm] = useState(false);
  const [currentLeaderboard, setCurrentLeaderboard] = useState({ _id: '', countryName: '', countryFlagUrl: '', sportName: '', playerName: '', medals: '' });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/admins')
      .then((res) => {
        console.log('Fetched admins:', res.data);
        setAdmins(res.data);
      })
      .catch((err) => console.log('Error fetching admins:', err));

    axios
      .get('http://localhost:8080/event-managers')
      .then((res) => {
        console.log('Fetched event managers:', res.data);
        setEventManagers(res.data);
      })
      .catch((err) => console.log('Error fetching event managers:', err));

    axios
      .get('http://localhost:8080/leaderboards')
      .then((res) => {
        console.log('Fetched leaderboards:', res.data);
        setLeaderboards(res.data);
      })
      .catch((err) => console.log('Error fetching leaderboards:', err));
  }, [showForm, showEventManagerForm, showLeaderboardForm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAdmin({ ...currentAdmin, [name]: value });
  };
  const handleEventManagerInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEventManager({ ...currentEventManager, [name]: value });
  };

  const handleLeaderboardInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentLeaderboard({ ...currentLeaderboard, [name]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('adminToken'); 
    // console.log(token);
  
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/admins/${currentAdmin._id}`,currentAdmin, 
          {
            headers: {
              Authorization : `Bearer ${ token}`
            }
          }
        );
  
        // Update the local state with the edited admin
        setAdmins(admins.map((admin) => (admin._id === currentAdmin._id ? currentAdmin : admin)));
      } else {
        const response = await axios.post('http://localhost:8080/admins', 
          currentAdmin, 
          {
            headers: {
              Authorization: `Bearer ${token}`, // Same for the post request
            }
          }
        );
        if (response.data.success) {
          setAdmins([...admins, response.data]);
      } else {
          console.error('Failed to delete admin:', response.data.message);
      }
        
        
      }
  
      // Reset the form
      setCurrentAdmin({ username: '', password: '' });
      setIsEditing(false);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving admin:', error);
    }
  };
  

  const handleSaveEventManager = async () => {
    const token = localStorage.getItem('adminToken'); 
    try {
      if (isEditingEventManager) {
       const response = await axios.put(`http://localhost:8080/event-managers/${currentEventManager._id}`, currentEventManager, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
        data: { username: currentEventManager.username }, 
    });
    if(response.data.success) {
      setEventManagers(eventManagers.map((manager) => (manager._id === currentEventManager._id ? currentEventManager : manager)));
    }
    else {
      console.error('Failed to add event manager:', response.data.message);
    }
        
      } else {
        const response = await axios.post('http://localhost:8080/event-managers', currentEventManager, {
          headers: {
              Authorization: `Bearer ${token}`, 
          },
          
          data: { username: currentEventManager.username }, 
      });
      if(response.data.success) {
        setEventManagers([...eventManagers, response.data]);
      }
      else {
        console.log("Failed to update event manager", response.data.error);
      }
        
      }
      setCurrentEventManager({ username: '', password: '', role: 'eventmanager' });
      setIsEditingEventManager(false);
      setShowEventManagerForm(false);
    } catch (error) {
      console.error('Error saving event manager:', error);
    }
  };

  const handleSaveLeaderboard = () => {
    if (isEditingLeaderboard && currentLeaderboard._id) {
      axios
        .put(`http://localhost:8080/leaderboards /${currentLeaderboard._id}`, currentLeaderboard)
        .then((res) => {
          setLeaderboards(leaderboards.map((leaderboard) => (leaderboard._id === currentLeaderboard._id ? res.data : leaderboard)));
          setIsEditingLeaderboard(false);
          setCurrentLeaderboard({ _id: '', countryName: '', countryFlagUrl: '', sportName: '', playerName: '', medals: '' });
        })
        .catch((err) => console.log('Error updating leaderboard:', err.response.data));
    } else {
      axios
        .post('http://localhost:8080/leaderboards', currentLeaderboard)
        .then((res) => {
          setLeaderboards([...leaderboards, res.data]);
          setCurrentLeaderboard({ _id: '', countryName: '', countryFlagUrl: '', sportName: '', playerName: '', medals: '' });
        })
        .catch((err) => console.log('Error adding leaderboard:', err.response.data));
    }
    setShowLeaderboardForm(false);
  };

  const handleEdit = (admin) => {
    console.log(admin);
    setCurrentAdmin(admin);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleEditEventManager = (eventManager) => {
    console.log(eventManager);
    setCurrentEventManager(eventManager);
    setIsEditingEventManager(true);
    setShowEventManagerForm(true);
  };

  const handleEditLeaderboard = (leaderboard) => {
    console.log(leaderboard);
    setCurrentLeaderboard(leaderboard);
    setIsEditingLeaderboard(true);
    setShowLeaderboardForm(true);
  };

  const handleDelete = async (admin) => {
    try {
        const token = localStorage.getItem('adminToken'); 
        // console.log('Token:', token);

        const response = await axios.delete(`http://localhost:8080/admins/${admin._id}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            data: { username: admin.username }, 
        });

        if (response.data.success) {
            setAdmins(admins.filter((a) => a._id !== admin._id));
        } else {
            console.error('Failed to delete admin:', response.data.message);
        }
    } catch (error) {
        console.error('Error deleting admin:', error);
    }
};

const handleDeleteEventManager = async (manager) => {
  const token = localStorage.getItem('adminToken'); 

 try {
    constresponse = await axios.delete(`http://localhost:8080/event-managers/${manager._id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      data: { username: manager.username }, 
    });

    if (response.data.success) {
      setEventManagers(eventManagers.filter((m) => m._id !== manager._id));
    } else {
      console.error('Failed to delete event manager:', response.data.message);
    }
  } catch (error) {
    console.error('Error deleting event manager:', error); // Updated error message
  }
};

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const [activeTab, setActiveTab] = useState('leaderboards');

  return (
    <DashboardContainer>
      <Header>
        <NavLinks>
          <NavLink onClick={() => setActiveTab('admins')}>Manage Admins</NavLink>
          <NavLink onClick={() => setActiveTab('eventManagers')}>Manage Event Managers</NavLink>
          <NavLink onClick={() => setActiveTab('leaderboards')}>Manage Leaderboard</NavLink>
        </NavLinks>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      <WelcomeMessage>Admin Dashboard</WelcomeMessage>
      {activeTab === 'admins' && (
        <div>
          <InfoMessage>Manage Admins:</InfoMessage>
          <AddAdminButton onClick={() => {
      setShowForm(true);
      setIsEditing(false);
      setCurrentAdmin({ _id: '', username: '', password: '' }); // Clear form for new entry
    }}>Add New Admin</AddAdminButton>
          {showForm && (
            <FormContainer>
              <Input
                type="text"
                name="username"
                value={currentAdmin.username}
                placeholder="Username"
                onChange={handleInputChange}
              />
              <Input
                type="password"
                name="password"
                value={currentAdmin.password}
                placeholder="Password"
                onChange={handleInputChange}
              />
              <SaveButton onClick={handleSave}>{isEditing ? 'Update Admin' : 'Save Admin'}</SaveButton>
            </FormContainer>
          )}
          <AdminList>
            {admins.map((admin) => (
              <AdminItem key={admin._id}>
                <span>{admin.username}</span>
                <div>
                  <Button onClick={() => handleEdit(admin)}>Edit</Button>
                  <DeleteButton onClick={() => handleDelete(admin)}>Delete</DeleteButton>
                </div>
              </AdminItem>
            ))}
          </AdminList>
        </div>
      )}
      {activeTab === 'eventManagers' && (
        <div>
          <InfoMessage>Manage Event Managers:</InfoMessage>
          <AddAdminButton $primary onClick={() => {
            setShowEventManagerForm(true);
            setIsEditingEventManager(false);
            setCurrentEventManager({ _id: '', username: '', password: '' }); 
          }}>Add New Event Manager</AddAdminButton>
          {showEventManagerForm && (
            <FormContainer>
              <Input
                type="text"
                name="username"
                value={currentEventManager.username} 
                placeholder="Username"
                onChange={handleEventManagerInputChange}
              />
              <Input
                type="password" 
                name="password"
                value={currentEventManager.password}
                placeholder="Password"
                onChange={handleEventManagerInputChange}
              />
              <SaveButton onClick={handleSaveEventManager}>{isEditingEventManager ? 'Update Event Manager' : 'Save Event Manager'}</SaveButton>
            </FormContainer>
          )}
          <EventManagerList>
            {eventManagers.map((eventManager) => (
              <EventManagerItem key={eventManager._id}>
                <span>{eventManager.username}</span> 
                <div>
                  <Button onClick={() => handleEditEventManager(eventManager)}>Edit</Button>
                  <DeleteButton onClick={() => handleDeleteEventManager(eventManager)}>Delete</DeleteButton>
                </div>
              </EventManagerItem>
            ))}
          </EventManagerList>
        </div>
      )}
      {activeTab === 'leaderboards' && (
        <div>
          <InfoMessage>Manage Leaderboard:</InfoMessage>
          <AddCountry />
          <LeaderboardList>
            {leaderboards.map((leaderboard) => (
              <LeaderboardItem key={leaderboard._id}>
                <span>{leaderboard.countryName}</span>
                <div>
                  <Button onClick={() => handleEditLeaderboard(leaderboard)}>Edit</Button>
                  <DeleteButton onClick={() => handleEditLeaderboard(leaderboard._id)}>Delete</DeleteButton>
                </div>
              </LeaderboardItem>
            ))}
          </LeaderboardList>
          <PrevilegeLeaderBoard/>
        </div>
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard;