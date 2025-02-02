import React from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerNavbar.css"; // Import external CSS
import { FaUserCircle, FaShoppingCart, FaBell } from "react-icons/fa"; // Icons

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Logo and FarmCart Text */}
      <div className="navbar-left" onClick={() => navigate("/dashboard")}>
        <img src="src\assets\logo.png" alt="FarmCart Logo" className="logo" />
        <h1 className="brand-name">FarmerCart</h1>
      </div>

      {/* Profile, Orders, and Notifications */}
      <div className="navbar-right">
        <button className="nav-item" onClick={() => navigate("/orders")}>
          <FaShoppingCart size={24} />
          <span>Orders</span>
        </button>
        <button className="nav-item" onClick={() => navigate("/notifications")}>
          <FaBell size={24} />
          <span>Notifications</span>
        </button>
        <button className="nav-item" onClick={() => navigate("/profile")}>
          <FaUserCircle size={24} />
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
