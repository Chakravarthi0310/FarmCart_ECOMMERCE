import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api/customer";

export const getApprovedProducts = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching approved products:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateProfile = async (userData, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/profile`, // Adjust the API URL
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send the token
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    alert("Profile updated successfully!");
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Failed to update profile.");
  }
};

export const placeOrder = async (customerId, products,token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/products/order`,
      { customerId, products },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const getCustomerOrders = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/order`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching customer orders:", error.response?.data?.message || error.message);
    throw error;
  }
};




