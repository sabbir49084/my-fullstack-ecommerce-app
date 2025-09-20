import { Facebook, Globe, Mail, Phone, Twitter } from "lucide-react";

/* eslint-disable jsx-a11y/anchor-is-valid */

// src/components/layout/Topbar.jsx

const Topbar = () => {
  return (
    <div className="bg-green-900 text-white text-sm py-2 px-4 hidden md:block">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: contact info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Phone size={14} /> <span>+27 12 345 6789</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail size={14} /> <span>info@afritabs.co.za</span>
          </div>
        </div>

        {/* Right side: socials and language */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a href="#" className="hover:text-yellow-400 transition">
              <Facebook size={16} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <Twitter size={16} />
            </a>
          </div>
          <div className="flex items-center gap-1">
            <Globe size={14} />
            <select className="bg-transparent border-none text-white focus:outline-none">
              <option value="en" className="text-black">EN</option>
              <option value="af" className="text-black">AF</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
