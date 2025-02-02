import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  const storedRole = localStorage.getItem("userRole");

  if (!storedRole || storedRole !== role) {
    return <Navigate to="/" />; // Redirect to Home if role mismatch
  }

  return children;
};

export default ProtectedRoute;
