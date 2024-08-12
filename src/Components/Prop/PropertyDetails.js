import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PropertyDetails.css";
import LoginModal from "./LoginModal"; // Import the LoginModal component

const PropertyDetails = () => {
  const id = localStorage.getItem("house_no");
  const [property, setProperty] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      const username = localStorage.getItem("username");

      // if (!username) {
      //   setShowLoginModal(true); // Show the login modal if the user is not logged in
      //   return;
      // }

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
        username: localStorage.getItem("username"),
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

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  if (!property) {
    //  return <LoginModal show={showLoginModal} onClose={handleCloseLoginModal} />;
    return <div>Login</div>;
  }
  return (
    <div className="property-details">
      <h1>{property.name}</h1>
      <img
        src={"http://localhost:8081/images/" + property.image}
        alt={property.name}
        style={{ width: "auto", height: "700px" }}
      />
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
