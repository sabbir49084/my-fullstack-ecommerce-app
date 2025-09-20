import React, { useState } from "react";

const roles = ["Admin", "Customer", "Manager"];

export default function UserRow({ user, onRoleChange, onStatusToggle, onView, onDelete }) {
  const [role, setRole] = useState(user.role);
  const [isActive, setIsActive] = useState(user.isActive);

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setRole(newRole);
    onRoleChange(user._id, newRole);
  };

  const handleStatusChange = () => {
    const newStatus = !isActive;
    setIsActive(newStatus);
    onStatusToggle(user._id, newStatus);
  };

  return (
    <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
      <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
      <td className="px-4 py-2 whitespace-nowrap">{user.phone || "N/A"}</td>
      <td className="px-4 py-2 whitespace-nowrap">
        <select
          className="border rounded px-2 py-1 text-sm"
          value={role}
          onChange={handleRoleChange}
        >
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </td>
      <td className="px-4 py-2 whitespace-nowrap">
        <button
          onClick={handleStatusChange}
          className={`px-3 py-1 rounded text-white text-sm ${
            isActive ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </button>
      </td>
      <td className="px-4 py-2 whitespace-nowrap space-x-3">
        <button onClick={() => onView(user._id)} className="text-blue-600 hover:underline">View</button>
        <button onClick={() => onDelete(user._id)} className="text-red-600 hover:underline">Delete</button>
      </td>
    </tr>
  );
}
