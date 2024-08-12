import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Userorder.css"; // Import the custom CSS file

const Order = () => {
  const [booking, setBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const username = localStorage.getItem("username"); // Get the username from local storage

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getBooking", {
          params: { username },
        });
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    if (username) {
      fetchBooking();
    }
  }, [username]);

  const handleDelete = (booking) => {
    setCurrentBooking(booking);
    setShowModal(true); // Show the confirmation modal
  };

  const confirmDelete = async () => {
    if (currentBooking) {
      try {
        await axios.delete("http://localhost:8081/deleteBooking", {
          data: { username, house_no: currentBooking.house_no }, // Include house_no if needed
        });
        setBooking(null); // Remove the booking from the state after deletion
        setShowModal(false); // Close the modal
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const cancelDelete = () => {
    setShowModal(false); // Close the modal without deleting
  };

  return (
    <div className="order-page">
      <h1>Your Booking</h1>
      {booking ? (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>House Number</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{booking.username}</td>
              <td>{booking.house_no}</td>
              <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
              <td>{booking.time_slot}</td>
              <td>{booking.reason}</td>
              <td>{booking.status}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(booking)}
                >
                  Cancel Booking
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No booking found for {username}.</p>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete}>Yes, Cancel</button>
              <button onClick={cancelDelete}>No, Keep</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
