
import React from "react";
import { Routes, Route } from "react-router-dom";
import FarmerLogin from "./pages/Farmers/FarmerLogin";
import CustomerLogin from "./pages/Customers/CustomerLogin";
import FarmerRegister from "./pages/Farmers/FarmerRegister";
import CustomerRegister from "./pages/Customers/CustomerRegister";
import FarmerDashboard from "./pages/Farmers/FarmerDashboard";
import AddNewItem from "./pages/Farmers/AddNewItem";
import ItemDetails from "./pages/Farmers/ItemDetails";
import CustomerDashboard from "./pages/Customers/CustomerDashboard";
import CustomerProfile from "./pages/Customers/CustomerProfile";
import CustomerEdit from "./pages/Customers/CustomerEdit";
import CustomerCart from "./pages/Customers/CustomerCart"; 
import CustomerPayment from "./pages/Customers/CustomerPayment"; 
import CustomerOrders from "./pages/Customers/CustomerOrders";
import CustomerWishlist from "./pages/Customers/CustomerWishlist";
import CustomerNotifications from "./pages/Customers/CustomerNotifications";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/routes/ProtectedRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/farmer-login" element={<FarmerLogin />} />
      <Route path="/customer-login" element={<CustomerLogin />} />
      <Route path="/farmer-dashboard" element={<FarmerDashboard/>} />
      {/* <Route path="/farmer-dahsboard" element={<ProtectedRoute role="farmer"><FarmerDashboard/></ProtectedRoute>}></Route> */}
      <Route path="/customer-dashboard" element={<ProtectedRoute role="customer"><CustomerDashboard/></ProtectedRoute>}></Route>
      <Route path="/farmer-register" element={<FarmerRegister />} />
      <Route path="/customer-register" element={<CustomerRegister />} />
      
      <Route path="/add-item" element={<AddNewItem />} />
      <Route path="/item/:id" element={<ItemDetails />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      <Route path="/customer-profile" element={<CustomerProfile />} />
       <Route path="/customer-edit" element={<CustomerEdit />} />
       <Route path="/customer-cart" element={<CustomerCart />} />
       <Route path="/customer-pay" element={<CustomerPayment/>}/>
       <Route path="/customer-notification" element={<CustomerNotifications/>}/>
       <Route path="/customer-wishlist" element={<CustomerWishlist/>}/>
       <Route path="/customer-orders" element={<CustomerOrders/>}/>
    </Routes>
  );
}

export default App;


// import Navbar from "./Components/Navbar/Navbar";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Shop from "./Pages/Shop";
// import Cart from "./Pages/Cart";
// import Product from "./Pages/Product";
// import Footer from "./Components/Footer/Footer";
// import ShopCategory from "./Pages/ShopCategory";
// import women_banner from "./Components/Assets/banner_women.png";
// import men_banner from "./Components/Assets/banner_mens.png";
// import kid_banner from "./Components/Assets/banner_kids.png";
// import LoginSignup from "./Pages/LoginSignup";

// function App() {

//   return (
//     <div>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Shop gender="all" />} />
//           <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
//           <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
//           <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
//           <Route path='/product' element={<Product />}>
//             <Route path=':productId' element={<Product />} />
//           </Route>
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/login" element={<LoginSignup/>} />
//         </Routes>
//         <Footer />
//       </Router>
//     </div>
//   );
// }

// export default App;
