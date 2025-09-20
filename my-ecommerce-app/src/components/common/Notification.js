import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

// components/common/Notification.js


const Notification = ({ message, type, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const Icon = type === "success" ? CheckCircle : XCircle;

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white z-50 transition-opacity duration-300 ${bgColor}`}
    >
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;