import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Admin Registered Successfully!");
    navigate("/admin-login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Admin Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded-lg" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded-lg" required />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;
