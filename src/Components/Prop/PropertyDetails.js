import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Login from "../Login";

const PropertyDetails = () => {
  const id =localStorage.getItem("house_no");
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getProperty", {
          params: { house_no: id },
        });
        console.log(response);
        setProperty(response.data[0]);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div>Login</div>;
  }

  return (
    <div className="property-details">
      <h1>{property.name}</h1>
      <img src={'http://localhost:8081/images/'+property.image} alt={property.name} style={{width: "300px", height: "200px"}}/>
      <p><strong>Description:</strong> {property.description}</p>
      <p><strong>Price:</strong> ₹{property.price}</p>
      <p><strong>Location:</strong> {property.place}</p>
      <p><strong>District:</strong> {property.district}</p>
      <p><strong>Number of Bedrooms:</strong> {property.bedroom}</p>
      <p><strong>Number of Bathrooms:</strong> {property.bathroom}</p>
      <p><strong>Status:</strong> {property.status}</p>
      <p><strong>Furnishing:</strong> {property.furnishing}</p>
      <p><strong>Square Feet:</strong> {property.squarefeet}</p>
      
    </div>
  );
};

export default PropertyDetails;
