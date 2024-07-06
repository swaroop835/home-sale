import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PropertyTable.css";
import AddProperty from "./AddProperty";

const PropertyTable = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editProperty, setEditProperty] = useState(null);

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

  const handleDelete = (house_no) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8081/property/${house_no}`)
        .then((response) => {
          if (response.data.success) {
            fetchProperties();
          } else {
            console.error("Failed to delete property:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("There was an error deleting the property!", error);
        });
    }
  };

  const handleEdit = (property) => {
    setEditMode(true);
    setEditProperty(property);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditProperty(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProperties = properties.filter((property) =>
    property.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="property-table-container">
      <h2 className="property-table-title">Property Listings</h2>
      <input
        type="text"
        placeholder="Search by District"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-box"
      />
      {editMode ? (
        <AddProperty
          initialFormData={editProperty}
          onCancel={handleCancelEdit}
        />
      ) : (
        <table className="property-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>House No</th>
              <th>Place</th>
              <th>District</th>
              <th>Bedroom</th>
              <th>Bathroom</th>
              <th>Square Feet</th>
              <th>Status</th>
              <th>Furnishing</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property) => (
              <tr key={property.house_no}>
                <td>
                  <img
                    src={`http://localhost:8081/images/${property.image}`}
                    alt={property.description}
                    className="property-image"
                  />
                </td>
                <td>{property.house_no}</td>
                <td>{property.place}</td>
                <td>{property.district}</td>
                <td>{property.bedroom}</td>
                <td>{property.bathroom}</td>
                <td>{property.squarefeet}</td>
                <td>{property.status}</td>
                <td>{property.furnishing}</td>
                <td>{property.description}</td>
                <td>{property.price}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-button delete-button"
                      onClick={() => handleDelete(property.house_no)}
                    >
                      Delete
                    </button>
                    <button
                      className="action-button edit-button"
                      onClick={() => handleEdit(property)}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PropertyTable;
