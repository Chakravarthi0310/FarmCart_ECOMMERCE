import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./ProductDetails.css";

// Dummy product data with additional details (farmerName and farmerNumber)
const dummyProducts = [
  { id: 1, name: "Apple", category: "fruits", price: "₹100/kg", expiry: "10 days", rating: 4.5, image: "/apple.jpg", farmerName: "John Doe", farmerNumber: "1234567890" },
  { id: 2, name: "Carrot", category: "vegetables", price: "₹50/kg", expiry: "5 days", rating: 3.8, image: "/carrot.jpg", farmerName: "Jane Doe", farmerNumber: "0987654321" },
  { id: 3, name: "Rice", category: "grains", price: "₹80/kg", expiry: "6 months", rating: 4.2, image: "/rice.jpg", farmerName: "Mark Smith", farmerNumber: "1112223333" },
  { id: 4, name: "Milk", category: "dairy", price: "₹60/L", expiry: "3 days", rating: 3.5, image: "/milk.jpg", farmerName: "Mary Jane", farmerNumber: "4445556666" },
  { id: 5, name: "Eggs", category: "poultry", price: "₹6/egg", expiry: "7 days", rating: 4.0, image: "/eggs.jpg", farmerName: "Chris P", farmerNumber: "7778889999" },
  { id: 6, name: "Banana", category: "fruits", price: "₹40/kg", expiry: "7 days", rating: 4.1, image: "/banana.jpg", farmerName: "John Doe", farmerNumber: "1234567890" },
  { id: 7, name: "Broccoli", category: "vegetables", price: "₹70/kg", expiry: "4 days", rating: 3.2, image: "/broccoli.jpg", farmerName: "Jane Doe", farmerNumber: "0987654321" },
  { id: 8, name: "Wheat", category: "grains", price: "₹90/kg", expiry: "8 months", rating: 2.8, image: "/wheat.jpg", farmerName: "Mark Smith", farmerNumber: "1112223333" },
  { id: 9, name: "Cheese", category: "dairy", price: "₹150/kg", expiry: "2 weeks", rating: 4.7, image: "/cheese.jpg", farmerName: "Mary Jane", farmerNumber: "4445556666" },
  { id: 10, name: "Chicken", category: "poultry", price: "₹200/kg", expiry: "2 days", rating: 4.3, image: "/chicken.jpg", farmerName: "Chris P", farmerNumber: "7778889999" },
  // Additional dummy product
  { id: 11, name: "Orange", category: "fruits", price: "₹80/kg", expiry: "8 days", rating: 4.0, image: "/orange.jpg", farmerName: "John Doe", farmerNumber: "1234567890" },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mainProduct, setMainProduct] = useState(null);
  const [showSimilar, setShowSimilar] = useState(false);

  // On mount or when id changes, find the product to display
  useEffect(() => {
    const product = dummyProducts.find(p => p.id === parseInt(id));
    setMainProduct(product);
  }, [id]);

  if (!mainProduct) {
    return <div className="product-details-container">Product not found.</div>;
  }

  // Get similar products (by category, excluding the main product)
  const similarProducts = dummyProducts.filter(
    product => product.category === mainProduct.category && product.id !== mainProduct.id
  );

  // Dummy Add to Cart function
  const handleAddToCart = () => {
    // Replace this with your cart logic
    alert(`${mainProduct.name} has been added to your cart!`);
  };

  return (
    <div className="product-details-container">
      <div className="main-product">
        <div className="main-image">
          <img src={mainProduct.image} alt={mainProduct.name} />
        </div>
        <div className="details">
          <h2>{mainProduct.name}</h2>
          <p><strong>Price:</strong> {mainProduct.price}</p>
          <p><strong>Expiry:</strong> {mainProduct.expiry}</p>
          <p><strong>Rating:</strong> {mainProduct.rating}</p>
          <p><strong>Farmer Name:</strong> {mainProduct.farmerName}</p>
          <p><strong>Farmer Number:</strong> {mainProduct.farmerNumber}</p>
          <div className="details-buttons">
            <button className="cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="similar-btn" onClick={() => setShowSimilar(!showSimilar)}>
              {showSimilar ? "Hide Similar Products" : "Show Similar Products"}
            </button>
          </div>
        </div>
      </div>
      { showSimilar && similarProducts.length > 0 && (
        <div className="similar-products">
          <h3>Similar Products</h3>
          <div className="similar-scroll">
            {similarProducts.map(product => (
              <div 
                key={product.id} 
                className="similar-item" 
                onClick={() => navigate(`/product-details/${product.id}`)}
              >
                <img src={product.image} alt={product.name} />
                <p className="similar-name">{product.name}</p>
                <p className="similar-price">{product.price}</p>
                <p className="similar-rating">Rating: {product.rating}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
