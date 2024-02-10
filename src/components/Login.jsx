import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory from React Router

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Create a history object from React Router

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });
      console.log(response.data.message);

      localStorage.setItem('userToken', response.data.token);
      navigate.push('/profile'); // Use history.push to navigate to the profile page
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
