import React, {useState, useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import './AdminPage.css'


const AdminPage = () => {
  return (
    <div>
      <h1>Admin Panel</h1>

      <h2>Property Listings</h2>
      <Link to="/Propertylisting"><a href="#">Click Here</a></Link>
      

      <h2>User Listings</h2>
      <Link to="/Userlisting"><a href="#">Click Here</a></Link>
      

      <h2>Add Property</h2>
      <Link to="/AddProperty"><a href="#">Click Here</a></Link>

      <h2>Edit Property</h2>
      <Link to="/EditProperty"><a href="#">Click Here</a></Link>
     
    </div>
  );
};

export default AdminPage;


  


