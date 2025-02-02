// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;
// // import React, { useState } from "react";
// // import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// // import FarmerDashboard from "./pages/FarmerDashboard";
// // import CustomerDashboard from "./pages/CustomerDashboard";
// // import AdminDashboard from "./pages/AdminDashboard";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";
// // import ProductDetails from "./pages/ProductDetails";
// // import Navbar from "./components/Shared/Navbar";

// // function App() {
// //   const [userType, setUserType] = useState(null);

// //   return (
// //     <Router>
// //       {/* <Navbar /> */}
// //       {!userType ? (
// //         <div className="user-selection">
// //           <h2>Are you a Farmer or a Consumer?</h2>
// //           <button onClick={() => setUserType("farmer")}>Farmer</button>
// //           <button onClick={() => setUserType("consumer")}>Consumer</button>
// //           <button onClick={() => setUserType("admin")}>Admin</button>
// //         </div>
// //       ) : (
// //         <Routes>
// //           <Route path="/" element={<Navigate to={`/${userType}-dashboard`} />} />
// //           <Route path="/register" element={<Register />} />
// //           <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
// //           <Route path="/customer-dashboard" element={<CustomerDashboard />} />
// //           <Route path="/admin-dashboard" element={<AdminDashboard />} />
// //           <Route path="/product/:id" element={<ProductDetails />} />
// //         </Routes>
// //       )}
// //     </Router>
// //   );
// // }

// // export default App;


// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import FarmerDashboard from "./pages/FarmerDashboard";
// import CustomerDashboard from "./pages/CustomerDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import FarmerRegister from "./pages/FarmerRegister";
// import ConsumerRegister from "./pages/ConsumerRegister";
// import FarmerLogin from "./pages/FarmerLogin";
// import ConsumerLogin from "./pages/ConsumerLogin";
// import Navbar from "./components/Shared/Navbar";

// function App({ role }) {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         {/* Redirect users based on their role */}
//         {role === "admin" && <Route path="/" element={<Navigate to="/admin-dashboard" />} />}
//         {role === "farmer" && <Route path="/" element={<Navigate to="/farmer-register" />} />}
//         {role === "consumer" && <Route path="/" element={<Navigate to="/consumer-register" />} />}

//         {/* Routes for different pages */}
//         <Route path="/farmer-register" element={<FarmerRegister />} />
//         <Route path="/consumer-register" element={<ConsumerRegister />} />
//         <Route path="/farmer-login" element={<FarmerLogin />} />
//         <Route path="/consumer-login" element={<ConsumerLogin />} />
//         <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
//         <Route path="/customer-dashboard" element={<CustomerDashboard />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import AdminLogin from "./pages/AdminLogin";
// import FarmerLogin from "./pages/FarmerLogin";
// import ConsumerLogin from "./pages/ConsumerLogin";
// import FarmerRegister from "./pages/FarmerRegister";
// import ConsumerRegister from "./pages/ConsumerRegister";
// import AdminDashboard from "./pages/AdminDashboard";
// import FarmerDashboard from "./pages/FarmerDashboard";
// import CustomerDashboard from "./pages/CustomerDashboard";

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center h-screen space-y-4">
//       <h1 className="text-3xl font-bold">Welcome to the Portal</h1>
//       <button
//         onClick={() => navigate("/admin-login")}
//         className="bg-red-500 text-white px-4 py-2 rounded-lg"
//       >
//         Admin
//       </button>
//       <button
//         onClick={() => navigate("/farmer-login")}
//         className="bg-green-500 text-white px-4 py-2 rounded-lg"
//       >
//         Farmer
//       </button>
//       <button
//         onClick={() => navigate("/consumer-login")}
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//       >
//         Consumer
//       </button>
//     </div>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/farmer-login" element={<FarmerLogin />} />
//         <Route path="/consumer-login" element={<ConsumerLogin />} />
//         <Route path="/farmer-register" element={<FarmerRegister />} />
//         <Route path="/consumer-register" element={<ConsumerRegister />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
//         <Route path="/customer-dashboard" element={<CustomerDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


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
import CustomerProfile from "./pages/Customers/CustomerProfile";
import CustomerEdit from "./pages/Customers/CustomerEdit";
import CustomerCart from "./pages/Customers/CustomerCart"; 
import CustomerPayment from "./pages/Customers/CustomerPayment"; 
import CustomerOrders from "./pages/Customers/CustomerOrders";
import CustomerNotifications from "./pages/Customers/CustomerNotifications";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/routes/ProtectedRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/farmer-login" element={<FarmerLogin />} />
      <Route path="/customer-login" element={<CustomerLogin />} />
      <Route path="/farmer-dashboard" element={<FarmerDashboard/>} />
      {/* <Route path="/farmer-dahsboard" element={<ProtectedRoute role="farmer"><FarmerDashboard/></ProtectedRoute>}></Route> */}
      <Route path="/customer-dashboard" element={<ProtectedRoute role="customer"><CustomerDashboard/></ProtectedRoute>}></Route>
      <Route path="/farmer-register" element={<FarmerRegister />} />
      <Route path="/customer-register" element={<CustomerRegister />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/add-item" element={<AddNewItem />} />
      <Route path="/item/:id" element={<ItemDetails />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      <Route path="/customer-profile" element={<CustomerProfile />} />
       <Route path="/customer-edit" element={<CustomerEdit />} />
       <Route path="/customer-cart" element={<CustomerCart />} />
       <Route path="/customer-pay" element={<CustomerPayment/>}/>
       <Route path="/customer-notification" element={<CustomerNotifications/>}/>

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
