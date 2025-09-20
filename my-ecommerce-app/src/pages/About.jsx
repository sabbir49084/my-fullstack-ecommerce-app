import React from "react";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>About Us - AFRITABS</title>
        <meta name="description" content="Learn about AFRITABS - Sustainable forestry and poultry solutions for South African communities and commercial partners" />
      </Helmet>

      {/* Header/Navigation - You might want to use your existing Navbar component instead */}
    

      {/* Hero Section */}
      <section className="hero-section py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="hero-title text-4xl md:text-5xl font-bold mb-6">About AFRITABS</h1>
          <p className="text-xl max-w-2xl mx-auto">Sustainable forestry and poultry solutions for South African communities and commercial partners</p>
        </div>
      </section>

      {/* Business Overview */}
    <section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-green-800 mb-4">Our Business</h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        AFRITABS Services is a diversified, rural-impact business operating in the forestry and poultry farming sectors. We are committed to delivering sustainable solutions to communities and commercial partners across South Africa.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="group text-center p-6 bg-green-50 rounded-lg hover:bg-green-600 transition-colors duration-300">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-colors duration-300">
          <i className="fas fa-tree text-2xl text-green-800 group-hover:text-white transition-colors duration-300"></i>
        </div>
        <h3 className="font-semibold text-green-800 mb-2 group-hover:text-white transition-colors duration-300">Forestry Division</h3>
        <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
          Sustainable timber solutions and forest management services
        </p>
      </div>

      <div className="group text-center p-6 bg-yellow-50 rounded-lg hover:bg-green-600 transition-colors duration-300">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-colors duration-300">
          <i className="fas fa-egg text-2xl text-yellow-700 group-hover:text-white transition-colors duration-300"></i>
        </div>
        <h3 className="font-semibold text-yellow-700 mb-2 group-hover:text-white transition-colors duration-300">Poultry Division</h3>
        <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
          Fresh, affordable poultry products for communities
        </p>
      </div>

      <div className="group text-center p-6 bg-blue-50 rounded-lg hover:bg-green-600 transition-colors duration-300">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-colors duration-300">
          <i className="fas fa-hands-helping text-2xl text-blue-800 group-hover:text-white transition-colors duration-300"></i>
        </div>
        <h3 className="font-semibold text-blue-800 mb-2 group-hover:text-white transition-colors duration-300">Conservation Services</h3>
        <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
          Environmental protection and sustainable land management
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Forestry Services */}
   <section className="forestry-bg py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Forestry & Conservation Services</h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* Box 1 - green hover */}
      <div className="service-card group bg-white p-6 rounded-lg shadow hover:bg-green-600 transition-colors duration-300">
        <i className="fas fa-tree text-3xl text-green-800 mb-4 group-hover:text-white transition-colors duration-300"></i>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">Timber Production & Supply</h3>
        <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
          Sustainable plantation species for various applications
        </p>
      </div>

      {/* Box 2 - orange hover */}
      <div className="service-card group bg-white p-6 rounded-lg shadow hover:bg-orange-600 transition-colors duration-300">
        <i className="fas fa-ruler-combined text-3xl text-green-800 mb-4 group-hover:text-white transition-colors duration-300"></i>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">Forest Enumeration</h3>
        <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
          Plot establishment, tree measurements, and growth modeling
        </p>
      </div>

      {/* Box 3 - blue-black hover */}
      <div className="service-card group bg-white p-6 rounded-lg shadow hover:bg-blue-900 transition-colors duration-300">
        <i className="fas fa-fire-extinguisher text-3xl text-green-800 mb-4 group-hover:text-white transition-colors duration-300"></i>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">Fire Management</h3>
        <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
          Firebreaks, suppression, and firefighting teams
        </p>
      </div>

      {/* Box 4 - you can pick hover color, e.g., green again */}
      <div className="service-card group bg-white p-6 rounded-lg shadow hover:bg-green-600 transition-colors duration-300">
        <i className="fas fa-seedling text-3xl text-green-800 mb-4 group-hover:text-white transition-colors duration-300"></i>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">Silvicultural Services</h3>
        <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
          Planting, thinning, pruning, and tending
        </p>
      </div>

      {/* Box 5 - orange again */}
      <div className="service-card group bg-white p-6 rounded-lg shadow hover:bg-orange-600 transition-colors duration-300">
        <i className="fas fa-leaf text-3xl text-green-800 mb-4 group-hover:text-white transition-colors duration-300"></i>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">Weed Control & Brush Clearing</h3>
        <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
          Professional vegetation management services
        </p>
      </div>

      {/* Box 6 - blue-black again */}
      <div className="service-card group bg-white p-6 rounded-lg shadow hover:bg-blue-900 transition-colors duration-300">
        <i className="fas fa-book text-3xl text-green-800 mb-4 group-hover:text-white transition-colors duration-300"></i>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">Environmental Education</h3>
        <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
          Programs for communities and landowners
        </p>
      </div>

    </div>
  </div>
