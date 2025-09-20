import CheckoutForm from "../components/CheckoutForm";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX");

const StripeCheckout = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Call your backend to create the PaymentIntent
    axios
      .post("http://localhost:5000/api/create-payment-intent", {
        amount: 5000,
        currency: "usd",
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error("Error creating payment intent:", err);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-semibold mb-6 text-center">Complete Payment</h2>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p className="text-center">Loading payment details...</p>
      )}
    </div>
  );
};

export default StripeCheckout;
