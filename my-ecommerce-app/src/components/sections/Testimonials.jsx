import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Rahim Uddin",
    title: "Regular Customer",
    message: "The spices are so fresh and the delivery is always on time. Highly recommended!",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    name: "Salma Akter",
    title: "Verified Buyer",
    message: "I love the packaging and quality. Their turmeric is the best I've used!",
    image: "https://i.pravatar.cc/100?img=24",
  },
  {
    id: 3,
    name: "Mizanur Rahman",
    title: "Online Shopper",
    message: "Great prices and super fast service. I'll shop again for sure!",
    image: "https://i.pravatar.cc/100?img=36",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-8 lg:px-20 transition-all duration-300">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">What Our Customers Say</h2>
        <p className="mt-2 text-gray-500">Trusted by thousands across Bangladesh</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full border-2 border-green-500"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-700">{t.name}</h4>
                <p className="text-sm text-green-600">{t.title}</p>
              </div>
            </div>
            <p className="text-gray-600 italic">"{t.message}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
