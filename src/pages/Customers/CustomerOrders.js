import React from "react";
import "./CustomerOrders.css";

const CustomerOrders = () => {
  const orders = [
    {
      id: 1,
      item: "Fresh Apples",
      farmer: "Ramesh Kumar",
      contact: "+91 98765 43210",
      quantity: "2 Kg",
      status: "Delivered",
      image: "/images/apples.jpg",
    },
    {
      id: 2,
      item: "Organic Tomatoes",
      farmer: "Suresh Rao",
      contact: "+91 87654 32109",
      quantity: "3 Kg",
      status: "In Transit",
      image: "/images/tomatoes.jpg",
    },
    {
      id: 3,
      item: "Potatoes",
      farmer: "Anita Sharma",
      contact: "+91 76543 21098",
      quantity: "5 Kg",
      status: "Pending",
      image: "/images/potatoes.jpg",
    },
  ];

  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>
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
  );
};

export default CustomerOrders;
