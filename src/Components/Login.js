import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../logo.png";
import axios from "axios";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineLockOpen } from "react-icons/md";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    axios
      .post("http://localhost:8081/userlogin", { username, password })
      .then((res) => {
        if (res.data.success) {
          console.log("User login successful");
          alert("Login successful");
          localStorage.setItem("username", JSON.stringify(username));
          navigate("/Header");

          
          const storedUsername = JSON.parse(localStorage.getItem("username"));

          
          console.log(storedUsername);
        } else {
          console.log("failed");
          alert("Failed");
          setError("Invalid username or password");
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
        setError("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Dream Homes</h2>
        <form>
          <div className="input-login">
            <input
              type="text"
              id="username"
              placeholder="&nbsp;Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaRegCircleUser className="icon"/>
          </div>

          <div className="input-login">
            <input
              type="password"
              id="password"
              placeholder="&nbsp;Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <MdOutlineLockOpen className="icon" />
          </div>

          <div className="button-login">
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className="button-login">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <button type="button">Sign Up</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;