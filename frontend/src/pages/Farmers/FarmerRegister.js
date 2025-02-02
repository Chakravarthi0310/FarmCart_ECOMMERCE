import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Import the authentication hook
import "./FarmerRegister.css"; // Import external CSS

const FarmerRegister = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  
  const { user, loading, error,login,register } = useAuth(); // Use the register function from the authentication hook
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    const userData = { name, password, phone:mobile,address };

    try {
      const response = await register("farmer", userData);
      alert("✅ Farmer Registered Successfully!");
      console.log(response)
      navigate("/farmer-dashboard"); // Redirect after successful registration
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (  
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">🚜 Farmer Registration</h2>
        
        {error && <p className="error-message">❌ {error}</p>}

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
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Navigation Links */}
        <p className="register-text">
          Already have an account?{" "}
          <button onClick={() => navigate("/farmer-login")} className="register-link">
            Login here
          </button>
        </p>
        <p className="register-text">
          Are you a Customer?{" "}
          <button onClick={() => navigate("/customer-register")} className="register-link customer-link">
            Register as Customer
          </button>
        </p>
      </div>
    </div>
  );
};

export default FarmerRegister;
