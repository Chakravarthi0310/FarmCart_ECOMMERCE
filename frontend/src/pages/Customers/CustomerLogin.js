import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Importing custom authentication hook
<<<<<<< HEAD

=======
//import CustomerNavbar from "../../components/CustomerNavbar";
>>>>>>> eb69791d8ece63bcdf22eeed5c46f699c68911be
import "./CustomerLogin.css"; // Import CSS

const CustomerLogin = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, error } = useAuth(); // Using custom hook for authentication


  const handleLogin = async (e) => {
    e.preventDefault();

    const success = await login("customer",{ email, password },); // Passing phone instead of email

    if (success) {
      const token = success; // Adjust according to your login response
      localStorage.setItem("authToken", token); // Store token in localStorage

      alert("✅ Customer Login Successful!");
      navigate("/customer-dashboard"); // Redirect to dashboard
    }
  };

  return (
<<<<<<< HEAD
=======

>>>>>>> eb69791d8ece63bcdf22eeed5c46f699c68911be
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">🚜 Customer Login</h2>
        <form onSubmit={handleLogin} className="login-form">
        <input
  type="email"
  placeholder="Enter Email"
  value={email}
  onChange={(e) => setemail(e.target.value)}
  className="login-input"
  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
  required
/>          <input
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
          <button onClick={() => navigate("/customer-register")} className="register-link">
            Register here
          </button>
        </p>
        <p className="login-text">
          Are you a Farmer?{" "}
          <button
            onClick={() => navigate("/farmer-login")}
            className="login-link customer-link"
          >
            Login as Farmer
          </button>
          </p>
      </div>
    </div>
<<<<<<< HEAD
=======
  
>>>>>>> eb69791d8ece63bcdf22eeed5c46f699c68911be
  );
};

export default CustomerLogin;
