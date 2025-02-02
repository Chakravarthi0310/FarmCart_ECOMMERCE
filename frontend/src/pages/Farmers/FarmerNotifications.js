import React, { useState } from "react";
import Navbar from "./FarmerNavbar";
import "./FarmerNotifications.css";

const FarmerNotifications = () => {
  const [notifications] = useState([
    { id: 1, message: "Your order #1234 has been approved." },
    { id: 2, message: "New buyer has inquired about your potatoes." },
    { id: 3, message: "Your profile verification is pending." },
  ]);

  return (
    <>
      <Navbar />
      <div className="notifications-container">
        <h2>🔔 Notifications</h2>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>{notification.message}</li>
            ))}
          </ul>
        ) : (
          <p>No new notifications.</p>
        )}
      </div>
    </>
  );
};

export default FarmerNotifications;
