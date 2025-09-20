import React, { useState } from "react";

const InvoiceForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    amount: "",
    status: "Unpaid",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        name="customerName"
        placeholder="Customer Name"
        value={formData.customerName}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Customer Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount (USD)"
        value={formData.amount}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded p-2"
      >
        <option>Unpaid</option>
        <option>Paid</option>
        <option>Pending</option>
      </select>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
