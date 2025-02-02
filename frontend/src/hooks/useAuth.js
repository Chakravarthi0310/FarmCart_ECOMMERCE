import {useState} from "react";
import { registerCustomer,loginCustomer,registerFarmer,loginFarmer } from "../services/authService";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login function
  const login = async (role, credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = role === "farmer" 
        ? await loginFarmer(credentials) 
        : await loginCustomer(credentials);

      localStorage.setItem("userRole", role);
      setUser(response); // Assuming the response contains the necessary user data
      return response;
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (role, userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = role === "farmer" 
        ? await registerFarmer(userData) 
        : await registerCustomer(userData);

      setUser(response); // Assuming the response contains the user data
      return response;
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login, register };
};

export default useAuth;