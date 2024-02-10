import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<Navigate replace to="/signup" />}
        />
        <Route
          path="/profile"
          element={
            localStorage.getItem('userToken') ? (
              <Profile />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
