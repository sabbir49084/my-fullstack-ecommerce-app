import React from "react";

export const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;