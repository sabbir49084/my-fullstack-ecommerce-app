import React from "react";

const MessageCard = ({ message }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold">{message.userName}</h2>
        <span className="text-sm text-gray-500">{message.date}</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-2">{message.text}</p>
      {message.reply && (
        <div className="mt-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
          <span className="text-sm font-medium">Admin Reply:</span>
          <p className="text-sm">{message.reply}</p>
        </div>
      )}
    </div>
  );
};

export default MessageCard;
