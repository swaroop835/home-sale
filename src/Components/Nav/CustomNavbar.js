import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CustomNavbar.css';
import logo from '../../logo.png';

function CustomNavbar({ username }) {
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      window.location.href = '/Header';
    }
  };

  return (
    <div className="custom-navbar">
      <div className="navbar-brand">
        <a href="/Header">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <div className="nav-links">
        {location.pathname === '/UserPage' && username ? (
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              {username}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <a href="/profile" className="dropdown-item">Profile</a>
                <a href="/orders" className="dropdown-item">Order</a>
                <button onClick={handleLogout} className="dropdown-item logout-button">Logout</button>
              </div>
            )}
          </div>
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
