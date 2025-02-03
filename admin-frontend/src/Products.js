import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Tag, message } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const dummyData = [
      { id: 1, farmerName: "John Doe", product: "Tomatoes", quantity: "50kg", price: 20, status: "pending" },
      { id: 2, farmerName: "Alice Smith", product: "Potatoes", quantity: "30kg", price: 15, status: "approved" },
      { id: 3, farmerName: "Bob Williams", product: "Carrots", quantity: "20kg", price: 10, status: "rejected" },
    ];
    setProducts(dummyData);
  };

  const handleApprove = async (id) => {
    try {
      // Update the status to approved in the local state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, status: "approved" } : product
        )
      );
      
      // Simulate API request for approval (replace with actual API call)
      message.success("Product approved!");
    } catch (error) {
      message.error("Error approving product");
    }
  };

  const handleReject = async (id) => {
    try {
      // Update the status to rejected in the local state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, status: "rejected" } : product
        )
      );

      // Simulate API request for rejection (replace with actual API call)
      message.success("Product rejected!");
    } catch (error) {
      message.error("Error rejecting product");
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
          <Button
            type="primary"
            onClick={() => handleApprove(record.id)}
            disabled={record.status === "approved" || record.status === "rejected"}
            style={{ marginRight: 8 }}
          >
            Approve
          </Button>
          <Button
            type="danger"
            onClick={() => handleReject(record.id)}
            disabled={record.status === "rejected" || record.status === "approved"}
          >
            Reject
          </Button>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={products} rowKey="id" />;
};

export default Products;
