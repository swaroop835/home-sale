import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className='admin-page'>
    <div className="admin-container">
      <h1>Admin Panel</h1>

      <h2>Property Listings</h2>
      <Link to="/Propertylisting">Click Here</Link>

      <h2>User Listings</h2>
      <Link to="/Userlisting">Click Here</Link>

      <h2>Add Property</h2>
      <Link to="/AddProperty">Click Here</Link>
    </div>
    </div>
  );
};

export default AdminPage;


  


