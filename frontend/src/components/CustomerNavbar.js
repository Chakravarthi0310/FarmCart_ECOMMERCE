import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Link } from "react-router-dom"; // React Router for navigation
import "./CustomerNavbar.css"; // Import the CSS file

const CustomerNavbar = () => {
  return (
    <div className="wrapper">
      <div className="navigation-bar">
        <div className="container navbar-container">
          {/* Logo */}
          <div className="logo">
            <img src="/images/FarmCart_logo.jpg" alt="FarmCart Logo" width="200px" />
          </div>

          {/* Search Box */}
          <div className="search-area">
            <form action="" method="post">
              <input type="text" name="search_box" className="search_box" placeholder="Search products..." />
              <button className="search_btn btn btn-success">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          {/* Greeting User */}
          <div className="greeting">
            <p>
              Hello! <span className="name">Jagadeesh</span>
            </p>
          </div>

          {/* User Menu */}
          <div className="user-menu">
            <ul>
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  id="accountDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user"></i> My Account
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <Link to="/profile" className="dropdown-item">
                    <i className="fas fa-users"></i> Your Profile
                  </Link>
                  <Link to="/orders" className="dropdown-item">
                    <i className="fas fa-cube"></i> Your Orders
                  </Link>
                  <Link to="/wishlist" className="dropdown-item">
                    <i className="fas fa-heart"></i> Your Wishlist
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/signin" className="dropdown-item text-center">
                    <i className="fas fa-sign-in-alt"></i> SIGN IN
                  </Link>
                  <Link to="/login" className="dropdown-item text-center bg-danger text-white">
                    <i className="fas fa-user"></i> LOGIN
                  </Link>
                </div>
              </li>
              <li>
                <Link to="/cart">
                  <i className="fas fa-shopping-cart"></i> Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerNavbar;


