import React, { useState } from "react";
import { Table, Tag, Button, Progress } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const Orders = () => {
  // Sample orders data (Replace with API data later)
  const [orders, setOrders] = useState([
    { id: 1, farmer: "John Doe", product: "Tomatoes", quantity: 50, status: "Pending" },
    { id: 2, farmer: "Jane Smith", product: "Carrots", quantity: 30, status: "Accepted" },
    { id: 3, farmer: "Mike Johnson", product: "Potatoes", quantity: 40, status: "Cancelled" },
  ]);

  // Function to update order status
  const updateStatus = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Progress bar logic
  const getProgressPercentage = (status) => {
    switch (status) {
      case "Accepted":
        return 33; // 33% for Accepted
      case "Shipped":
        return 66; // 66% for Shipped
      case "Delivered":
        return 100; // 100% for Delivered
      case "Cancelled":
        return 0; // 0% for Cancelled
      default:
        return 0; // Pending state has 0%
    }
  };

  // Define columns for the Ant Design Table
  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Farmer", dataIndex: "farmer", key: "farmer" },
    { title: "Product", dataIndex: "product", key: "product" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Accepted" ? "green" : status === "Cancelled" ? "red" : "gold";
        return (
          <div>
            <Tag color={color}>{status}</Tag>
            <Progress percent={getProgressPercentage(status)} status={status === "Delivered" ? "success" : "active"} />
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            disabled={record.status === "Accepted" || record.status === "Shipped" || record.status === "Delivered"}
            onClick={() => updateStatus(record.id, "Accepted")}
          >
            Accept
          </Button>
          <Button
            type="default"
            icon={<ShoppingCartOutlined />}
            disabled={record.status !== "Accepted" && record.status !== "Shipped"}
            onClick={() => updateStatus(record.id, "Shipped")}
          >
            Ship
          </Button>
          <Button
            type="default"
            icon={<ClockCircleOutlined />}
            disabled={record.status === "Delivered" || record.status === "Cancelled"}
            onClick={() => updateStatus(record.id, "Delivered")}
          >
            Deliver
          </Button>
          <Button
            type="danger"
            icon={<CloseCircleOutlined />}
            disabled={record.status === "Cancelled" || record.status === "Delivered"}
            onClick={() => updateStatus(record.id, "Cancelled")}
          >
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Admin Orders</h2>
      <Table dataSource={orders} columns={columns} rowKey="id" />
    </div>
  );
};

export default Orders;
