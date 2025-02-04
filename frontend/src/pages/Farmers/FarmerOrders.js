import React, { useState, useEffect } from "react";
import Navbar from "./FarmerNavbar";
import "./FarmerOrders.css";
import useFarmer from "../../hooks/useFarmer";

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const { handleViewOrders, loading, error } = useFarmer();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await handleViewOrders();
        setOrders(fetchedOrders.orders);
        console.log(fetchedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="orders-container">
        <h2 className="orders-title">📦 Your Orders</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {orders.length > 0 ? (
          <div className="table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>#{order.orderId}</td>
                    <td>
                      {order.products.map((product, index) => (
                        <div key={index} className="product-item">
                          <img
                            src={product.product.image}
                            alt={product.product.name}
                            className="product-image"
                          />
                          <span>{product.product.name} - {product.quantity}</span>
                        </div>
                      ))}
                    </td>
                    <td>
                      <span className={`order.status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </>
  );
};

export default FarmerOrders;