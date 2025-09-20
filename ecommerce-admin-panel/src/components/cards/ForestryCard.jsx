import React from "react";
import { Trash2 } from "lucide-react";

const ForestryCard = ({ service, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-all hover:shadow-lg">
      <div className="flex justify-between items-start">
        {/* Image */}
        <img
          src={service.image || "/placeholder.jpg"}
          alt={service.title}
          className="w-20 h-20 object-cover rounded-md"
        />

        {/* Delete button */}
        <button
          onClick={() => onDelete(service.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
          {service.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 line-clamp-2">
          {service.description}
        </p>

        <div className="mt-2 text-xs text-gray-400 dark:text-gray-400 italic">
          Type: {service.type}
        </div>

        {service.keywords?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {service.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-2 py-1 rounded-full text-xs"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForestryCard;
