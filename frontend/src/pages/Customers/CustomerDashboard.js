
// const CustomerDashboard = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const navigate = useNavigate();

//   const filteredProducts = dummyProducts.filter(product =>
//     (selectedCategory === "all" || product.category === selectedCategory) &&
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="dashboard">
//       <CustomerNavbar />
      
//       {/* Category Bar */}
//       <div className="category-bar">
//         {["all", "fruits", "vegetables", "grains", "dairy", "poultry"].map(category => (
//           <button 
//             key={category} 
//             className={selectedCategory === category ? "active" : ""} 
//             onClick={() => setSelectedCategory(category)}
//           >
//             {category.charAt(0).toUpperCase() + category.slice(1)}
//           </button>
//         ))}
//       </div>
      
//       {/* Search Bar */}
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search for products..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
      
//       {/* Product Display */}
//       <div className="product-grid">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <div key={product.id} className="product-card">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 onClick={() => navigate(`/product-details/${product.id}`)}
//               />
//               <h3>{product.name}</h3>
//               <p>{product.price}</p>
//               <p>Expiry: {product.expiry}</p>
//               <div className="buttons">
//                 <button className="wishlist">❤️ Wishlist</button>
//                 <button className="add-to-cart">🛒 Add to Cart</button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="no-results">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "../../components/CustomerNavbar";
import "./CustomerDashboard.css";
import useCustomer from "../../hooks/useCustomer";



const CustomerDashboard = () => {
  // Main filter states used for filtering products:
  const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);


  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  // State for showing/hiding the filter dropdown
  const [filterOpen, setFilterOpen] = useState(false);
  // Temporary states for the filter form (to allow changes before saving)
  const [filterCategory, setFilterCategory] = useState(selectedCategory);
  const [filterRating, setFilterRating] = useState(ratingFilter);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const { handleGetApprovedProducts, handleAddToWishList, handleGetWishlist } = useCustomer();
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
  }, []);

  // Apply filter changes and close the dropdown
  const applyFilters = () => {
    setSelectedCategory(filterCategory);
    setRatingFilter(filterRating);
    setFilterOpen(false);
  };

  const toggleWishlist = async (productId) => {
       try{
      await handleAddToWishList(productId);
          setWishlist((prevWishlist) =>
            prevWishlist.includes(productId)
              ? prevWishlist.filter((id) => id !== productId)
              : [...prevWishlist, productId]
          );
      alert("Added to wishlist successfully");
    }catch(e){
      alert("Error adding to wishLIst")
    }
      };

  // Filtering products based on search, category, and rating
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
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

      {/* Top bar: Category Bar and Filter Toggle */}
      <div className="filter-container">
        <div className="category-bar">
          {["all", "Fruits", "Vegetables", "Grains", "Dairy", "Poultry"].map(category => (
            <button 
              key={category} 
              className={selectedCategory === category ? "active" : ""} 
              onClick={() => {
                setSelectedCategory(category);
                // Sync the temporary filter form as well
                setFilterCategory(category);
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <button 
          className="filter-toggle" 
          onClick={() => {
            // Sync temporary filter values with current filters before toggling
            setFilterCategory(selectedCategory);
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
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
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
          <button className="filter-save" onClick={applyFilters}>Save</button>
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
                onClick={() => navigate(`/product-details/${product.id}`)}
              />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <p>Expiry: {new Date(product.expiryDate).toLocaleDateString()}</p>
              <p>Rating: {product.ratings}</p>
              <div className="buttons">
                <button className="wishlist"
                onClick={()=>toggleWishlist(product._id)}
                                  style={{ color: wishlist.includes(product._id) ? "red" : "black" }}

                
                >❤️ Wishlist</button>
                <button className="add-to-cart">🛒 Add to Cart</button>
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
