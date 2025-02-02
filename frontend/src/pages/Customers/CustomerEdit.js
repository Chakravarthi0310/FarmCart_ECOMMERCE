import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CustomerNavbar from "../../components/CustomerNavbar";

import "./CustomerEdit.css"; // Import CSS for styling

const CustomerEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setMobile] = useState("");
  const [address, setAddress] = useState("");
  // const [bankDetails, setBankDetails] = useState("");

  const navigate = useNavigate();

  // Fetch the data from localStorage when the component mounts
  useEffect(() => {
    const customerData = JSON.parse(localStorage.getItem("customerData"));
    if (customerData) {
      setName(customerData.name);
      setEmail(customerData.email);
      setMobile(customerData.phone);
      setAddress(customerData.address);
      // setBankDetails(customerData.bankDetails);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    // Save the updated data to localStorage
    const updatedData = { name, email, phone, address};
    localStorage.setItem("customerData", JSON.stringify(updatedData));

    alert("Profile updated successfully!");
    // Navigate back to the profile or dashboard page
    navigate("/customer-Dashboard");
  };

  return (


    <div className="Edit">
      <CustomerNavbar />

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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="edit-input"
            required
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={phone}
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


          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>

    </div>

  );
};

export default CustomerEdit;
