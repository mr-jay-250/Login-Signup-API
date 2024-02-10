import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});
  const [newAge, setNewAge] = useState('');
  const [newDob, setNewDob] = useState('');
  const [newContact, setNewContact] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/userDetails', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('User details fetch error:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdateDetails = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/editUserDetails/${user.id}`,
        {
          age: newAge,
          dob: newDob,
          contact: newContact,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div>
      <header>
        <div>
          Welcome, {user.username}
          <nav>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        </div>
      </header>
      <h2>Profile</h2>
      <div>
        <p>Username: {user.username}</p>
        <p>Age: {user.age}</p>
        <p>Date of Birth: {user.dob}</p>
        <p>Contact: {user.contact}</p>
      </div>
      <form>
        <label>New Age:</label>
        <input type="text" value={newAge} onChange={(e) => setNewAge(e.target.value)} />

        <label>New Date of Birth:</label>
        <input type="text" value={newDob} onChange={(e) => setNewDob(e.target.value)} />

        <label>New Contact:</label>
        <input type="text" value={newContact} onChange={(e) => setNewContact(e.target.value)} />

        <button type="button" onClick={handleUpdateDetails}>
          Update Details
        </button>
      </form>
    </div>
  );
};

export default Profile;
