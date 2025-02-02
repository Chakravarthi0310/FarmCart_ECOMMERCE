import { useState } from "react";
import { 
  viewOwnProducts, 
  addProduct, 
  viewOrders, 
  updateOrderStatu
} from "../services/farmerService";

const useFarmerServices = (token) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch farmer's products
  const fetchFarmerProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await viewOwnProducts(token);
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Add a new product
  const createProduct = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await addProduct(data, token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  // Fetch farmer's orders
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await viewOrders(token);
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrder = async (orderId, status) => {
    setLoading(true);
    setError(null);
    try {
      await updateOrderStatus(orderId, status, token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  return { 
    products, 
    orders, 
    loading, 
    error, 
    fetchFarmerProducts, 
    createProduct, 
    fetchOrders, 
    updateOrder 
  };
};

export default useFarmerServices;
