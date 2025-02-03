import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Tag, message } from "antd";

const Orders = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const dummyData = [
      { id: 1, farmerName: "John Doe", product: "Tomatoes", quantity: "50kg", price: 20, status: "pending" },
      { id: 2, farmerName: "Alice Smith", product: "Potatoes", quantity: "30kg", price: 15, status: "approved" },
      { id: 3, farmerName: "Bob Williams", product: "Carrots", quantity: "20kg", price: 10, status: "rejected" },
    ];
    setRecords(dummyData);
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/farmers-records/${id}/approve`);
      message.success("Record approved!");
      fetchRecords();
    } catch (error) {
      message.error("Error approving record");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/farmers-records/${id}/reject`);
      message.success("Record rejected!");
      fetchRecords();
    } catch (error) {
      message.error("Error rejecting record");
    }
  };

  const columns = [
    { title: "Farmer Name", dataIndex: "farmerName", key: "farmerName" },
    { title: "Product", dataIndex: "product", key: "product" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Price", dataIndex: "price", key: "price", render: (price) => `$${price}` },
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

  return <Table columns={columns} dataSource={records} rowKey="id" />;
};

export default Orders;
