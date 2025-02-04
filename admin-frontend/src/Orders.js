import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Progress } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import useAdminActions from "./hooks/useAdminApi";

const Orders = () => {
  const { fetchOrders, updateOrderStatus } = useAdminActions(); // Assuming fetchOrders and updateOrderStatus are implemented in the hook
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const fetchedOrders = await fetchOrders(); // Fetch orders from the backend API
      setOrders(fetchedOrders.map(order => ({
        ...order,
        status: order.status || "Processing", // Ensure "Processing" as default if no status is set
      })));
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    
    getOrders();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {

      await updateOrderStatus(id, newStatus); // Use the function to update the order status
      await getOrders();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Progress bar logic
  const getProgressPercentage = (status) => {
    switch (status) {
      case "Confirmed":
        return 33;
      case "Shipped":
        return 66;
      case "Delivered":
        return 100;
      case "Cancelled":
        return 0;
      case "Processing":
        return 20;
      default:
        return 0;
    }
  };

  // Define columns for the Ant Design Table
  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "id" },
    { title: "Farmer", dataIndex: "", key: "farmer" ,render:(_,record)=>(record.farmer?record.farmer.name:"N/A")},
    { title: "Product", dataIndex: "product", key: "product" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Confirmed" ? "green" : status === "Cancelled" ? "red" : "gold";
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
            disabled={record.status === "Confirmed" || record.status === "Shipped" || record.status === "Delivered"}
            onClick={() => handleUpdateStatus(record._id, "Confirmed")}
          >
            Accept
          </Button>
          <Button
            type="default"
            icon={<ShoppingCartOutlined />}
            disabled={record.status !== "Confirmed" && record.status !== "Shipped"}
            onClick={() => handleUpdateStatus(record.id, "Shipped")}
          >
            Ship
          </Button>
          <Button
            type="default"
            icon={<ClockCircleOutlined />}
            disabled={record.status === "Delivered" || record.status === "Cancelled"}
            onClick={() => handleUpdateStatus(record.id, "Delivered")}
          >
            Deliver
          </Button>
          <Button
            type="danger"
            icon={<CloseCircleOutlined />}
            disabled={record.status === "Cancelled" || record.status === "Delivered"}
            onClick={() => handleUpdateStatus(record.id, "Cancelled")}
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
