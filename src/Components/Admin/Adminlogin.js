import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Login.css'; // Import CSS for styling
import axios from 'axios';

const Adminlogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook

  const handleLogin = (event) => {
    event.preventDefault();
    // setError(''); // Clear any previous errors

    axios.post('http://localhost:8081/admin', { username, password })
    .then(res => {
        if(res.data.success){
      console.log("admin login successful");
      navigate('/AdminPage'); 
        }// Redirect to user dashboard
    })
    .catch(err => console.log(err));
  };   

  return (
    <div className="login-containerl">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Adminlogin;