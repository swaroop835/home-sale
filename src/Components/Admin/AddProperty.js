import React, { useState } from 'react';
import './AddProperty.css';

const PropertyForm = ({ onSubmit, initialValues = {} }) => {
  const [propertyDetails, setPropertyDetails] = useState(initialValues);
  const [imageFile, setImageFile] = useState(null); // State to store the uploaded image file

  const handleChange = (event) => {
    setPropertyDetails({
      ...propertyDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setImageFile(uploadedFile); // Update state with the uploaded file
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...propertyDetails, image: imageFile }); // Include the image file in the submitted data
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Property Details</h2>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={propertyDetails.address || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="type">Type:</label>
        <select id="type" name="type" value={propertyDetails.type || ''} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="land">Land</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="bedrooms">Bedrooms:</label>
        <input
          type="number"
          id="bedrooms"
          name="bedrooms"
          value={propertyDetails.bedrooms || 0}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="bathrooms">Bathrooms:</label>
        <input
          type="number"
          id="bathrooms"
          name="bathrooms"
          value={propertyDetails.bathrooms || 0}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={propertyDetails.description || ''}
          onChange={handleChange}
        />
      </div>
      {/* Photo upload section */}
      <div className="form-group">
        <label htmlFor="photo">House Photo (Click and Drop):</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*" // Accept only image files
          onChange={handleImageUpload}
        />
      </div>
      <button type="submit">Add Property</button>
    </form>
  );
};

const AddProperty = () => {
  const handleSubmit = (propertyDetails) => {
    // Handle form submission logic here, e.g., sending data to a server
    console.log('Submitted property details:', propertyDetails);
  };

  return (
    <div className="page-container">
      <h1>Add Property</h1>
      <PropertyForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProperty;
