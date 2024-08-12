import React from 'react';
import './AboutUsModal.css'; // Add your custom styling

const AboutUsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="aboutmodal-overlay">
      <div className="aboutmodal-content">
        <h2>About Us</h2>
        <p>
          Welcome to our property management system! We are committed to
          providing the best service for property management. Whether you're
          looking to buy, sell, or rent, we're here to help with all your
          property needs.
        </p>
        <p>
          Our platform offers a wide range of properties across various
          locations, ensuring that you find the perfect home or investment.
          Thank you for choosing us as your trusted real estate partner.
        </p>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default AboutUsModal;
