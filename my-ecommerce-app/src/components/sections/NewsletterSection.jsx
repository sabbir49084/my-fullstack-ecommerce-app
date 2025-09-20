import React from "react";

// components/sections/NewsletterSection.jsx

const NewsletterSection = () => {
  return (
    <section className="bg-blue-800 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6">Get updates on fresh chicken, timber services, and exclusive deals.</p>
        <form className="flex flex-col md:flex-row justify-center items-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md w-full md:w-1/2 text-black"
          />
          <button
            type="submit"
            className="bg-white text-green-800 px-6 py-2 rounded-md hover:bg-emerald-100 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
