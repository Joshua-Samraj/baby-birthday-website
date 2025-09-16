import React from "react";
import { Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-gray-300 py-6 px-6 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Company Info */}
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold text-white mb-1">DigiNest Solution</h1>
          {/* Optional description */}
          {/* <p className="text-sm leading-relaxed">We help businesses grow...</p> */}
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-1">Contact Us</h4>
          <p className="flex items-center justify-center md:justify-start gap-1 text-sm">
            <Phone size={16} />
            <a href="tel:+9500561937" className="hover:text-yellow-400 transition-colors">
              +91 95005 61937
            </a>
          </p>
          <p className="mt-1 text-sm">Tirunelveli, Tamil Nadu</p>
        </div>  

      </div>

      {/* Bottom - Copyright */}
      <div className="border-t border-gray-700 mt-4 pt-2 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} DigiNest Solution. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
