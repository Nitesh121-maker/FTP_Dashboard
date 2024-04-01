import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "../css/Nav.css";

const Nav = ({ onLogout }) => {
  const [sessionTimer, setSessionTimer] = useState(15 * 60); // Initial session time in seconds
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear session data
    sessionStorage.removeItem('clientid');
  
    // Send logout request to the backend
    axios.post('http://192.168.1.10:3004/client-logout')
      .then(() => {
        // Navigate to the client login page
        navigate('/client-login');
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };
  // UseEffect to update the session timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  // UseEffect to check if the session timer has reached 0
  useEffect(() => {
    if (sessionTimer === 0) {
      handleLogout();
    }
  }, [sessionTimer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };



  return (
    <div className="nav">
      <nav>
        <h1>Tradeimex</h1>
        <div className="session-timer">Session: {formatTime(sessionTimer)}</div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Nav;
