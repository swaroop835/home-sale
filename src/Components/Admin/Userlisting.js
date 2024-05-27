import React, { useEffect, useState } from 'react';
import { Table,message } from 'antd';

const Userlisting = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8081/user'); // Replace with your API endpoint
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        message.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const userColumns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    // Add more columns for user data as needed
  ];

  return (
    <div>
      <h2>User Listings</h2>
      <Table dataSource={users} columns={userColumns} />
    </div>
  );
};

export default Userlisting;
