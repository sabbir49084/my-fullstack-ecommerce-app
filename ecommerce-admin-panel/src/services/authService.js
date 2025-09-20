// client/src/services/authService.js

const API_URL = "http://localhost:4000/api/auth/admin";

// 🔹 Admin Login
export const loginAdmin = async (credentials) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  console.log("🔍 Login API response:", data); // Debug log

  if (!res.ok) throw new Error(data.message || "Login failed");
  return data; // { user, token }
};

// 🔹 Admin Signup
export const signupAdmin = async (formData) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  console.log("🔍 Signup API response:", data); // Debug log

  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data; // { user, token }
};
