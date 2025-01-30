import React from "react";
import "./CustomerNavbar.css"; // Import CSS file

const CustomerNavbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#">Mobiles</a></li>
        <li><a href="#">Fashion</a></li>
        <li><a href="#">Electronics</a></li>
        <li><a href="#">Home & Furniture</a></li>
        <li><a href="#">Appliances</a></li>
        <li><a href="#">Flight Bookings</a></li>
        <li><a href="#">Beauty, Toys & More</a></li>
        <li><a href="#">Two Wheelers</a></li>
      </ul>
    </nav>
  );
};

export default CustomerNavbar;
