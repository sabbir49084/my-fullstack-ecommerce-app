import React from "react";
import { FaUserAlt } from "react-icons/fa";

const SubscriberCard = ({ email, joined }) => {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl shadow hover:scale-105 transition transform duration-200">
      <div className="flex items-center gap-4">
        <FaUserAlt className="text-blue-700 text-xl" />
        <div>
          <p className="text-blue-900 font-semibold">{email}</p>
          <p className="text-sm text-gray-700">Joined: {joined}</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriberCard;
