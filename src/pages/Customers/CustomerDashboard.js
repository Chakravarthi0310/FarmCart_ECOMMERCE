import React from "react";

const CustomerDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">Flipkart</h1>
        <input
          type="text"
          placeholder="Search for Products, Brands and More"
          className="w-1/2 p-2 border rounded-lg"
        />
        <div className="flex space-x-4">
          <button className="text-gray-600 hover:text-black">Login</button>
          <button className="text-gray-600 hover:text-black">Cart</button>
          <button className="text-gray-600 hover:text-black">Become a Seller</button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white p-2 flex justify-center shadow-sm">
        <div className="flex space-x-6 text-gray-700 font-semibold">
          <button>Mobiles</button>
          <button>Fashion</button>
          <button>Electronics</button>
          <button>Home & Furniture</button>
          <button>Appliances</button>
          <button>Flight Bookings</button>
          <button>Beauty, Toys & More</button>
          <button>Two Wheelers</button>
        </div>
      </nav>

      {/* Banner */}
      <div className="m-4">
        <img
          src="https://via.placeholder.com/1200x300" 
          alt="Banner"
          className="w-full rounded-lg"
        />
      </div>

      {/* Top Offers */}
      <section className="p-4">
        <h2 className="text-xl font-bold mb-4">Top Offers</h2>
        <div className="grid grid-cols-6 gap-4">
          <img src="https://via.placeholder.com/150" alt="Offer 1" className="rounded-lg shadow-md" />
          <img src="https://via.placeholder.com/150" alt="Offer 2" className="rounded-lg shadow-md" />
          <img src="https://via.placeholder.com/150" alt="Offer 3" className="rounded-lg shadow-md" />
          <img src="https://via.placeholder.com/150" alt="Offer 4" className="rounded-lg shadow-md" />
          <img src="https://via.placeholder.com/150" alt="Offer 5" className="rounded-lg shadow-md" />
          <img src="https://via.placeholder.com/150" alt="Offer 6" className="rounded-lg shadow-md" />
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;
