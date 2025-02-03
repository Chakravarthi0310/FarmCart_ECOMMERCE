import React, { useEffect, useState } from "react";
import "./CustomerOrders.css";

import CustomerNavbar from "../../components/CustomerNavbar";
import useCustomer from "../../hooks/useCustomer"; // Assuming the hook is in this path

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const { handleGetCustomerOrders, loading, error } = useCustomer();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await handleGetCustomerOrders();
        setOrders(fetchedOrders); // Set the fetched orders into the state
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [handleGetCustomerOrders]);

  return (
    <div className="Orders">
      <CustomerNavbar />
      <div className="orders-container">
        <h2 className="orders-title">My Orders</h2>
        {loading && <p>Loading...</p>} {/* Display loading state */}
        {error && <p className="error">{error}</p>} {/* Display error if any */}
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <img src={order.image} alt={order.item} className="order-image" />
              <div className="order-details">
                <h3 className="order-item">{order.item}</h3>
                <p className="order-quantity">Quantity: {order.quantity}</p>
                <p className="order-farmer">
                  Farmer: <span>{order.farmer}</span>
                </p>
                <p className="order-contact">
                  Contact: <span>{order.contact}</span>
                </p>
                <p className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerOrders;
