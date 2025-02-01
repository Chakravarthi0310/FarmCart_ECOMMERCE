import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Importing Home styles
import "./Button.css"; // Importing button styles

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="content">
        <h1 className="title">Welcome to FarmCart</h1>
        <p className="subtitle">Connecting Farmers and Consumers Directly</p>

        <div className="buttons-container">
          <button onClick={() => navigate("/farmer-login")} className="btn btn-farmer">
            Farmer
          </button>
          <button onClick={() => navigate("/consumer-login")} className="btn btn-consumer">
            Consumer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
