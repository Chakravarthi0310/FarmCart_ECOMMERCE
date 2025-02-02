import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api";

export const registerCustomer = async (data) => {
  return await axios.post(`${API_BASE_URL}/customer/register`, data);
};

export const loginCustomer = async (data) => {
  return await axios.post(`${API_BASE_URL}/customer/login`, data);
};

export const registerFarmer = async (data) => {
  return await axios.post(`${API_BASE_URL}/farmer/register`, data);
};

export const loginFarmer = async (data) => {
  return await axios.post(`${API_BASE_URL}/farmer/login`, data);
};
