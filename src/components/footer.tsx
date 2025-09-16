import React from "react";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-gray-300 py-10 px-6 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Company Info */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white mb-2">DigiNest</h2>
          {/* <p className="text-sm leading-relaxed">
            We help businesses grow with creative digital solutions.  
            Transform your ideas into memorable experiences.
          </p> */}
        </div>

        {/* Services */}
        {/* <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-2">Our Services</h3>
          <ul className="text-sm space-y-1">
            <li> Invitation Cards</li>
            <li> Wedding Programs</li>
            <li> Birthday Invitations</li>
            <li> Event Management</li>
            <li> Digital Marketing Campaigns</li>
          </ul>
        </div> */}

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-2">Contact Us</h3>
          <p className="flex items-center justify-center md:justify-start gap-2 mt-1">
            <Phone size={16} />
            <a href="tel:+9500561937" className="hover:text-yellow-400 transition-colors">
              +91 95005 61937
            </a>
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 mt-1">
            {/* <Mail size={16} /> */}
            {/* <a href="mailto:info@dma.com" className="hover:text-yellow-400 transition-colors">
              info@dma.com
            </a> */}
          </p>
          <p className="mt-2">Tirunelveli, Tamil Nadu</p>
        </div>  

        {/* Social Links */}
        {/* <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-1">
            <a href="#" className="hover:text-yellow-400 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div> */}
      </div>

      {/* Bottom - Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} DigiNest Solution . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
