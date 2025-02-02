// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CustomerNavbar from "../../components/CustomerNavbar";
// import "./CustomerDashboard.css";

// const dummyProducts = [
//   { id: 1, name: "Apple", category: "fruits", price: "₹100/kg", expiry: "10 days", image: "/apple.jpg" },
//   { id: 2, name: "Carrot", category: "vegetables", price: "₹50/kg", expiry: "5 days", image: "/carrot.jpg" },
//   { id: 3, name: "Rice", category: "grains", price: "₹80/kg", expiry: "6 months", image: "/rice.jpg" },
//   { id: 4, name: "Milk", category: "dairy", price: "₹60/L", expiry: "3 days", image: "/milk.jpg" },
//   { id: 5, name: "Eggs", category: "poultry", price: "₹6/egg", expiry: "7 days", image: "/eggs.jpg" }
// ];

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



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "../../components/CustomerNavbar";
import "./CustomerDashboard.css";

const dummyProducts = [
  { id: 1, name: "Apple", category: "fruits", price: "₹100/kg", expiry: "10 days", rating: 4.5, image: "/apple.jpg" },
  { id: 2, name: "Carrot", category: "vegetables", price: "₹50/kg", expiry: "5 days", rating: 3.8, image: "/carrot.jpg" },
  { id: 3, name: "Rice", category: "grains", price: "₹80/kg", expiry: "6 months", rating: 4.2, image: "/rice.jpg" },
  { id: 4, name: "Milk", category: "dairy", price: "₹60/L", expiry: "3 days", rating: 3.5, image: "/milk.jpg" },
  { id: 5, name: "Eggs", category: "poultry", price: "₹6/egg", expiry: "7 days", rating: 4.0, image: "/eggs.jpg" },
  // Additional dummy products
  { id: 6, name: "Banana", category: "fruits", price: "₹40/kg", expiry: "7 days", rating: 4.1, image: "/banana.jpg" },
  { id: 7, name: "Broccoli", category: "vegetables", price: "₹70/kg", expiry: "4 days", rating: 3.2, image: "/broccoli.jpg" },
  { id: 8, name: "Wheat", category: "grains", price: "₹90/kg", expiry: "8 months", rating: 2.8, image: "/wheat.jpg" },
  { id: 9, name: "Cheese", category: "dairy", price: "₹150/kg", expiry: "2 weeks", rating: 4.7, image: "/cheese.jpg" },
  { id: 10, name: "Chicken", category: "poultry", price: "₹200/kg", expiry: "2 days", rating: 4.3, image: "/chicken.jpg" }
];

const CustomerDashboard = () => {
  // Main filter states used for filtering products:
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  // State for showing/hiding the filter dropdown
  const [filterOpen, setFilterOpen] = useState(false);
  // Temporary states for the filter form (to allow changes before saving)
  const [filterCategory, setFilterCategory] = useState(selectedCategory);
  const [filterRating, setFilterRating] = useState(ratingFilter);

  const navigate = useNavigate();

  // Apply filter changes and close the dropdown
  const applyFilters = () => {
    setSelectedCategory(filterCategory);
    setRatingFilter(filterRating);
    setFilterOpen(false);
  };

  // Filtering products based on search, category, and rating
  const filteredProducts = dummyProducts.filter(product => {
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
          {["all", "fruits", "vegetables", "grains", "dairy", "poultry"].map(category => (
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
              <p>Expiry: {product.expiry}</p>
              <p>Rating: {product.rating}</p>
              <div className="buttons">
                <button className="wishlist">❤️ Wishlist</button>
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
