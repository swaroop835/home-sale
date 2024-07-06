import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserPage.css";
import Card from "./Prop/Card";

const UserPage = ({ setUsername }) => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredProperties = properties.filter((property) =>
    property.district.toLowerCase().includes(searchQuery.toLowerCase())
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
      </section><br></br><br></br>

      <div className="search-container-userpage">
        <input
          type="text"
          placeholder="Search by District"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-box"
        />
      </div>
      <br></br><br></br>

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
      <br></br><br></br>
      <br></br><br></br>
    </div>
  );
};

export default UserPage;
