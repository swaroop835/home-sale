import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProperty.css";

const AddProperty = ({ initialFormData, onCancel }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    house_no: "",
    place: "",
    district: "",
    bedroom: "",
    bathroom: "",
    squarefeet: "",
    status: "Ready to Move",
    furnishing: "furnishing",
    description: "",
    price: "",
    ...initialFormData, // Populate form data with initial values for editing
  });

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", file);
    for (const key in formData) {
      formdata.append(key, formData[key]);
    }

    // Determine whether to use POST (add new) or PUT (update existing)
    const apiUrl = initialFormData
      ? `http://localhost:8081/updateProperty/${initialFormData.house_no}`
      : "http://localhost:8081/AddProperty";

    const axiosMethod = initialFormData ? axios.put : axios.post;

    axiosMethod(apiUrl, formdata)
      .then((res) => {
        console.log(res);
        setFormData({
          house_no: "",
          place: "",
          district: "",
          bedroom: "",
          bathroom: "",
          squarefeet: "",
          status: "Ready to Move",
          furnishing: "furnishing",
          description: "",
          price: "",
        });
        setFile(null);
        alert(
          initialFormData
            ? "Property updated successfully!"
            : "Property added successfully!"
        );
      })
      .catch((err) => {
        console.error("Error adding/updating property:", err);
        alert("Error adding/updating property. Please try again.");
      });
  };

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData); // Set form data for editing
    }
  }, [initialFormData]);

  return (
    <div className="add-property-page">
      <div className="add-property-container">
        <h2>{initialFormData ? "Edit Property" : "Add Property"}</h2>
        <form onSubmit={handleUpload}>
          <div className="input-add-property">
            <label>Property Image</label>
            <input type="file" onChange={handleFile} />
          </div>

          <div className="input-add-property">
            <label>House No</label>
            <input
              type="text"
              name="house_no"
              value={formData.house_no}
              onChange={handleChange}
            />
          </div>

          <div className="input-add-property">
            <label>Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
            />
          </div>

          <div className="input-add-property">
            <label>District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
            />
          </div>

          <div className="input-add-property">
            <label>Bedroom</label>
            <input
              type="number"
              name="bedroom"
              value={formData.bedroom}
              onChange={handleChange}
            />
          </div>

          <div className="input-add-property">
            <label>Bathroom</label>
            <input
              type="number"
              name="bathroom"
              value={formData.bathroom}
              onChange={handleChange}
            />
          </div>

          <div className="input-add-property">
            <label>Square Feet</label>
            <input
              type="number"
              name="squarefeet"
              value={formData.squarefeet}
              onChange={handleChange}
            />
          </div>

          <div className="input-add-property">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Ready to Move">Ready to Move</option>
              <option value="Not Ready to Move">Not Ready to Move</option>
              <option value="Just Up For Some Patch Works">
                Just Up For Some Patch works
              </option>
            </select>
          </div>

          <div className="input-add-property">
            <label>Furnishing</label>
            <select
              name="furnishing"
              value={formData.furnishing}
              onChange={handleChange}
            >
              <option value="Furnished">Furnished</option>
              <option value="UnFurnished">UnFurnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
            </select>
          </div>

          <div className="input-add-property">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="input-add-property">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="button-add-property">
            <button type="submit">{initialFormData ? "Update" : "Add"}</button>
            {initialFormData && (
              <button type="button" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
