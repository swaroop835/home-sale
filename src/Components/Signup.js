import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [phoneno, setPhoneno] = useState("");
  const [place, setPlace] = useState("");
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      email,
      username,
      password,
      phoneno,
      place,
    };

    axios
      .post("http://localhost:8081/usersignup", userData)
      .then((response) => {
        console.log("User added:", response.data);

        // Clear form after submission (optional)
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword(""); // Clear confirm password
        setPhoneno("");
        setPlace("");
        setSuccessMessage("Sign up Successful");
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      })
      .catch((error) => {
        console.error("There was an error adding the user!", error);
      });
  };

  const handlePlaceChange = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setPlace(value);
    }
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneno(value);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-signup">
            <input
              type="email"
              id="email"
              placeholder="&nbsp;Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-signup">
            <input
              type="text"
              id="username"
              placeholder="&nbsp;Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-signup">
            <input
              type="text"
              id="phoneno"
              placeholder="&nbsp;Phone no"
              value={phoneno}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <div className="input-signup">
            <input
              type="text"
              id="place"
              placeholder="&nbsp;Place"
              value={place}
              onChange={handlePlaceChange}
              required
            />
          </div>
          <div className="input-signup">
            <input
              type="password"
              id="password"
              placeholder="&nbsp;Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-signup">
            <input
              type="password"
              id="confirmPassword"
              placeholder="&nbsp;Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-signup">
            <button type="submit">Submit</button>
          </div>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signup;

