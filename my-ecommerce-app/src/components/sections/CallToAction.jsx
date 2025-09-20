import React from "react";

// components/sections/CallToAction.jsx

const CallToAction = () => {
  return (
    <section className="bg-amber-100 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Ready to place your bulk order or need a service quote?</h2>
        <button className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300">
          Contact Us Now
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
