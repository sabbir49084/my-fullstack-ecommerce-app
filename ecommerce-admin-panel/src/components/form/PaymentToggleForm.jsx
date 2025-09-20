import React, { useState } from "react";

const PaymentToggleForm = ({ onToggle, currentStatus }) => {
  const [cryptoEnabled, setCryptoEnabled] = useState(currentStatus?.crypto || false);
  const [paypalEnabled, setPaypalEnabled] = useState(currentStatus?.paypal || false);
  const [stripeEnabled, setStripeEnabled] = useState(currentStatus?.stripe || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onToggle({
      crypto: cryptoEnabled,
      paypal: paypalEnabled,
      stripe: stripeEnabled,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-6 transition-all duration-300"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Payment Method Settings
      </h2>

      <div className="space-y-4">
        {/* Crypto */}
        <ToggleSwitch
          label="Enable Crypto Payment"
          checked={cryptoEnabled}
          onChange={() => setCryptoEnabled(!cryptoEnabled)}
        />

        {/* PayPal */}
        <ToggleSwitch
          label="Enable PayPal"
          checked={paypalEnabled}
          onChange={() => setPaypalEnabled(!paypalEnabled)}
        />

        {/* Stripe */}
        <ToggleSwitch
          label="Enable Stripe"
          checked={stripeEnabled}
          onChange={() => setStripeEnabled(!stripeEnabled)}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
      >
        Save Settings
      </button>
    </form>
  );
};

const ToggleSwitch = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-700 dark:text-gray-300">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:bg-blue-600 transition-all"></div>
      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
        {checked ? "On" : "Off"}
      </span>
    </label>
  </div>
);

export default PaymentToggleForm;
