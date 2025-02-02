import React, { useState } from "react";
import Navbar from "./FarmerNavbar"; // Import Navbar
import "./AddNewItem.css"; // Import your custom CSS

const AddNewItem = () => {
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    marketPrice: "",
    price: "",
    quantity: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewItem({ ...newItem, image: file });

      // Preview the selected image
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = () => {
    const { name, category, marketPrice, price, quantity, image } = newItem;

    if (!name || !category || !marketPrice || !price || !quantity || !image) {
      alert("❌ Please fill all fields and upload an image!");
      return;
    }

    // Logic to send new item data to the backend (e.g., API call)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("marketPrice", marketPrice);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image); // Sending image file

    console.log("Item submitted for approval:", newItem);

    // Reset form
    setNewItem({ name: "", category: "", marketPrice: "", price: "", quantity: "", image: null });
    setPreviewImage(null);
  };

  return (
    <>
      <Navbar />
      <div className="add-item-container">
        <h2>🆕 Add New Item</h2>

        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="input-field"
        />

        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          className="input-field"
        >
          <option value="">Select Category</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Grains">Grains</option>
        </select>

        <input
          type="text"
          placeholder="Market Price (₹/kg)"
          value={newItem.marketPrice}
          onChange={(e) => setNewItem({ ...newItem, marketPrice: e.target.value })}
          className="input-field"
        />

        <input
          type="text"
          placeholder="Your Price (₹/kg)"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="input-field"
        />

        <input
          type="number"
          placeholder="Quantity (kg)"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="input-field"
        />

        {/* Image Upload Field */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="input-field"
        />

        {/* Preview Uploaded Image */}
        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="Preview" />
          </div>
        )}

        <button onClick={handleAddItem} className="submit-button">
          ✅ Submit for Approval
        </button>
      </div>
    </>
  );
};

export default AddNewItem;
