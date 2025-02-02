import { getApprovedProducts,placeOrder } from "../services/customerService";

import { useState } from "react";

const useCustomerServices = (token) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch approved products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getApprovedProducts(token);
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Place an order
  const orderProduct = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      await placeOrder(orderData, token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, fetchProducts, orderProduct };
};

export default useCustomerServices;
