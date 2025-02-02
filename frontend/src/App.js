
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
import CustomerSubscriptions from "./pages/Customers/CustomerSubscriptions"; 
import Home from "./pages/Home";
import ProtectedRoute from "./pages/routes/ProtectedRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/farmer-login" element={<FarmerLogin />} />
      <Route path="/customer-login" element={<CustomerLogin />} />
      <Route path="/farmer-dashboard" element={<ProtectedRoute role="farmer"><FarmerDashboard/></ProtectedRoute>}></Route>
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
       <Route path="/customer-subscriptions" element={<CustomerSubscriptions />} />

    </Routes>
  );
}

export default App;

