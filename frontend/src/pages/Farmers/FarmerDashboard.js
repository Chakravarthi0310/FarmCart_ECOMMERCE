import React, { useState } from "react";
import Navbar from "./FarmerNavbar"; // Import Navbar
import { Link } from "react-router-dom"; // Import Link for navigation
import "./FarmerDashboard.css"; // Import CSS

const FarmerDashboard = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Tomatoes", price: "₹50/kg", image: "../../assets/tomatoes.jpg" },
    { id: 2, name: "Potatoes", price: "₹30/kg", image: "../../assets/potatoes.jpg" },
    // Add more items if needed
  ]);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashboard-title">📋 Your Items</h2>

        {/* Grid Container */}
        <div className="items-list">
          {/* Add New Item Card */}
          <div className="item-card add-item-card">
            <Link to="/add-item" className="add-item-link">
              <h3>➕ Add New Item</h3>
            </Link>
          </div>

          {/* Display Existing Items */}
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <Link to={`/item/${item.id}`} className="item-link">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FarmerDashboard;
