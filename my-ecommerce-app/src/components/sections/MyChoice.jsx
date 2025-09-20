import React from "react";
import { Leaf, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    title: "Pure & Organic",
    description: "We provide 100% organic and pesticide-free products from our own farms.",
    icon: <Leaf size={36} className="text-green-600" />,
  },
  {
    title: "Trusted Quality",
    description: "Each product is tested and verified for top-notch quality before delivery.",
    icon: <ShieldCheck size={36} className="text-blue-600" />,
  },
  {
    title: "Empowering Community",
    description: "We support rural farmers and empower local communities through fair trade.",
    icon: <Users size={36} className="text-yellow-600" />,
  },
];

const MyChooseUs = () => {
  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Discover what makes our products unique and why our customers trust us every day.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transform transition-transform hover:scale-105 duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyChooseUs;
