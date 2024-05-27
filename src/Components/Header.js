import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="logo">
          Dream Homes
        </div>
        <nav className="nav">
          <Link to="/login" className="nav-link">Login</Link>
        </nav>
      </header>

      <section className="hero" style={{ backgroundColor: 'var(--primary-color)' }}>
        <img
          src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="House Rentals"
          className="hero-image"
        />
        <div className="hero-text-overlay">
          <h1 style={{ color: 'var(--accent-color)' }}>Find Your Dream Home</h1>
          <p>Explore a wide variety of houses for rent in your desired location. We make it easy to find the perfect place for you.</p>
          <Link to="/search" className="cta-button">Start Your Search</Link>
        </div>
      </section>

      {/* <section className="search-bar">
        <form onSubmit={(e) => e.preventDefault()} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Enter Location or Keywords"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        </section> */}
      
        <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-container">
          <div className="testimonial-card">
            <p>"Dream Homes helped me find the perfect rental in no time!"</p>
            <p>- Jane Doe</p>
          </div>
          <div className="testimonial-card">
            <p>"Excellent service and beautiful properties to choose from."</p>
            <p>- John Smith</p>
          </div>
        </div>
      </section>
      
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-links">
            <a href="/about-us">About Us</a>
            <a href="/Contactus">Contact Us</a>
            <a href="/careers">Careers</a>
            <a href="/partner">Connect with a Partner</a>
          </div>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-links">
            <a href="/feedback">Feedback</a>
            <a href="/help">Help</a>
            <a href="/terms">Terms & Conditions</a>
            <a href="/privacy">Privacy Statement</a>
            <a href="/cookies">Cookies</a>
            <a href="/accessibility">Accessibility</a>
            <a href="/trademarks">Trademarks</a>
            <a href="/supply-chain">Supply Chain Transparency</a>
            <a href="/newsroom">Newsroom</a>
            <a href="/sitemap">Sitemap</a>
          </div>
          <p>&copy; 2024 Dream Homes, Inc.</p>
        </div>
      </footer>

    </div>
  );
};

export default Header;
