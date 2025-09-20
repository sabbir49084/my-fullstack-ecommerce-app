const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Afritabs</h2>
          <p className="text-sm">
            Empowering Africa’s rural economy through forestry, poultry, and community innovation.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/shop" className="hover:underline">Shop</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email: support@afritabs.co.za</p>
          <p className="text-sm">Phone: +27 123 456 789</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-2">Newsletter</h3>
          <p className="text-sm mb-2">Get updates and offers in your inbox.</p>
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 rounded-md text-black mb-2"
          />
          <button className="bg-white text-green-800 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition">
            Subscribe
          </button>
        </div>
      </div>

      <div className="text-center text-sm mt-8 text-gray-300">
        © {new Date().getFullYear()} Afritabs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
