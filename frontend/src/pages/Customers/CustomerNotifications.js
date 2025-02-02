import React, { useState, useEffect } from "react";
import "./CustomerNotifications.css"; // Import the CSS file

const CustomerNotification = () => {
  // Dummy data for subscribed farmers and their new items
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulating an API fetch with dummy data
    const dummyNotifications = [
      {
        id: 1,
        farmer: "John Doe",
        item: "Organic Tomatoes",
        date: "2025-02-02",
      },
      {
        id: 2,
        farmer: "Emma Smith",
        item: "Fresh Strawberries",
        date: "2025-02-01",
      },
      {
        id: 3,
        farmer: "Liam Johnson",
        item: "Farm Fresh Eggs",
        date: "2025-02-01",
      },
    ];
    setNotifications(dummyNotifications);
  }, []);

  return (
    <div className="notification-container">
      <h2 className="notification-title">Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="notification-list">
          {notifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              <p>
                <strong>{notification.farmer}</strong> added
                <span className="notification-item-name"> {notification.item}</span>
              </p>
              <p className="notification-date">{notification.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-notifications">No new notifications.</p>
      )}
    </div>
  );
};

export default CustomerNotification;
