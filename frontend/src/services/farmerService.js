import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api";




export const addProduct = async (productData) => {
  try {
    // Retrieve the auth token from localStorage
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No authentication token found. Please log in.");
    }

    // Send POST request
    const response = await axios.post(`${API_BASE_URL}/farmer/products`, productData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("✅ Product added successfully:", response.data);
    return response.data; // Return the response data (e.g., success message or product details)
  } catch (error) {
    console.error("❌ Error adding product:", error.response ? error.response.data : error.message);
    throw error; // Re-throw the error to handle it in the UI
  }
};
export const viewOwnProducts = async () => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) throw new Error("No authentication token found.");

    const response = await axios.get(`${API_BASE_URL}/products`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    console.log("✅ Products fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching products:", error.response?.data || error.message);
    throw error;
  }
};


export const viewOrders = async () => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) throw new Error("No authentication token found.");

    const response = await axios.get(`${API_BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    console.log("✅ Orders fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching orders:", error.response?.data || error.message);
    throw error;
  }
};


export const updateOrderStatus = async (orderId, status) => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) throw new Error("No authentication token found.");

    const response = await axios.put(
      `${API_BASE_URL}/orders`,
      { orderId, status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log("✅ Order status updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating order status:", error.response?.data || error.message);
    throw error;
  }
};

