import axios from "axios";

// utils/api.js

// Get BASE_URL from environment variables
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

// Generic GET request
export const fetchData = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}${url}`);
    return data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

// Generic POST request
export const postData = async (url, payload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}${url}`, payload, {
      headers: { "Content-Type": "application/json" }
    });
    return data;
  } catch (error) {
    console.error("API post error:", error);
    throw error;
  }
};

// Generic PUT request
export const putData = async (url, payload) => {
  try {
    const { data } = await axios.put(`${BASE_URL}${url}`, payload, {
      headers: { "Content-Type": "application/json" }
    });
    return data;
  } catch (error) {
    console.error("API put error:", error);
    throw error;
  }
};

// Generic DELETE request
export const deleteData = async (url) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}${url}`);
    return data;
  } catch (error) {
    console.error("API delete error:", error);
    throw error;
  }
};
