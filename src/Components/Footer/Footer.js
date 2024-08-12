import React, { useState } from "react";
import "./Footer.css";
import AboutUsModal from './AboutUsModal';
import ContactUsModal from './ContactUsModal';
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleAboutClick = () => {
    setShowAboutModal(true);
  };

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const handleHelpClick = () => {
    setShowHelpModal(true);
  };

  const closeModal = () => {
    setShowAboutModal(false);
    setShowContactModal(false);
    setShowHelpModal(false);
  };

  return (
    <div className="footer">
      <div className="section_padding">
        <div className="sb_footer-links">
          <div className="sb_footer-links_div">
            <h2>Dream Home</h2>
            <p>
              Our vision is to make all people<br />
              the best place to live for them.
            </p>
          </div>

          <div className="sb_footer-links_div">
            <p onClick={handleAboutClick} style={{ cursor: 'pointer' }}>About Us</p>
            <p onClick={handleContactClick} style={{ cursor: 'pointer' }}>Contact Us</p>
            <p onClick={handleHelpClick} style={{ cursor: 'pointer' }}>Help</p>
          </div>

          <div className="sb_footer-links_div">
            <a href="/Terms">
              <p>Terms & Condition</p>
            </a>
            <a href="/Policy">
              <p>Policy</p>
            </a>
            <a href="/SalesEnquiry">
              <p>Sales Enquiry</p>
            </a>
          </div>

          <div className="sb_footer-links_div">
            <a href="/FeedbackForm">
              <p>Feedback</p>
            </a>
            <a href="/Feedbacklist">
              <p>Testimonials</p>
            </a>
            <a href="/Adminlogin">
              <p>Admin</p>
            </a>
          </div>
          <hr />

          <div className="sb_footer-copyright">
            <div className="sb_footer-links_div">
              <p>@{new Date().getFullYear()} DreamHome. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Render the About Us, Contact Us, and Help Modals */}
      <AboutUsModal show={showAboutModal} onClose={closeModal} />
      <ContactUsModal isVisible={showContactModal} onClose={closeModal} title="Contact Us" />
      <ContactUsModal isVisible={showHelpModal} onClose={closeModal} title="Help" />
    </div>
  );
};

export default Footer;
