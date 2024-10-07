import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PropertyDetails.css"; // Import the CSS file for styling
 
const PropertyDetails = () => {
  const id = localStorage.getItem("house_no");
  const [property, setProperty] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getProperty", {
          params: { house_no: id },
        });
        console.log(response);
        if (response.data.length > 0) {
          setProperty(response.data[0]);
        } else {
          setError("Property not found.");
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
        setError("Error fetching property details.");
      }
    };
 
    fetchProperty();
  }, [id]);
 
  const handleBuyClick = () => {
    setShowPopup(true);
  };
 
  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };
 
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
 
  const handleConfirmClick = () => {
    axios
      .post("http://localhost:8081/bookProperty", {
        username: localStorage.getItem("username"), // Ensure you have stored username
        house_no: id,
        booking_date: selectedDate,
        time_slot: selectedTimeSlot,
      })
      .then((response) => {
        setShowPopup(false);
        setBookingConfirmed(true);
      })
      .catch((error) => {
        console.error("Error booking property:", error);
      });
  };
 
  const handleCancelClick = () => {
    setShowPopup(false);
  };
 
  const handleConfirmationClose = () => {
    setBookingConfirmed(false);
  };
 
  if (error) {
    return <div>{error}</div>;
  }
 
  if (!property) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="property-details">
      <h1>{property.name}</h1>
 
      {/* Displaying Image1, Image2, and Image3 */}
      <div className="property-images">
        <img
          src={`http://localhost:8081/images/${property.image1}`}
          alt={property.name}
          style={{ width: "auto", height: "300px" }}
        />
        {property.image2 && (
          <img
            src={`http://localhost:8081/images/${property.image2}`}
            alt={property.name}
            style={{ width: "auto", height: "300px" }}
          />
        )}
        {property.image3 && (
          <img
            src={`http://localhost:8081/images/${property.image3}`}
            alt={property.name}
            style={{ width: "auto", height: "300px" }}
          />
        )}
      </div>
 
      <p>
        <strong>Description:</strong> {property.description}
      </p>
      <p>
        <strong>Price:</strong> ₹{property.price}
      </p>
      <p>
        <strong>Location:</strong> {property.place}
      </p>
      <p>
        <strong>District:</strong> {property.district}
      </p>
      <p>
        <strong>Number of Bedrooms:</strong> {property.bedroom}
      </p>
      <p>
        <strong>Number of Bathrooms:</strong> {property.bathroom}
      </p>
      <p>
        <strong>Status:</strong> {property.status}
      </p>
      <p>
        <strong>Furnishing:</strong> {property.furnishing}
      </p>
      <p>
        <strong>Square Feet:</strong> {property.squarefeet}
      </p>
      <button className="buy-button" onClick={handleBuyClick}>
        Book
      </button>
 
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Select Time Slot and Date</h2>
            <label>
              Time Slot:
              <select value={selectedTimeSlot} onChange={handleTimeSlotChange}>
                <option value="">Select a time slot</option>
                <option value="11:00-12:00 AM">11:00 AM - 12:00 PM</option>
                <option value="2:00-3:00 PM">2:00 PM - 3:00 PM</option>
                <option value="4:00-5:00 PM">4:00 PM - 5:00 PM</option>
              </select>
            </label>
            <label>
              Date:
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
              />
            </label>
            <button className="confirm-button" onClick={handleConfirmClick}>
              Confirm
            </button>
            <button className="cancel-button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      )}
 
      {bookingConfirmed && (
        <div className="confirmation-popup">
          <div className="confirmation-popup-content">
            <h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="green"
                className="bi bi-check-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm3.993-7.8a.5.5 0 0 1 .708.708l-4.5 4.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 1 1 .708-.708L8 11.293l4.293-4.293z" />
              </svg>
              Booking Confirmed
            </h2>
            <button onClick={handleConfirmationClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default PropertyDetails;