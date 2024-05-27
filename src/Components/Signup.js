import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

   const userData ={
    email,
    username,
    password,
    city
   };

   axios.post('http://localhost:8081/user', userData)
   .then(response => {
     console.log('User added:', response.data);
  
    // Clear form after submission (optional)
    setUsername('');
    setEmail('');
    setPassword('');
    setCity('');

    setTimeout(() => {
      navigate('/Login');
    }, 2000);
  })
  .catch(error => {
    console.error('There was an error adding the user!', error);
  });
};

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="Email">Email</label>
          <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="city">
           City </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
           />


        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
