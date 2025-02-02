import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/customer";

const useCustomerService = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch Approved Products
  const getApprovedProducts = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching approved products:", err);
      setError(err.response?.data?.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Profile
  const updateProfile = async (userData, token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_BASE_URL}/profile`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
      alert("Profile updated successfully!");
      return response.data;
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.message || "Profile update failed.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Place Order
  const placeOrder = async (customerId, products, token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/products/order`,
        { customerId, products },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(response.data);
      return response.data;
    } catch (err) {
      console.error("Error placing order:", err);
      setError(err.response?.data?.message || "Order placement failed.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Customer Orders
  const getCustomerOrders = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/products/order`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data.orders);
      return response.data.orders;
    } catch (err) {
      console.error("Error fetching customer orders:", err);
      setError(err.response?.data?.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    getApprovedProducts,
    updateProfile,
    placeOrder,
    getCustomerOrders,
  };
};

export default useCustomerService;
