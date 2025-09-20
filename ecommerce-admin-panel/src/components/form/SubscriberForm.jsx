import React from "react";
import { FaEnvelope } from "react-icons/fa";

const SubscriberForm = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xl animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaEnvelope className="text-blue-600" /> Add New Subscriber
      </h2>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Subscriber Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          Add Subscriber
        </button>
      </form>
    </div>
  );
};

export default SubscriberForm;
