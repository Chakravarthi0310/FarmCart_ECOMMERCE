import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerRegister.css"; // Import external CSS

const FarmerRegister = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    // Here, you would normally send data to the backend for registration
    alert("✅ Farmer Registered Successfully!");
    navigate("/farmer-login");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">🚜 Farmer Registration</h2>
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="text"
            placeholder="Bank Account Details"
            value={bankDetails}
            onChange={(e) => setBankDetails(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="register-input"
            required
          />
          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        {/* Navigation Links */}
        <p className="register-text">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/farmer-login")}
            className="register-link"
          >
            Login here
          </button>
        </p>
        <p className="register-text">
          Are you a Customer?{" "}
          <button
            onClick={() => navigate("/customer-register")}
            className="register-link customer-link"
          >
            Register as Customer
          </button>
        </p>
      </div>
    </div>
  );
};

export default FarmerRegister;
