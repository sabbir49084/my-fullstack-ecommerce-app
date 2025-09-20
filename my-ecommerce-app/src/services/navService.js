import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export const getAllNavs = async () => {
  try {
    const res = await axios.get(`${API_URL}/navs`); // আর api ডাবল হবে না
    return res.data;
  } catch (error) {
    console.error("Failed to fetch navigations", error);
    return [];
  }
};
