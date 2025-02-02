import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerProfile.css"; // Import the CSS file for styling
import "./../../components/CustomerNavbar"
import CustomerNavbar from "./../../components/CustomerNavbar";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    // Fetch the customer data from localStorage
    const data = JSON.parse(localStorage.getItem("customerData"));
    if (data) {
      setCustomerData(data);
    }
  }, []);

  if (!customerData) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  return (
<<<<<<< HEAD
    <>
    <CustomerNavbar/>
    <div className="profile-container">
      <div className="profile-box">
        <h2 className="profile-title">Customer Profile</h2>
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {customerData.name}
          </p>
          <p>
            <strong>Email:</strong> {customerData.email}
          </p>

          <p>
            <strong>Mobile:</strong> {customerData.mobile}
          </p>
          <p>
            <strong>Address:</strong> {customerData.address}
          </p>
          <p>
            <strong>Bank Details:</strong> {customerData.bankDetails}
          </p>
        </div>
        <button
          className="edit-profile-button"
          onClick={() => navigate("/customer-edit")}
        >
          Edit Profile
        </button>
      </div>
    </div>
    </>
=======
    </div>

>>>>>>> eb69791d8ece63bcdf22eeed5c46f699c68911be
  );
};

export default CustomerProfile;
