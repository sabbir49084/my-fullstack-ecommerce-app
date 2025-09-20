import React from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  name,
  className = "",
  required = false,
  disabled = false,
  id,
  ...rest
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id || name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
          text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 disabled:opacity-60 disabled:cursor-not-allowed`}
        {...rest}
      />
    </div>
  );
};

export default Input;
