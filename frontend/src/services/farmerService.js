import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api/farmer";



export const addProduct = async (productData) => {
  try {
    // Retrieve the auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("No authentication token found. Please log in.");
    }

    // Create FormData object for handling file uploads
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    // Send POST request with FormData
    const response = await axios.post(`${API_BASE_URL}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("✅ Product added successfully:", response.data);
    return response.data; // Return the response data (success message or product details)

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


export const deleteProduct = async (productId, token) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    alert("Product deleted successfully!");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Failed to delete product.");
  }
};



export const updateProfile = async (userData, token) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/api/farmer/profile", // Adjust the API URL
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
