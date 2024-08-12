// LoginModal.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./LoginModal.css"; // Make sure to create a CSS file for styling

const LoginModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="login-modal">
      <div className="login-modal-content">
        <h2>Please Log In</h2>
        <p>You need to log in to view this property.</p>
        <Link to="/login" className="login-link">
          Go to Login
        </Link>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
