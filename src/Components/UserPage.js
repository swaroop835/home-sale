import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserPage.css";
import Card from "./Prop/Card";

const UserPage = ({ setUsername }) => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(1000000); // Set a default maximum budget value

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    fetchProperties();
  }, [setUsername]);

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMinBudgetChange = (e) => {
    setMinBudget(e.target.value);
  };

  const handleMaxBudgetChange = (e) => {
    setMaxBudget(e.target.value);
  };

<<<<<<< HEAD
  const filteredProperties = properties.filter(
    (property) =>
      property.place.toLowerCase().includes(searchQuery.toLowerCase()) &&
      property.price >= parseFloat(minBudget) &&
      property.price <= parseFloat(maxBudget)
=======
  const filteredProperties = properties.filter((property) =>
    property.place.toLowerCase().includes(searchQuery.toLowerCase()) &&
    property.price >= parseFloat(minBudget) &&
    property.price <= parseFloat(maxBudget)
>>>>>>> 0a62f07448226c919e3e8ed808f4f15268ac5446
  );

  return (
    <div>
      <section className="hero-userpage">
        <img
          src="https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="House"
          className="hero-image-userpage"
        />
        <div className="hero-text-overlay-userpage">
          <h1 style={{ color: "var(--accent-color)" }}>
            Search For Your Dream Home
          </h1>
          <p>
            Explore a wide variety of houses in your desired location. We make
            it easy to find the perfect place for you.
          </p>
        </div>
      </section>
      <br></br>
      <br></br>

      <div className="search-container-userpage">
        <input
          type="text"
          placeholder="Search by Place"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-box"
        />
        <div className="budget-container">
          <label>Min Budget: ${minBudget}</label>
          <input
            type="range"
            min="0"
            max="1000000"
            step="1000"
            value={minBudget}
            onChange={handleMinBudgetChange}
            className="budget-slider"
          />
          <label>Max Budget: ${maxBudget}</label>
          <input
            type="range"
            min="0"
            max="10000000"
            step="1000"
            value={maxBudget}
            onChange={handleMaxBudgetChange}
            className="budget-slider"
          />
        </div>
      </div>
      <br></br>
      <br></br>

      <div className="card-container-userpage">
        {filteredProperties.map((property) => (
          <Card
            key={property.house_no}
            houseno={property.house_no}
            image={`http://localhost:8081/images/${property.image}`}
            place={property.place}
            price={property.price}
            className="card-item-userpage"
          />
        ))}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default UserPage;
