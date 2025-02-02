import React from "react";
import Navbar from "./FarmerNavbar";
import "./FarmerProfile.css";

const FarmerProfile = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 98765 43210",
    location: "Andhra Pradesh, India",
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2>👤 Profile</h2>
        <div className="profile-card">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Location:</strong> {user.location}</p>
        </div>
      </div>
    </>
  );
};

export default FarmerProfile;
