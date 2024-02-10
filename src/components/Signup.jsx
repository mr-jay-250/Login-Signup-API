import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [contact, setContact] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/signup', {
        username,
        password,
        age,
        dob,
        contact,
      });
      console.log(response.data.message);

      localStorage.setItem('userToken', response.data.token);
      navigate('/profile');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>Age:</label>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />

        <label>Date of Birth:</label>
        <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} />

        <label>Contact:</label>
        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />

        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
