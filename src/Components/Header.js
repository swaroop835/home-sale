import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Header.css";
import logo from "../logo.png";
import Card from "./Prop/Card";

const Header = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    axios
      .get("http://localhost:8081/properties")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the properties!", error);
      });
  };

  return (
    <div>
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
<br></br><br></br>
<center>
<h2>Popular Properties</h2>
</center>
<br></br>
      <div className="card-container-userpage">
        {properties.map((property) => (
          <Card
            key={property.house_no}
            image={`http://localhost:8081/images/${property.image}`}
            place={property.place}
            price={property.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
