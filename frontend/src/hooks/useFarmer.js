import { useState } from "react";
import {
  addProduct,
  viewOwnProducts,
  viewOrders,
  updateOrderStatus,
  deleteProduct,
  updateProfile,
} from "../services/farmerService";

const useFarmer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add Product
  const handleAddProduct = async (productData) => {
    const token = localStorage.getItem("token");

    setLoading(true);
    setError(null);
  
    try {
      const formData = productData;
      console.log("Original item data");
      console.log(productData)
  
      const response = await addProduct(formData);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };
  

  // View Own Products
  const handleViewOwnProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      return await viewOwnProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // View Orders
  const handleViewOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      return await viewOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId, status) => {
    setLoading(true);
    setError(null);
    try {
      return await updateOrderStatus(orderId, status);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order status.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (productId, token) => {
    setLoading(true);
    setError(null);
    try {
      return await deleteProduct(productId, token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  // Update Profile
  const handleUpdateProfile = async (userData) => {
    const token = localStorage.getItem("token");
    console.log(token);
    setLoading(true);
    setError(null);
    try {
      return await updateProfile(userData, token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.",err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleAddProduct,
    handleViewOwnProducts,
    handleViewOrders,
    handleUpdateOrderStatus,
    handleDeleteProduct,
    handleUpdateProfile,
  };
};

export default useFarmer;