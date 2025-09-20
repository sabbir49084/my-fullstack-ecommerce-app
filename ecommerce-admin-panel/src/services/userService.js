const API = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const fetchUsers = async (token, page = 1, limit = 10) => {
  const res = await fetch(`${API}/api/users?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export const updateUserRole = async (token, id, role) => {
  const res = await fetch(`${API}/api/users/${id}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ role }),
  });
  return await res.json();
};

export const updateUserStatus = async (token, id, isActive) => {
  const res = await fetch(`${API}/api/users/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ isActive }),
  });
  return await res.json();
};

export const deleteUser = async (token, id) => {
  const res = await fetch(`${API}/api/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};
