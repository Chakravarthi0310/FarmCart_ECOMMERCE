import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerCart.css"; // Import the CSS file for styling

import CustomerNavbar from "../../components/CustomerNavbar";
const CustomerCart = () => {
  const navigate = useNavigate();

  // Dummy items in cart with numeric price values and an initial quantity.
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Tomatoes",
      price: 50, // Price per unit (e.g., per kg)
      unit: "kg",
      image: "../../assets/tomatoes.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Potatoes",
      price: 30, // Price per unit (e.g., per kg)
      unit: "kg",
      image: "../../assets/potato.jpg",
      quantity: 1,
    },
    // Add more items if needed
  ]);

  // Payment method state (default to Cash on Delivery)
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Increase the quantity of an item
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease the quantity of an item (but not below 1)
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  // Optionally, a function to remove an item from the cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate the total price dynamically
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle the payment process
  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate payment processing
    alert(`Proceeding with payment.\nPayment Method: ${paymentMethod}\nTotal Amount: ₹${totalPrice}`);
    // In a real app, proceed to payment gateway or success page
    navigate("/customer-dashboard");
  };

  return (
    <div className="Cart">
      <CustomerNavbar />
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>
                    Price: ₹{item.price} per {item.unit}
                  </p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <p>Subtotal: ₹{item.price * item.quantity}</p>
                </div>
                <button className="remove-item" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ₹{totalPrice}</h3>
          </div>
          <form onSubmit={handlePayment} className="payment-form">
            <h3>Select Payment Method</h3>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="PhonePay"
                  checked={paymentMethod === "PhonePay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                PhonePay
              </label>
            </div>
            <button type="submit" className="payment-button">
              Proceed to Payment
            </button>
          </form>
        </>
      )}
    </div>

    </div>
  );
};

export default CustomerCart;
