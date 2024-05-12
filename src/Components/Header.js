import React from 'react';
import {Link,useNavigate} from 'react-router-dom';

const Header = () => {
  return (
    <div>
    <header>
      <div className="logo">
        Dream Homes
      </div>
      <nav>
        {/* <a href="#">About Us</a> */}
        <Link to="/Contactus"><a href="#">Contact Us</a></Link>
        <Link to="/login"><a href="#">Login</a></Link>
        <Link to="/Signup"><a href="#">Sign up</a></Link>
        <Link to="/AdminPage"><a href="#">Admin</a></Link>
      </nav>
    </header>

    <section className="hero" style={{ backgroundColor: `var(--primary-color)` }}>
    <img src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="House Rentals" className="hero-image" />
    <div className="hero-text-overlay">
    <h1 style={{ color: `var(--accent-color)` }}>Find Your Dream Home</h1>
      <p>Explore a wide variety of houses for rent in your desired location. We make it easy to find the perfect place for you.</p>
    </div>
  </section>

  <section className="search-bar">
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" className="search-input" placeholder="Enter Location or Keywords" />
        <button type="submit" className="search-button">Search</button>
      </form>
    </section>

  </div>
  );
};



export default Header;
