import React from "react";

const CommentCard = ({ comment, onApprove, onDelete }) => {
  return (
    <div className="p-4 mb-4 border rounded-lg shadow-sm bg-gray-100 dark:bg-gray-800">
      <p className="text-gray-700 dark:text-gray-200">{comment.text}</p>

      <div className="mt-2 flex gap-2">
        <button
          onClick={onApprove}
          className="px-3 py-1 bg-green-500 text-white rounded-md"
        >
          Approve
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
