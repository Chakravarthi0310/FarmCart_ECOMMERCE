import { useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import "./CustomerNavbar.css"; // Import the CSS file

const CustomerNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Website Name */}
        <a className="logo" href="#">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <span className="website-name">Website Name</span>
        </a>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button><FaSearch /></button>
        </div>

        {/* Account Dropdown, Wishlist, and Cart */}
        <div className="nav-icons">
          {/* My Account Dropdown */}
          <div className="dropdown">
            <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <FaUser className="icon" /> My Account
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><a href="#">Profile</a></li>
                <li><a href="#">Orders</a></li>
                <li><a href="#">Subscriptions</a></li>
                <li className="divider"></li>
                <li><a href="#" className="logout">Logout</a></li>
              </ul>
            )}
          </div>

          {/* Wishlist and Cart Icons */}
          <a href="#" className="icon-link"><FaHeart className="icon" /></a>
          <a href="#" className="icon-link"><FaShoppingCart className="icon" /></a>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
