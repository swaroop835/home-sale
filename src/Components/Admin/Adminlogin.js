import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Adminlogin.css';
import axios from 'axios';

const Adminlogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8081/admin', { username, password })
    .then(res => {
        if(res.data.success){
      console.log("admin login successful");
      navigate('/AdminPage'); 
        }
        else{
        console.log("error")
        alert("Error");}
    })
    .catch(err => console.log(err));
  };   

  return (
    <div className='adminlogin-login'>
    <div className="adminlogin-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-adminlogin">
          <input
          placeholder=' Username'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-adminlogin">
          <input
          placeholder=' Password'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='button-adminlogin'>
        <button type="submit">Login</button>
        </div>
      </form>
    </div>
    </div>
  
  );
};

export default Adminlogin;
