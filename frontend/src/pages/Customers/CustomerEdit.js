import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerEdit.css"; // Import CSS for styling

const CustomerEdit = () => {
  // Prepopulate with existing data; in a real app, this might come from props, context, or an API
  const [name, setName] = useState("John Doe");
  const[email,setEmail] = useState("john@example.com")
  const [mobile, setMobile] = useState("123-456-7890");
  const [address, setAddress] = useState("123 Main Street, City, Country");
  const [bankDetails, setBankDetails] = useState("Bank: XYZ | Account No: 1234567890");

  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    // Here, you would normally update the customer details via an API call
    alert("Profile updated successfully!");
    // After saving, navigate back to the customer profile page
    navigate("/customer-Dashboard");
  };

  return (
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
                    <input
            type="text"
            placeholder="Full Name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="edit-input"
            required
          />

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
          <input
            type="text"
            placeholder="Bank Account Details"
            value={bankDetails}
            onChange={(e) => setBankDetails(e.target.value)}
            className="edit-input"
            required
          />
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerEdit;
