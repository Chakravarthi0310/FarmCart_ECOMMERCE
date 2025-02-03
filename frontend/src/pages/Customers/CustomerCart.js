import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerCart.css"; // Import the CSS file for styling
import CustomerNavbar from "../../components/CustomerNavbar";
import useCustomer from "../../hooks/useCustomer"; // Import the custom hook

const CustomerCart = () => {
  const navigate = useNavigate();
  const { handleGetCart, loading, error } = useCustomer(); // Import handleGetCart
  const [cartItems, setCartItems] = useState([]); // Initially empty cart
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Fetch cart data from API when the component mounts
  useEffect(() => {
    const fetchCart = async () => {
      const response = await handleGetCart();
      console.log(response);
      if (response) {
        setCartItems(response); // Set cart items from API response
      }
    };
    fetchCart();
  }, []);

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity (not below 1)
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove an item from the cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle payment process
  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Proceeding with payment.\nPayment Method: ${paymentMethod}\nTotal Amount: ₹${totalPrice}`);
    navigate("/customer-dashboard");
  };

  return (
    <div className="Cart">
      <CustomerNavbar />
      <div className="cart-container">
        <h2 className="cart-title">Your Cart</h2>

        {loading ? (
          <p>Loading cart...</p>
        ) : error ? (
          <p>Error fetching cart: {error}</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Price: ₹{item.price} per {item.unit}</p>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                    <p>Subtotal: ₹{item.price * item.quantity}</p>
                  </div>
                  <button className="remove-item" onClick={() => removeItem(item.id)}>Remove</button>
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
