import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Header.css";
import logo from "../logo.png";
import Card from "./Prop/Card";
import house1 from "../backgroundimg/imageshouse.jpg";
 
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
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the properties!", error);
      });
  };
 
  return (
    <div>
      <section className="hero">
        <img
          src={house1}
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
      <br></br>
      <br></br>
      <div className="card-container-userpage">
        {properties.map((property) => (
          <Card
            key={property.house_no}
            image={`http://localhost:8081/images/${property.image1}`}
            place={property.place}
            price={property.price}
          />
        ))}
      </div>
    </div>
  );
};
 
export default Header;