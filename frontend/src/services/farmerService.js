import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/farmer";

const useFarmerActions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Add Product
  const addProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("No authentication token found. Please log in.");

      const formData = new FormData();
      for (const key in productData) {
        formData.append(key, productData[key]);
      }

      const response = await axios.post(`${API_BASE_URL}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ View Own Products
  const viewOwnProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("No authentication token found.");
      
      const response = await axios.get(`${API_BASE_URL}/products`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ View Orders
  const viewOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("No authentication token found.");

      const response = await axios.get(`${API_BASE_URL}/orders`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Order Status
  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    setError(null);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("No authentication token found.");

      const response = await axios.put(`${API_BASE_URL}/orders`, { orderId, status }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order status.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Product
  const deleteProduct = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("No authentication token found.");

      const response = await axios.delete(`${API_BASE_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
      alert("Product deleted successfully!");
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product.");
      alert(error.response?.data?.message || "Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Profile
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("No authentication token found.");
      
      const response = await axios.put(`${API_BASE_URL}/profile`, userData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
      alert("Profile updated successfully!");
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    addProduct,
    viewOwnProducts,
    viewOrders,
    updateOrderStatus,
    deleteProduct,
    updateProfile,
  };
};

export default useFarmerActions;
