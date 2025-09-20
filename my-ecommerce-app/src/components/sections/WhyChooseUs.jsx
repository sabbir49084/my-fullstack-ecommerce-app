import { FaLeaf, FaLock, FaShippingFast } from "react-icons/fa";

const features = [
  {
    icon: <FaLeaf size={32} className="text-green-600" />,
    title: "Eco-Friendly & Local",
    desc: "We provide sustainable products and empower local communities.",
  },
  {
    icon: <FaShippingFast size={32} className="text-green-600" />,
    title: "Fast Delivery",
    desc: "Timely delivery across rural and urban zones in South Africa.",
  },
  {
    icon: <FaLock size={32} className="text-green-600" />,
    title: "Secure Payment",
    desc: "Multiple secure payment options including EFT, Crypto, PayFast.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4 bg-[#f9f9f9]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          Why Choose Afritabs?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
