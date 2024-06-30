import React, { useState, useEffect } from "react";
import axios from "axios";
import './FeedbackForm.css'

function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(JSON.parse(storedUsername));
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("username", JSON.stringify(username));

    axios
      .post("http://localhost:8081/submit-feedback", {
        username,
        feedback,
      })
      .then((response) => {
        console.log(response.data);
        alert("Feedback submitted successfully");
      })
      .catch((error) => {
        console.error("There was an error submitting the feedback!", error);
      });
  };

  return (
    <div className="feedback-page">
    <div className="feedback-form-container">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Your Username:</label>
        <br />
        <br />
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="feedback">Your Feedback:</label>
        <br />
        <br />
        <textarea
          id="feedback"
          name="feedback"
          rows="4"
          cols="50"
          placeholder="Enter your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default FeedbackForm;
