import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api";

export const getApprovedProducts = async (token) => {
  return await axios.get(`${API_BASE_URL}/customer/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const placeOrder = async (orderData, token) => {
  return await axios.post(`${API_BASE_URL}/customer/order`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
