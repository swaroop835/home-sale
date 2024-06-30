// src/AddPropertyForm.js
import React, { useState } from "react";
import axios from 'axios';
import './AddProperty.css';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    place: "",
    tc_no: "",
    type: "apartment",
    bedrooms: "",
    bathrooms: "",
    description: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({
        ...formData,
        photo: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/addproperty', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Success:', response.data);
      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      console.error('Error:', error);
      // Handle error, e.g., show an error message
    }
  };

  

  return (
    <form onSubmit={handleSubmit} className="page-container">
      <div>
        <label>Place:</label>
        <input
          type="text"
          name="place"
          value={formData.place}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>TC No:</label>
        <input
          type="text"
          name="tc_no"
          value={formData.tc_no}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Type:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
        </select>
      </div>
      <div>
        <label>Number of Bedrooms:</label>
        <input
          type="number"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Number of Bathrooms:</label>
        <input
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Photo:</label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddProperty;
