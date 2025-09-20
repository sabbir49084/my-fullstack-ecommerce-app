import React, { useEffect, useState } from "react";
import broiler1 from "../../assets/images/broiler1.jpg";
import broiler2 from "../../assets/images/broiler2.jpg";
import broiler3 from "../../assets/images/broiler3.jpg";
import broiler4 from "../../assets/images/broiler4.jpg";
import broiler5 from "../../assets/images/broiler5.jpg";

// Image imports from assets

const images = [broiler1, broiler2, broiler3, broiler4, broiler5];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-green-50 min-h-[70vh] flex items-center transition-all duration-700">
      <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">
            Sustainable Forestry & Poultry Products
          </h1>
          <p className="mt-6 text-green-700 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
            Delivering fresh broiler chicken, farm eggs, timber solutions, and forest management services to your community.
          </p>
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <a
              href="/products"
              className="px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Shop Now
            </a>
            <a
              href="/services"
              className="px-6 py-3 border-2 border-green-700 text-green-700 rounded-lg font-semibold hover:bg-green-100 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Side Image Slider */}
        <div className="flex-1 w-full max-w-[500px] mx-auto relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={images[currentImage]}
            alt={`Slide ${currentImage + 1}`}
            className="w-full h-auto object-cover transition-opacity duration-1000 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
