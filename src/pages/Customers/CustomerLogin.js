// import React from "react";

// const ConsumerLogin = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen space-y-4">
//       <h1 className="text-2xl font-bold">Consumer Login</h1>
//       <form className="flex flex-col space-y-3">
//         <input type="text" placeholder="Username" className="p-2 border" />
//         <input type="password" placeholder="Password" className="p-2 border" />
//         <button className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
//       </form>
//     </div>
//   );
// };

// export default ConsumerLogin;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "consumer@example.com" && password === "consumer123") {
      alert("Consumer Login Successful!");
      navigate("/customer-dashboard");
    } else {
      alert("Invalid Consumer Credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Consumer Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded-lg" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded-lg" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Login</button>
      </form>
      {/* Register Button */}
      <p className="mt-4">
        New user?{" "}
        <button
          onClick={() => navigate("/consumer-register")}
          className="text-blue-500 underline"
        >
          Register here
        </button>
      </p>
    </div>
  );
};

export default CustomerLogin;
