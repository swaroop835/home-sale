<<<<<<< HEAD
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./CustomNavbar.css";
import logo from "../../logo.png";
=======
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CustomNavbar.css';
import logo from '../../logo.png';
>>>>>>> 0a62f07448226c919e3e8ed808f4f15268ac5446

function CustomNavbar({ username }) {
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
<<<<<<< HEAD
      window.location.href = "/Header";
=======
      window.location.href = '/Header';
>>>>>>> 0a62f07448226c919e3e8ed808f4f15268ac5446
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
<<<<<<< HEAD
        {location.pathname === "/UserPage" && username ? (
=======
        {location.pathname === '/UserPage' && username ? (
>>>>>>> 0a62f07448226c919e3e8ed808f4f15268ac5446
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              {username}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
<<<<<<< HEAD
                <a href="/profile" className="dropdown-item">
                  Profile
                </a>
                <a href="/Userorder" className="dropdown-item">
                  Order
                </a>
                <button
                  onClick={handleLogout}
                  className="dropdown-item logout-button"
                >
                  Logout
                </button>
=======
                <a href="/profile" className="dropdown-item">Profile</a>
                <a href="/orders" className="dropdown-item">Order</a>
                <button onClick={handleLogout} className="dropdown-item logout-button">Logout</button>
>>>>>>> 0a62f07448226c919e3e8ed808f4f15268ac5446
              </div>
            )}
          </div>
        ) : (
          location.pathname === "/Header" && (
            <a href="/login" className="nav-link">
              Login
            </a>
          )
        )}
      </div>
    </div>
  );
}

export default CustomNavbar;
