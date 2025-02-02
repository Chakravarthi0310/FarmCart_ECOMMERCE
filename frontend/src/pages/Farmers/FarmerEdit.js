import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerEdit.css"; // Import CSS for styling
import Navbar from "./FarmerNavbar";

const API_BASE_URL = "http://localhost:5000/api/farmer"; // Change to your actual backend URL

const FarmerEdit = () => {
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    // Here, you would normally update the customer details via an API call
    alert("Profile updated successfully!");
    // After saving, navigate back to the customer profile page
    navigate("/farmer-Dashboard");
  };

  return (
    <>
      <Navbar/>
    
    <div className="edit-container">
      <div className="edit-box">
        <h2 className="edit-title">Edit Profile</h2>
        <form onSubmit={handleSave} className="edit-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="edit-input"
            required
          />
                    {/* <input
            type="text"
            placeholder="Full Name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="edit-input"
            required
          /> */}

          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="edit-input"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="edit-input"
            required
          />
          {/* <input
            type="text"
            placeholder="Bank Account Details"
            value={bankDetails}
            onChange={(e) => setBankDetails(e.target.value)}
            className="edit-input"
            required
          /> */}
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default FarmerEdit;