import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "antd";
import axios from "axios";
import './Userlisting.css'; // Import the CSS file

const { confirm } = Modal;

const UserListing = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/userlisting");
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const showDeleteConfirm = (email) => {
    confirm({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone.",
      onOk: () => handleDelete(email),
      onCancel: () => {},
    });
  };

  const handleDelete = async (email) => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/userlisting/${email}`
      );

      if (response.status === 200) {
        const updatedUsers = users.filter((user) => user.email !== email);
        setUsers(updatedUsers);
      } else {
        // Handle error
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      // Handle error
    }
  };

  const userColumns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone No", dataIndex: "phoneno", key: "phoneno" },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (record) => (
        <Button
          type="primary"
          danger
          onClick={() => showDeleteConfirm(record.email)}
          className="delete-button"
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="user-listing-container">
      <h2 className="user-listing-title">User Listings</h2>
      <Table
        dataSource={users}
        columns={userColumns}
        rowKey="email"
        className="user-listing-table"
      />
    </div>
  );
};

export default UserListing;
