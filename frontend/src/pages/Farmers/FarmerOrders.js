import React, { useState } from "react";
import Navbar from "./FarmerNavbar";
import "./FarmerOrders.css";
import useFarmer from "../../hooks/useFarmer";
const FarmerOrders = () => {
  const [orders] = useState([
    { id: 101, item: "Tomatoes", quantity: "20kg", status: "Delivered" },
    { id: 102, item: "Potatoes", quantity: "10kg", status: "Pending" },
  ]);

  return (
    <>
      <Navbar />
      <div className="orders-container">
        <h2>📦 Your Orders</h2>
        {orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.item}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </>
  );
};

export default FarmerOrders;
