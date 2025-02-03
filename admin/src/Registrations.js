import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Tag, message } from "antd";

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const dummyData = [
        { id: 1, farmerName: "John Doe", email: "john@example.com", phone: "1234567890", status: "pending" },
        { id: 2, farmerName: "Alice Smith", email: "alice@example.com", phone: "9876543210", status: "approved" },
        { id: 3, farmerName: "Bob Williams", email: "bob@example.com", phone: "4561237890", status: "rejected" },
      ];
      setRegistrations(dummyData);
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/farmer-registrations/${id}/approve`);
      message.success("Registration approved!");
      fetchRegistrations();
    } catch (error) {
      message.error("Error approving registration");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/farmer-registrations/${id}/reject`);
      message.success("Registration rejected!");
      fetchRegistrations();
    } catch (error) {
      message.error("Error rejecting registration");
    }
  };

  const columns = [
    { title: "Farmer Name", dataIndex: "farmerName", key: "farmerName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      render: (status) => (
        <Tag color={status === "pending" ? "orange" : status === "approved" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleApprove(record.id)} style={{ marginRight: 8 }}>
            Approve
          </Button>
          <Button type="danger" onClick={() => handleReject(record.id)}>
            Reject
          </Button>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={registrations} rowKey="id" />;
};

export default Registrations;
