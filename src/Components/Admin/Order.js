import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";
 
const Order = () => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [currentBooking, setCurrentBooking] = useState(null);
  const [bookingToDelete, setBookingToDelete] = useState(null);
 
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getBookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
 
    fetchBookings();
  }, []);
 
  const handleApprove = async (username) => {
    try {
      await axios.post("http://localhost:8081/approveBooking", { username });
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.username === username
            ? { ...booking, status: "Approved", reason: "nil" }
            : booking
        )
      );
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };
 
  const handleDisapprove = (booking) => {
    setCurrentBooking(booking);
    setModalContent(booking.reason || ""); // Pre-fill with existing reason if available
    setShowModal(true);
  };
 
  const handleDelete = (booking) => {
    setBookingToDelete(booking); // Set booking to delete
    setShowConfirmModal(true); // Show the confirmation modal
  };
 
  const confirmDelete = async () => {
    if (bookingToDelete) {
      try {
        await axios.delete(`http://localhost:8081/deleteBooking`, {
          data: { username: bookingToDelete.username },
        });
        setBookings((prevBookings) =>
          prevBookings.filter(
            (booking) =>
              booking.username !== bookingToDelete.username &&
              booking.house_no !== bookingToDelete.house_no
          )
        );
        setShowConfirmModal(false); // Close the confirmation modal
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };
 
  const cancelDelete = () => {
    setShowConfirmModal(false); // Close the confirmation modal without deleting
  };
 
  const closeModal = () => {
    setShowModal(false);
    setCurrentBooking(null);
  };
 
  const handleModalChange = (event) => {
    setModalContent(event.target.value);
  };
 
  const handleSaveReason = async () => {
    if (currentBooking) {
      try {
        await axios.post("http://localhost:8081/updateBookingReason", {
          username: currentBooking.username,
          reason: modalContent,
          status: "Disapproved",
        });
 
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.username === currentBooking.username
              ? { ...booking, reason: modalContent, status: "Disapproved" }
              : booking
          )
        );
 
        closeModal();
      } catch (error) {
        console.error("Error updating booking reason:", error);
      }
    }
  };
 
  return (
    <div className="order-page">
      <h1>Your Bookings</h1>
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
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="7">No bookings found.</td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={`${booking.username}-${booking.house_no}`}>
                <td>{booking.username}</td>
                <td>{booking.house_no}</td>
                <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                <td>{booking.time_slot}</td>
                <td>{booking.reason}</td>
                <td>{booking.status}</td>
                <div className="table-buttons-container">
                  <td>
                    <button
                      className="approve-button"
                      onClick={() => handleApprove(booking.username)}
                      disabled={booking.status === "Approved"}
                    >
                      Approve
                    </button>
                    <button
                      className="disapprove-button"
                      onClick={() => handleDisapprove(booking)}
                      disabled={booking.status === "Disapproved"}
                    >
                      Disapprove
                    </button>
                    <button
                      className="deletebutton"
                      onClick={() => handleDelete(booking)}
                    >
                      Delete
                    </button>
                  </td>
                </div>
              </tr>
            ))
          )}
        </tbody>
      </table>
 
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this booking?</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete}>Yes, Delete</button>
              <button onClick={cancelDelete}>No, Cancel</button>
            </div>
          </div>
        </div>
      )}
 
      {/* Reason Update Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Update Booking Reason</h2>
            <textarea
              value={modalContent}
              onChange={handleModalChange}
              rows="4"
              cols="50"
            />
            <div className="modal-buttons">
              <button onClick={handleSaveReason}>Save</button>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default Order;