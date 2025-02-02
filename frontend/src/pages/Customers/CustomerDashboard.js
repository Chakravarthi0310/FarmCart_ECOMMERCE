import React from "react";
import CustomerNavbar from "../../components/CustomerNavbar";
import "./CustomerDashboard.css";

const CustomerDashboard = () => {
  return (
    <div className="dashboard">
      <CustomerNavbar />
      <div className="dashboard-content">
        <h1>Welcome to Customer Dashboard</h1>
        <p>Manage your profile, orders, and wishlist here.</p>
      </div>
    </div>
  );
};

export default CustomerDashboard;
