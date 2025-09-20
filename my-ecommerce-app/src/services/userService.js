const API = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const updateProfile = async (token, updates) => {
  const res = await fetch(`${API}/api/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  return await res.json();
};
