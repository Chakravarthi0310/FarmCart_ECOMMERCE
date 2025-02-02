import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FarmerEdit.css";
import Navbar from "./FarmerNavbar";

const API_BASE_URL = "http://localhost:5000/api/farmer"; // Change to your actual backend URL

const FarmerEdit = () => {
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState({
    id: "",
    name: "",
    phone: "",
    address: ""
  });

  // Fetch farmer data when the component loads
  useEffect(() => {
    const storedFarmer = JSON.parse(localStorage.getItem("farmerData"));
    if (storedFarmer) {
      setFarmer(storedFarmer);
    } else {
      alert("No farmer data found!");
      navigate("/farmer-login");
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setFarmer({ ...farmer, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${API_BASE_URL}/update/${farmer.id}`, farmer);
      
      if (response.data.success) {
        localStorage.setItem("farmerData", JSON.stringify(farmer));
        alert("✅ Profile updated successfully!");
        navigate("/farmer-dashboard");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("❌ Failed to update profile. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-container">
        <div className="edit-box">
          <h2 className="edit-title">Edit Profile</h2>
          <form onSubmit={handleSave} className="edit-form">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={farmer.name}
              onChange={handleChange}
              className="edit-input"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={farmer.phone}
              onChange={handleChange}
              className="edit-input"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={farmer.address}
              onChange={handleChange}
              className="edit-input"
              required
            />
            <button type="submit" className="save-button">Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FarmerEdit;
