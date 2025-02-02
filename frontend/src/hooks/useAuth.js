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
      
      setUser(response.data);
      return response.data;
    } catch (err) {
        console.log(err);
      setError(err.response?.data?.message || "Login failed",err);
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

      setUser(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login, register };
};

export default useAuth;
