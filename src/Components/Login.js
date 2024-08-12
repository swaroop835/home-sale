import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";


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
          localStorage.setItem("username", username);
          navigate("/UserPage");
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
        <h2 style={{color: "grey"}}>Dream Homes</h2>
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
           
          </div>

          <div className="button-login">
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className="button-login">
            <p style={{color: "grey"}}>Don't have an account?</p>
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
