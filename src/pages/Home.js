import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Importing Home styles
import "./Button.css"; // Importing button styles

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
       <h1 className="text-3xl font-bold">Welcome to the Portal</h1>
      {/* <button
        // onClick={() =>bt()}
        onClick={()=> navigate("/admin-login")}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Admin
      </button>  */}
      <button
        onClick={() => navigate("/farmer-login")}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Farmer
      </button>
      <button
        onClick={() => navigate("/customer-login")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Consumer
      </button>
    </div>
  );
};

export default Home;
