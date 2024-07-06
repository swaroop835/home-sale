import React from 'react';
import { useLocation } from 'react-router-dom';
import './CustomNavbar.css';
import logo from '../../logo.png';

function CustomNavbar({ username }) {
  const location = useLocation();

  return (
    <div className="custom-navbar">
      <div className="navbar-brand">
        <a href="/Header">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <div className="nav-links">
        {location.pathname === '/UserPage' && username ? (
          <a href="/profile" className="nav-link">{username}</a>
        ) : (
          location.pathname === '/Header' && (
            <a href="/login" className="nav-link">Login</a>
          )
        )}
      </div>
    </div>
  );
}

export default CustomNavbar;
