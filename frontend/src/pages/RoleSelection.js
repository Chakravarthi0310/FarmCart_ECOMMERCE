import React from "react";

const RoleSelection = ({ setRole }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Choose Your Role</h1>
      <button
        className="px-6 py-3 bg-red-500 text-white rounded-lg"
        onClick={() => setRole("admin")}
      >
        Admin
      </button>
      <button
        className="px-6 py-3 bg-green-500 text-white rounded-lg"
        onClick={() => setRole("farmer")}
      >
        Farmer
      </button>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg"
        onClick={() => setRole("consumer")}
      >
        Consumer
      </button>
    </div>
  );
};

export default RoleSelection;
