import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import axios from "axios";

const Userlisting = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/userlisting");
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        // You can optionally handle errors here, e.g., display an error message to the user
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (email) => {
    try {
      const response = await axios.delete("http://localhost:8081/userlisting/${email}");

      if (response.status === 200) {
        const updatedUsers = users.filter((user) => user.email !== email);
        setUsers(updatedUsers);
        // Consider adding success handling here, e.g., console.log("User deleted successfully")
      } else {
        // Handle potential errors from the server, e.g., console.error("Failed to delete user")
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      // Handle errors during deletion, e.g., network issues
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
        <button onClick={() => handleDelete(record.email)}>Delete</button>
      ),
    },
  ];

  return (
    <div>
      <h2>User Listings</h2>
      <Table dataSource={users} columns={userColumns} />
    </div>
  );
};

export default Userlisting;