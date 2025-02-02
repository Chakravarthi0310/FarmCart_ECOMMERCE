import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { FaBellConcierge } from "react-icons/fa6";
import "./CustomerNavbar.css"; // Import the CSS file

const CustomerNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false); // Close dropdown after navigation
  };

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem("authToken"); // Remove token
    localStorage.removeItem("userData"); // Remove user data (if stored)

    console.log("User logged out successfully.");

    // Redirect to the login page
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo and Website Name */}
        <div className="logo">
          <img src="/assets/logo.jpg" className="logo-img" alt="Logo" />
          <span className="FarmCart">FarmCart</span>
        </div>

        {/* Search Bar */}

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
        {/* <div className="search-bar"> */}
          {/* <input type="text" placeholder="Search..." /> */}
          {/* <button className="search-btn"> */}
            {/* <FaSearch /> */}
          {/* </button> */}
        {/* </div> */}

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
