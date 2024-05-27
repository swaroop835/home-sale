import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const Propertylisting = () => {
  const [properties, setProperties] = useState([]);

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

    fetchProperties();
  }, []);

  const columns = [
    { title: 'Address', dataIndex: 'address' },
    { title: 'City', dataIndex: 'city' },
    { title: 'Bedrooms', dataIndex: 'bedrooms' },
    { title: 'Bathrooms', dataIndex: 'bathrooms' },
    // Add more columns as needed
  ];

  return (
    <div>
      <h2>Property Listings</h2>
      <Table dataSource={properties} columns={columns} />
    </div>
  );
};

export default Propertylisting;
