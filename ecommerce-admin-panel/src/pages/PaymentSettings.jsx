import GatewayStatusCard from "../components/common/GatewayStatusCard";
import PaymentToggleForm from "../components/form/PaymentToggleForm";
import React from "react";
import { motion } from "framer-motion";

const PaymentSettings = () => {
  return (
    <motion.div
      className="p-6 lg:p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
        💳 Payment Gateway Settings
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-10">
        Manage and configure payment providers for your store. Enable or disable gateway access and review live status.
      </p>

      {/* General Payment Gateway Controls */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-xl font-semibold mb-4">Gateway Control Panel</h2>
          <PaymentToggleForm />
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-xl font-semibold mb-4">Live Gateway Status</h2>
          <GatewayStatusCard />
        </motion.div>
      </motion.div>

      {/* Crypto Payment Toggle */}
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
        whileHover={{ scale: 1.01 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">🪙 Crypto Payment Settings</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Enable or disable crypto payments like Bitcoin, Ethereum, or stablecoins.
        </p>

        {/* Optional Crypto Toggle Form - build later or show as placeholder */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable Crypto Payments
          </label>
          <input type="checkbox" className="toggle toggle-success" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentSettings;
