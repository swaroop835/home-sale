import React, { useState } from 'react';
import {Link,useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css'; // Import CSS for styling
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook

  const handleLogin = (event) => {
    event.preventDefault();
    setError(''); // Clear any previous errors

    axios.post('http://localhost:8081/user2', { username, password })
    .then(res => {
        if(res.data.success){
      console.log("User login successful");
      navigate('/Header'); 
        }// Redirect to user dashboard
        else {
          console.log("failed");
          setError('Invalid username or password');
        }
    })
    .catch(err => {
    console.error('Error during login:', err);
        setError('An error occurred. Please try again later.');
      });
  };   

 

  return (
    <div className="login-containerl">
      <h2>House Rental</h2>
      <form>
        <div className="input-groupl">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-groupl">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-groupl">
          <button type="submit" onClick={handleLogin}>Login</button>
          
          <Link to="/Adminlogin"><a href="#">Admin</a></Link>
          
        </div>
        <div className="signup-groupl">
          <p>Don't have an account?</p>
          <Link to="/signup"><button type="button">Sign Up</button></Link>
        </div>
        
      </form>
    </div>
  );
};

export default Login;
