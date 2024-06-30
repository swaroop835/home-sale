import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../logo.png";
import Card from "./Card";

const Header = () => {
  return (
    <div>
        
        {/* <nav className="nav">
         <div className="logo">
          <a href="/Header">
            <img src={logo} alt="Logo" />
          </a>
        </div> 
          <Link to="/Adminlogin">Admin</Link>
          <Link to="/login">Login</Link>
        </nav> */}
        
         {/*<div className="logo">
          <a href="/Header">
            <img src={logo} alt="Logo" />
          </a>
        </div> */}
      <section className="hero">
        <img
          src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="House Rentals"
          className="hero-image"
        />
        <div className="hero-text-overlay">
          <h1 style={{ color: "var(--accent-color)" }}>Find Your Dream Home</h1>
          <p>
            Explore a wide variety of houses in your desired location. We make
            it easy to find the perfect place for you.
          </p>
        </div>
      </section>
      <br></br><br></br><br></br><br></br>
      <div className="heading-cards">
        <div className="cards-heading">
        <h2>Popular Owner Properties</h2>
        </div>
        <br></br>
      <div className="cards-container">
        <section className="cards-section">
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
      </div>
      <br></br><br></br><br></br><br></br>
      <div className="cards-heading">
        <h2>Exclusive Owner Properties in Thiruvananthapuram</h2>
        </div>
        <br></br>
      <div className="cards-container">
        <section className="cards-section">
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
      </div>
      <br></br><br></br><br></br><br></br>
      <div className="cards-heading">
        <h2>Fresh Properties in Thiruvananthapuram</h2>
        </div>
        <br></br>
      <div className="cards-container">
        <section className="cards-section">
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
      </div>
      <br></br><br></br><br></br><br></br>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Header;
