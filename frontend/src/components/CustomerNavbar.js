import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { FaBellConcierge } from "react-icons/fa6";
import logo from "../assets/logo.jpg"; // Correct import for logo

import "./CustomerNavbar.css"; // Import the CSS file

const CustomerNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false); // Close dropdown after navigation
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear authentication data
    console.log("User logged out successfully.");
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo and Website Name */}
        <div className="logo" onClick={() => navigate("/customer-dashboard")}>
          <img src={logo} className="logo-img" alt="logo" /> {/* Corrected logo import */}
          <span className="FarmCart">FarmCart</span>
        </div>

        {/* Account Dropdown, Wishlist, and Cart */}
        <div className="account">
          {/* My Account Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="dropdown-btn">
              <FaUser className="icon" /> My Account
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => handleNavigation("/customer-profile")}>
                  Profile
                </li>
                <li onClick={() => handleNavigation("/customer-orders")}>
                  Orders
                </li>
                <li onClick={() => handleNavigation("/customer-subscriptions")}>
                  Subscriptions
                </li>
                <li className="divider"></li>
                <li onClick={handleLogout} className="logout">
                  Logout
                </li>
              </ul>
            )}
          </div>

          {/* Wishlist, Cart, and Notifications */}
          <div className="icons">
            <button onClick={() => handleNavigation("/customer-wishlist")}>
              <FaHeart className="icon" />
            </button>
            <button onClick={() => handleNavigation("/customer-cart")}>
              <FaShoppingCart className="icon" />
            </button>
            <button onClick={() => handleNavigation("/customer-notification")}>
              <FaBellConcierge className="icon" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
