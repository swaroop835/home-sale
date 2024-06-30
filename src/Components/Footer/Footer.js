import React from "react";
import "./Footer.css";
import logo from "../../logo.png";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer">
      <div className="section_padding">
        <div className="sb_footer-links">
        <div className="sb_footer-links_div">
          <h2>Dream Home</h2>
        <p>Our vision is to make all people<br></br>
            the best place to live for them.</p>
        </div>
            
              {/* <div className="footer-icon">
                <BsInstagram />
                <FaFacebook />
                <FaXTwitter />
              </div> */}
          <div className="sb_footer-links_div">
            {/* <h4>Company</h4> */}
            <a href="/employee">
              <p>About Us</p>
            </a>

            <a href="/content2">
              <p>Contact Us</p>
            </a>

            <a href="/employee">
              <p>Help</p>
            </a>
          </div>

          <div className="sb_footer-links_div">
            {/* <h4>Company</h4> */}
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
          </div>
          <hr></hr>

          <div className="sb_footer-copyright">
            <div className="sb_footer-links_div">
              <p>@{new Date().getFullYear()} DreamHome. All right reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
