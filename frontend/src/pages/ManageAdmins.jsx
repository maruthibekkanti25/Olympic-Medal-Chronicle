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

const AdminList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`;

const AdminItem = styled.li`
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

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({ _id: '', username: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/admins')
      .then((res) => {
        console.log('Fetched admins:', res.data);
        setAdmins(res.data);
      })
      .catch((err) => console.log('Error fetching admins:', err));
  }, [showForm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAdmin({ ...currentAdmin, [name]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/admins/${currentAdmin._id}`, currentAdmin, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmins(admins.map((admin) => (admin._id === currentAdmin._id ? currentAdmin : admin)));
      } else {
        const response = await axios.post('http://localhost:8080/admins', currentAdmin, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setAdmins([...admins, response.data]);
        } else {
          console.error('Failed to add admin:', response.data.message);
        }
      }
      setCurrentAdmin({ username: '', password: '' });
      setIsEditing(false);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving admin:', error);
    }
  };

  const handleEdit = (admin) => {
    setCurrentAdmin(admin);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (admin) => {
    const token = localStorage.getItem('adminToken');
    try {
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

  return (
    <div>
      <h1>Manage Admins</h1>
      <Button $primary onClick={() => {
        setShowForm(true);
        setIsEditing(false);
        setCurrentAdmin({ _id: '', username: '', password: '' });
      }}>Add New Admin</Button>
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
  );
};

export default ManageAdmins;