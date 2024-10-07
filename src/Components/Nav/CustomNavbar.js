import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CustomNavbar.css";
import logo from "../../logo.png";

function CustomNavbar({ username }) {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      window.location.href = "/";
    }
  };


  const handleLogoClick = (event) => {
    event.preventDefault(); 
    navigate(-1); 
  };

  return (
    <div className="custom-navbar">
      <div className="navbar-brand">
        <a href="/Header" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <div className="nav-links">
        {location.pathname === "/UserPage" && username ? (
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              {username}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                
                <a href="/Userorder" className="dropdown-item">
                  Bookings
                </a>
                <button
                  onClick={handleLogout}
                  className="dropdown-item logout-button"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          location.pathname === "/" && (
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
