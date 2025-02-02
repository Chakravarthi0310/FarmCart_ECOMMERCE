import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api";

export const viewOwnProducts = async (token) => {
  return await axios.get(`${API_BASE_URL}/farmer/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addProduct = async (data, token) => {
  return await axios.post(`${API_BASE_URL}/farmer/products`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const viewOrders = async (token) => {
  return await axios.get(`${API_BASE_URL}/farmer/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateOrderStatus = async (orderId, status, token) => {
  return await axios.put(`${API_BASE_URL}/farmer/orders`, {
    orderId,
    status,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
