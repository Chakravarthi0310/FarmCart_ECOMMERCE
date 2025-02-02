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


const updateProfile = async (userData, token) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/api/customer/profile", // Adjust the API URL
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
