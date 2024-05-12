import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Select } from 'antd'; // Assuming you're using Ant Design
import './MyComponent';
import './PropertyForm'
import PropertyForm from './PropertyForm';

const AdminPage = () => {
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [addPropertyForm, setAddPropertyForm] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    imageUrl: '',
  });

  // Fetch properties and users on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties'); // Replace with your API endpoint
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Replace with your API endpoint
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchProperties();
    fetchUsers();
  }, []);

  const handleAddPropertyChange = (event) => {
    setAddPropertyForm({
      ...addPropertyForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitAddProperty = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addPropertyForm),
      });

      if (!response.ok) {
        throw new Error(`Error adding property: ${response.statusText}`);
      }

      const newProperty = await response.json();
      setProperties([...properties, newProperty]);
      setAddPropertyForm({ address: '', city: '', state: '', zipCode: '', bedrooms: '', bathrooms: '', description: '', imageUrl: '' });
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const columns = [
    { title: 'Address', dataIndex: 'address' },
    { title: 'City', dataIndex: 'city' },
    { title: 'State', dataIndex: 'state' },
    { title: 'Zip Code', dataIndex: 'zipCode' },
    { title: 'Bedrooms', dataIndex: 'bedrooms' },
    { title: 'Bathrooms', dataIndex: 'bathrooms' },
    // Add more columns as needed
  ];

  const userColumns = [
    { title: 'Username', dataIndex: 'username' },
    { title: 'Email', dataIndex: 'email' },
    // Add more columns for user data as needed
  ];

  return (
    <div>
      <h1>Admin Panel</h1>

      <h2>Property Listings</h2>
      <Table dataSource={properties} columns={columns} />

      <h2>User Listings</h2>
      <Table dataSource={users} columns={userColumns} />

      <h2>Add Property</h2>
      <PropertyForm/>
      
    </div>
  );
}

export default AdminPage;
