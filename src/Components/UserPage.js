import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserPage.css";
import Card from "./Prop/Card";
import house2 from "../backgroundimg/userpageimg.jpeg";

const UserPage = ({ setUsername }) => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(1000000); // Set a default maximum budget value
  const [sortOption, setSortOption] = useState(""); // State to manage sorting option

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
    const value = e.target.value;
    setMinBudget(value);
  };

  const handleMaxBudgetChange = (e) => {
    const value = e.target.value;
    setMaxBudget(value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Apply filtering based on search query and budget
  const filteredProperties = properties
    .filter(
      (property) =>
        property.place.toLowerCase().includes(searchQuery.toLowerCase()) &&
        property.price >= parseFloat(minBudget) &&
        property.price <= parseFloat(maxBudget)
    )
    .sort((a, b) => {
      if (sortOption === "low-to-high") {
        return a.price - b.price;
      } else if (sortOption === "high-to-low") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div>
      <section className="hero-userpage">
        <img
          //src="https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          src={house2}
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
      <br />
      <br />

      <div className="search-container-userpage">
        <input
          type="text"
          placeholder="Search by Place"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-box"
        />
      
        <div className="budget-container">
          
          <div>
            <label>Min Budget: ${minBudget}</label>
            <input
              type="number"
              value={minBudget}
              onChange={handleMinBudgetChange}
              min="0"
              max="1000000"
              step="1000"
              className="budget-input"
            />
            <input
              type="range"
              min="0"
              max="1000000"
              step="1000"
              value={minBudget}
              onChange={handleMinBudgetChange}
              className="budget-slider"
            />
          </div>

          
          <div>
            <label>Max Budget: ${maxBudget}</label>
            <input
              type="number"
              value={maxBudget}
              onChange={handleMaxBudgetChange}
              min="0"
              max="10000000"
              step="1000"
              className="budget-input"
            />
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

        
        <div className="sort-container">
          <label>Sort by Price: </label>
          <select value={sortOption} onChange={handleSortChange} className="sort-dropdown">
            <option value="">Select</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>
      </div>
      <br />
      <br />

      <div className="card-container-userpage">
        {filteredProperties.map((property) => (
          <Card
            key={property.house_no}
            houseno={property.house_no}
            image={`http://localhost:8081/images/${property.image1}`}
            place={property.place}
            price={property.price}
            className="card-item-userpage"
          />
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default UserPage;
