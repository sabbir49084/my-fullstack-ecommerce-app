import QRCode from "react-qr-code";
import React, { useEffect, useState } from "react";
import { Bitcoin, Check, CreditCard, DollarSign, Loader2, X } from "lucide-react";

// client/src/components/payment/PaymentGateway.jsx


const PaymentGateway = ({ onOnlinePay, onCOD, totalAmount, isProcessing }) => {
  const [mainMethod, setMainMethod] = useState("online");
  const [onlineMethod, setOnlineMethod] = useState("stripe");
  const [validationStatus, setValidationStatus] = useState({
    stripe: null,
    paypal: null,
    crypto: null,
  });

  // Simulated live validation (placeholder)
  useEffect(() => {
    if (mainMethod === "online") {
      if (onlineMethod === "stripe") {
        setValidationStatus((s) => ({ ...s, stripe: "valid" }));
      } else if (onlineMethod === "paypal") {
        setValidationStatus((s) => ({ ...s, paypal: "valid" }));
      } else if (onlineMethod === "crypto") {
        setValidationStatus((s) => ({ ...s, crypto: "waiting" }));
      }
    }
  }, [onlineMethod, mainMethod]);

  const handleConfirm = () => {
    if (mainMethod === "online") {
      onOnlinePay(onlineMethod);
    } else {
      onCOD();
    }
  };

  // Dummy crypto payment address (replace with real one)
  const cryptoAddress = "bitcoin:bc1qexampleaddress1234567890abcdef";

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
      <h2 className="text-3xl font-bold text-green-800 mb-2">Payment Information</h2>

      {/* Main selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Online Payment */}
        <div
          className={`border rounded-lg p-5 flex flex-col justify-between relative ${
            mainMethod === "online" ? "border-green-600 shadow-lg" : "border-gray-300"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="w-6 h-6 text-green-700" />
            <h3 className="text-xl font-semibold">Online Payment</h3>
            {mainMethod === "online" && (
              <span className="ml-auto flex items-center gap-1 text-green-600 font-medium">
                <Check className="w-5 h-5" /> Selected
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-4">
            Pay instantly using Stripe, PayPal (USD), or Cryptocurrency.
          </p>

          {mainMethod === "online" && (
            <div className="space-y-3">
              {/* Stripe */}
              <div
                className={`flex items-center justify-between bg-gray-50 rounded p-3 border ${
                  onlineMethod === "stripe" ? "border-green-500" : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="onlineMethod"
                    value="stripe"
                    checked={onlineMethod === "stripe"}
                    onChange={() => setOnlineMethod("stripe")}
                    className="accent-green-600"
                  />
                  <div>
                    <div className="font-medium">Stripe</div>
                    <div className="text-sm text-gray-500">
                      Card payment (Visa/Master/etc.)
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {validationStatus.stripe === "valid" && (
                    <span className="text-green-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Ready
                    </span>
                  )}
                  {validationStatus.stripe === "invalid" && (
                    <span className="text-red-600 flex items-center gap-1">
                      <X className="w-4 h-4" /> Problem
                    </span>
                  )}
                </div>
              </div>

              {/* PayPal */}
              <div
                className={`flex items-center justify-between bg-gray-50 rounded p-3 border ${
                  onlineMethod === "paypal" ? "border-green-500" : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="onlineMethod"
                    value="paypal"
                    checked={onlineMethod === "paypal"}
                    onChange={() => setOnlineMethod("paypal")}
                    className="accent-green-600"
                  />
                  <div>
                    <div className="font-medium">PayPal (USD)</div>
                    <div className="text-sm text-gray-500">
                      Secure checkout via PayPal
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {validationStatus.paypal === "valid" && (
                    <span className="text-green-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Ready
                    </span>
                  )}
                </div>
              </div>

              {/* Crypto */}
              <div
                className={`flex flex-col gap-2 bg-gray-50 rounded p-3 border ${
                  onlineMethod === "crypto" ? "border-green-500" : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="onlineMethod"
                      value="crypto"
                      checked={onlineMethod === "crypto"}
                      onChange={() => setOnlineMethod("crypto")}
                      className="accent-green-600"
                    />
                    <div>
                      <div className="font-medium">Cryptocurrency</div>
                      <div className="text-sm text-gray-500">
                        BTC / USDT / etc.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {validationStatus.crypto === "waiting" && (
                      <span className="text-yellow-600 flex items-center gap-1">
                        <Loader2 className="w-4 h-4 animate-spin" /> Awaiting
                      </span>
                    )}
                  </div>
                </div>

                {onlineMethod === "crypto" && (
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col items-start gap-2">
                      <div className="text-sm text-gray-600">Send payment to:</div>
                      <div className="font-mono bg-gray-100 p-2 rounded break-all">
                        {cryptoAddress}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded border flex justify-center items-center">
                      {/* QR code preview */}
                      <QRCode value={cryptoAddress} size={120} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setMainMethod("online")}
              className={`px-4 py-2 rounded font-medium transition ${
                mainMethod === "online"
                  ? "bg-green-600 text-white"
                  : "bg-white border border-green-600 text-green-600 hover:bg-green-50"
              }`}
            >
              {mainMethod === "online" ? (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Selected
                </div>
              ) : (
                "Select"
              )}
            </button>
          </div>
        </div>

        {/* Pay on Delivery */}
        <div
          className={`border rounded-lg p-5 flex flex-col justify-between relative ${
            mainMethod === "cod" ? "border-green-600 shadow-lg" : "border-gray-300"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-6 h-6 text-red-600" />
            <h3 className="text-xl font-semibold">Pay on Delivery</h3>
            {mainMethod === "cod" && (
              <span className="ml-auto flex items-center gap-1 text-green-600 font-medium">
                <Check className="w-5 h-5" /> Selected
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-4">
            Pay when you receive the product at your doorstep.
          </p>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setMainMethod("cod")}
              className={`px-4 py-2 rounded font-medium transition ${
                mainMethod === "cod"
                  ? "bg-green-600 text-white"
                  : "bg-white border border-green-600 text-green-600 hover:bg-green-50"
              }`}
            >
              {mainMethod === "cod" ? (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Selected
                </div>
              ) : (
                "Select"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Summary + Action */}
      <div className="mt-8 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="rounded border p-4 bg-gray-50">
            <h4 className="font-semibold mb-2">Summary</h4>
            <p className="text-sm text-gray-700 mb-1">
              Method: {mainMethod === "online" ? `Online (${onlineMethod})` : "Pay on Delivery"}
            </p>
            <p className="text-sm text-gray-700">
              Amount: R{totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="w-full md:w-auto">
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="w-full md:w-auto bg-gradient-to-r from-green-600 to-blue-500 hover:scale-[1.02] transition rounded-lg text-white px-6 py-3 font-semibold flex items-center gap-2"
          >
            {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
            {mainMethod === "online" ? "Proceed to Online Payment" : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;