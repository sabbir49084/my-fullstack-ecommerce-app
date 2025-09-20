import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const fetchComments = async () => {
  const res = await axios.get(`${API_URL}/comments`);
  return res.data;
};

export const approveComment = async (commentId) => {
  const res = await axios.patch(`${API_URL}/comments/${commentId}/approve`);
  return res.data;
};

export const deleteComment = async (commentId) => {
  const res = await axios.delete(`${API_URL}/comments/${commentId}`);
  return res.data;
};

export const replyToComment = async (commentId, reply) => {
  const res = await axios.post(`${API_URL}/comments/${commentId}/reply`, { reply });
  return res.data;
};
