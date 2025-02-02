import React, { useState, useEffect } from "react";
import "./CustomerWishlist.css"; // Import the CSS file
import CustomerNavbar from "../../components/CustomerNavbar";
const CustomerWishlist = () => {
  // Dummy wishlist data
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Simulating an API fetch with dummy data
    const dummyWishlist = [
      {
        id: 1,
        foodName: "Organic Tomatoes",
        foodType: "Vegetable",
        price: "$5 per kg",
        farmerName: "John Doe",
        farmerPhone: "123-456-7890",
      },
      {
        id: 2,
        foodName: "Fresh Strawberries",
        foodType: "Fruit",
        price: "$8 per box",
        farmerName: "Emma Smith",
        farmerPhone: "987-654-3210",
      },
      {
        id: 3,
        foodName: "Farm Fresh Eggs",
        foodType: "Dairy",
        price: "$3 per dozen",
        farmerName: "Liam Johnson",
        farmerPhone: "456-789-1230",
      },
    ];
    setWishlist(dummyWishlist);
  }, []);

  const handleAddToCart = (item) => {
    alert(`${item.foodName} added to cart!`);
  };

  return (

    <div className="Wishlist">
     <CustomerNavbar />
    <div className="wishlist-container">
      <h2 className="wishlist-title">Your Wishlist</h2>
      {wishlist.length > 0 ? (
        <ul className="wishlist-list">
          {wishlist.map((item) => (
            <li key={item.id} className="wishlist-item">
              <p><strong>{item.foodName}</strong> ({item.foodType})</p>
              <p className="wishlist-price">Price: {item.price}</p>
              <p>Farmer: {item.farmerName}</p>
              <p>Contact: {item.farmerPhone}</p>
              <button 
                className="wishlist-add-to-cart" 
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-items">No items in your wishlist.</p>
      )}
    </div>
    </div>
  );
};

export default CustomerWishlist;