</section>


      {/* Poultry Products */}
     <section className="poultry-bg py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Poultry Products</h2>

    <div className="grid md:grid-cols-2 gap-8">

      {/* Card 1 - green hover */}
      <div className="poultry-card group bg-white p-6 rounded-lg shadow hover:bg-green-600 transition-colors duration-300">
        <i className="fas fa-drumstick-bite text-3xl text-yellow-700 mb-4 group-hover:text-white transition-colors duration-300"></i>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">Fresh Broiler Chicken</h3>
        <p className="text-gray-600 mb-4 group-hover:text-white transition-colors duration-300">
          Whole chickens and portions available for households, spaza shops, supermarkets, schools, and health facilities
        </p>
        <ul className="text-gray-600 list-disc pl-5 group-hover:text-white transition-colors duration-300">
          <li>Whole birds</li>
          <li>Portions (legs, wings, breasts)</li>
          <li>Bulk orders available</li>
          <li>Local delivery services</li>
        </ul>
      </div>

      {/* Card 2 - orange hover */}
      <div className="poultry-card group bg-white p-6 rounded-lg shadow hover:bg-orange-600 transition-colors duration-300">
        <i className="fas fa-egg text-3xl text-yellow-700 mb-4 group-hover:text-white transition-colors duration-300"></i>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">Farm-Fresh Eggs</h3>
        <p className="text-gray-600 mb-4 group-hover:text-white transition-colors duration-300">
          Fresh eggs available in trays and bulk orders for all customer segments
        </p>
        <ul className="text-gray-600 list-disc pl-5 group-hover:text-white transition-colors duration-300">
          <li>Tray packaging</li>
          <li>Bulk orders available</li>
          <li>Regular supply arrangements</li>
          <li>Local delivery services</li>
        </ul>
      </div>

    </div>

    <div className="mt-12 bg-white p-6 rounded-lg shadow text-center group hover:bg-blue-900 transition-colors duration-300">
      <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
        <i className="fas fa-info-circle text-yellow-700 group-hover:text-white mr-2 transition-colors duration-300"></i> 
        Please note: We do not sell poultry feed or animal feed products
      </p>
    </div>
  </div>
</section>


      {/* Payment Methods */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Payment Methods</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="payment-method">
              <i className="fas fa-university text-4xl text-green-800 mb-3"></i>
              <h3 className="font-semibold">EFT / Bank Transfer</h3>
            </div>
            
            <div className="payment-method">
              <i className="fas fa-money-bill-wave text-4xl text-green-800 mb-3"></i>
              <h3 className="font-semibold">Cash on Delivery</h3>
            </div>
            
            <div className="payment-method">
              <i className="fas fa-credit-card text-4xl text-green-800 mb-3"></i>
              <h3 className="font-semibold">PayFast</h3>
            </div>
            
            <div className="payment-method">
              <i className="fas fa-mobile-alt text-4xl text-green-800 mb-3"></i>
              <h3 className="font-semibold">Ozow</h3>
            </div>
            
            <div className="payment-method">
              <i className="fas fa-coins text-4xl text-green-800 mb-3"></i>
              <h3 className="font-semibold">Crypto (Coming Soon)</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="stat-card p-6">
              <i className="fas fa-truck text-4xl mb-4"></i>
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p>Deliveries Monthly</p>
            </div>
            
            <div className="stat-card p-6">
              <i className="fas fa-users text-4xl mb-4"></i>
              <h3 className="text-3xl font-bold mb-2">200+</h3>
              <p>Happy Clients</p>
            </div>
            
            <div className="stat-card p-6">
              <i className="fas fa-tree text-4xl mb-4"></i>
              <h3 className="text-3xl font-bold mb-2">1000+</h3>
              <p>Hectares Managed</p>
            </div>
            
            <div className="stat-card p-6">
              <i className="fas fa-egg text-4xl mb-4"></i>
              <h3 className="text-3xl font-bold mb-2">10,000+</h3>
              <p>Eggs Sold Weekly</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Ready to work with us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">Contact us today to discuss your forestry or poultry needs. We offer customized solutions for both individual and commercial clients.</p>
          <a href="/contact" className="btn-primary text-white px-8 py-3 rounded-md text-lg font-semibold inline-block">Contact Us</a>
        </div>
      </section>

      {/* Footer - You might want to use your existing Footer component instead */}
    
      {/* Add the CSS styles */}
      <style>
        {`
          :root {
            --forest-green: #2E7D32;
            --earth-brown: #795548;
            --egg-white: #F9F9F9;
            --accent-gold: #FFC107;
          }
          
          .hero-section {
            background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80');
            background-size: cover;
            background-position: center;
          }
          
          .section-title {
            position: relative;
            display: inline-block;
            margin-bottom: 2rem;
          }
          
          .section-title:after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 50px;
            height: 3px;
            background-color: var(--forest-green);
          }
          
          .service-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-left: 4px solid var(--forest-green);
          }
          
          .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          
          .poultry-card {
            border-left-color: var(--accent-gold);
          }
          
          .btn-primary {
            background-color: var(--forest-green);
            transition: all 0.3s ease;
          }
          
          .btn-primary:hover {
            background-color: #1B5E20;
            transform: translateY(-2px);
          }
          
          .stat-card {
            background: linear-gradient(135deg, var(--forest-green) 0%, #1B5E20 100%);
            border-radius: 10px;
            color: white;
          }
          
          .payment-method {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            transition: all 0.3s ease;
          }
          
          .payment-method:hover {
            border-color: var(--forest-green);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
          
          .forestry-bg {
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80');
            background-size: cover;
            background-position: center;
            color: white;
          }
          
          .poultry-bg {
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1589923188937-cb64779f4abe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80');
            background-size: cover;
            background-position: center;
            color: white;
          }
          
          @media (max-width: 768px) {
            .hero-title {
              font-size: 2rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default About;