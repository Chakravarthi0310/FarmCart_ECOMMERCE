import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/Admin/AdminLogin";
import FarmerLogin from "./pages/Farmers/FarmerLogin";
import CustomerLogin from "./pages/Customers/CustomerLogin";
import FarmerRegister from "./pages/Farmers/FarmerRegister";
import CustomerRegister from "./pages/Customers/CustomerRegister";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import FarmerDashboard from "./pages/Farmers/FarmerDashboard";
import AddNewItem from "./pages/Farmers/AddNewItem";
import ItemDetails from "./pages/Farmers/ItemDetails";
import CustomerDashboard from "./pages/Customers/CustomerDashboard";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/farmer-login" element={<FarmerLogin />} />
      <Route path="/consumer-login" element={<CustomerLogin />} />
      <Route path="/farmer-register" element={<FarmerRegister />} />
      <Route path="/consumer-register" element={<CustomerRegister />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/FarmerDashboard" element={<FarmerDashboard />} />
      <Route path="/add-item" element={<AddNewItem />} />
      <Route path="/item/:id" element={<ItemDetails />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
    </Routes>
  );
}

export default App;
