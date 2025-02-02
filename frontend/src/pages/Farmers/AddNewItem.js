import React, { useState } from "react";
import Navbar from "./FarmerNavbar"; // Import Navbar
import "./AddNewItem.css"; // Import your custom CSS

const AddNewItem = () => {
  const [newItem, setNewItem] = useState({ name: "", price: "" });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) {
      alert("❌ Please fill all fields!");
      return;
    }
    // Logic to send new item to the backend (e.g., API call for approval)
    console.log("Item submitted for approval:", newItem);
    setNewItem({ name: "", price: "" });
  };

  return (
    <>
      <Navbar />
      <div className="add-item-container">
        <h2>Add New Item</h2>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Price (₹/kg)"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="input-field"
        />
        <button onClick={handleAddItem} className="submit-button">
          Submit for Approval
        </button>
      </div>
    </>
  );
};

export default AddNewItem;
