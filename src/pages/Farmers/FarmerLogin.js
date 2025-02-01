import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerLogin.css"; // Import CSS

const FarmerLogin = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error handling
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    try {
      const response = await fetch("http://localhost:5000/api/farmer-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Farmer Login Successful!");
        navigate("/farmer-dashboard"); // Redirect to dashboard
      } else {
        setError(data.message || "❌ Invalid credentials");
      }
    } catch (err) {
      setError("⚠️ Server error, please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">🚜 Farmer Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="tel"
            placeholder="Enter Mobile No."
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="login-input"
            pattern="[0-9]{10}"
            maxLength="10"
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          {error && <p className="error-text">{error}</p>} {/* Show error message */}
          <button type="submit" className="login-button">Login</button>
        </form>

        <p className="register-text">
          New user?{" "}
          <button onClick={() => navigate("/farmer-register")} className="register-link">
            Register here
          </button>
        </p>
        <p className="login-text">
          Are you a Customer?{" "}
          <button
            onClick={() => navigate("/customer-login")}
            className="login-link customer-link"
          >
            Login as Customer
          </button>
          </p>
      </div>
    </div>
  );
};

export default FarmerLogin;
