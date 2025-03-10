import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "../../components/CustomerNavbar";
import "./CustomerDashboard.css";
import useCustomer from "../../hooks/useCustomer";
import PopupMessage from "../../components/PopupMessage";

const CustomerDashboard = () => {
  // Products and wishlist state:
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  // popups
  const [popupMessage, setPopupMessage] = useState("");
  // Filtering states:
  const [searchTerm, setSearchTerm] = useState("");
  // **Unified category state used in both category bar and filter dropdown:**
  const [selectedCategory, setSelectedCategory] = useState("all");
  // Rating filter remains separate (you can choose to unify it in a similar way if desired)
  const [ratingFilter, setRatingFilter] = useState("all");

  // State for controlling the filter dropdown's open/close
  const [filterOpen, setFilterOpen] = useState(false);
  // Temporary state for rating filter (if you want to allow changes before applying)
  const [filterRating, setFilterRating] = useState(ratingFilter);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { handleGetApprovedProducts, handleAddToWishList, handleAddToCart } = useCustomer();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const approvedProducts = await handleGetApprovedProducts();
        console.log(approvedProducts);
        setProducts(approvedProducts);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [handleGetApprovedProducts]);

  // Apply filter changes for rating and close the dropdown.
  // The category filter is already live via selectedCategory.
  const applyFilters = () => {
    setRatingFilter(filterRating);
    setFilterOpen(false);
  };

  const toggleWishlist = async (productId) => {
    try {
      await handleAddToWishList(productId);
  
      setWishlist((prevWishlist) =>
        prevWishlist.includes(productId)
          ? prevWishlist.filter((id) => id !== productId) // Remove if already present
          : [...prevWishlist, productId] // Add if not present
      );
  
      setPopupMessage("Product added to wishlist! ✅");
      setTimeout(() => {
        setPopupMessage("");
      }, 3000);
    } catch (e) {
      alert("Error adding to wishlist");
    }
  };
  

  const toggleCartlist = async (productId) => {
    try {
      await handleAddToCart(productId);
      setPopupMessage("Product added to Cartlist! ✅");
      setTimeout(() => {
        setPopupMessage("");
      }, 3000);
    } catch (e) {
      alert("Error adding to cart");
    }
  };

  // Filtering products based on search term, category, and rating
  const filteredProducts = products.filter(product => {
    const categoryMatch =
      selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    let ratingMatch = true;
    if (ratingFilter !== "all") {
      if (ratingFilter === "4 and above") {
        ratingMatch = product.rating >= 4;
      } else if (ratingFilter === "3 and above") {
        ratingMatch = product.rating >= 3;
      } else if (ratingFilter === "2 and above") {
        ratingMatch = product.rating >= 2;
      } else if (ratingFilter === "less than 2") {
        ratingMatch = product.rating < 2;
      }
    }
    return categoryMatch && searchMatch && ratingMatch;
  });

  return (
    <div className="dashboard">
      <CustomerNavbar />
      
      {popupMessage && <PopupMessage message={popupMessage} onClose={() => setPopupMessage("")} />}

      {/* Top bar: Category Bar and Filter Toggle */}
      <div className="filter-container">
        <div className="category-bar">
          {["all", "Fruits", "Vegetables", "Grains", "Dairy", "Poultry"].map(category => (
            <button 
              key={category} 
              // Compare in lowercase to ensure consistency:
              className={selectedCategory === category.toLowerCase() ? "active" : ""} 
              onClick={() => setSelectedCategory(category.toLowerCase())}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <button 
          className="filter-toggle" 
          onClick={() => {
            // Sync the temporary rating filter with the current rating filter when toggling
            setFilterRating(ratingFilter);
            setFilterOpen(!filterOpen);
          }}
        >
          Filter Options
        </button>
      </div>

      {/* Filter Dropdown */}
      {filterOpen && (
        <div className="filter-dropdown">
          <div className="filter-group">
            <label>Category:</label>
            <select
              // Use the same selectedCategory for the dropdown so that any changes are live
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {["all", "fruits", "vegetables", "grains", "dairy", "poultry"].map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Ratings:</label>
            <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
              <option value="all">All</option>
              <option value="4 and above">4 and above</option>
              <option value="3 and above">3 and above</option>
              <option value="2 and above">2 and above</option>
              <option value="less than 2">Less than 2</option>
            </select>
          </div>
          <button className="filter-save" onClick={applyFilters}>
            Save
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product Display */}
      <div className="product-grid">
        {loading ? (
          <p className="no-results">Loading...</p>
        ) : error ? (
          <p className="no-results">{error}</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id || product.id} className="product-card">
              <img
                className="product-image"
                src={
                  product.image?.data
                    ? `data:${product.image.contentType};base64,${btoa(
                        new Uint8Array(product.image.data.data).reduce(
                          (data, byte) => data + String.fromCharCode(byte),
                          ""
                        )
                      )}`
                    : "../../assets/default.jpg"
                }
                onClick={() => navigate(`/product-details/${product._id}`)}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>Price Rs.{product.price}</p>
              <p>Available stock: {product.quantity} kgs</p>
              <p>Expiry: {new Date(product.expiryDate).toLocaleDateString()}</p>
              <p>Rating: {product.ratings}</p>
              <div className="buttons">
                <button 
                  className="wishlist"
                  onClick={() => toggleWishlist(product._id)}
                  style={{ color: wishlist.includes(product._id) ? "red" : "black" }}
                >
                  ❤️ Wishlist
                </button>
                <button 
                  className="add-to-cart"
                  onClick={() => toggleCartlist(product._id)}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;

