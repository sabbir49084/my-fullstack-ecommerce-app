import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const gateways = [
  {
    name: "Stripe",
    status: "online",
    updated: "2 mins ago",
    iconColor: "text-green-500",
  },
  {
    name: "PayPal",
    status: "offline",
    updated: "5 hours ago",
    iconColor: "text-red-500",
  },
  {
    name: "Crypto Wallet",
    status: "online",
    updated: "1 min ago",
    iconColor: "text-green-500",
  },
];

const GatewayStatusCard = () => {
  return (
    <div className="space-y-4">
      {gateways.map((gateway) => (
        <div
          key={gateway.name}
          className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-sm"
        >
          <div className="flex items-center space-x-3">
            {gateway.status === "online" ? (
              <CheckCircle className={`w-5 h-5 ${gateway.iconColor}`} />
            ) : (
              <XCircle className={`w-5 h-5 ${gateway.iconColor}`} />
            )}
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                {gateway.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Last updated: {gateway.updated}
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${
              gateway.status === "online"
                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
            }`}
          >
            {gateway.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default GatewayStatusCard;
