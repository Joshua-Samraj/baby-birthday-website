// import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-6 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 mt-auto shadow-inner">
      {/* Left */}
      <div className="text-center md:text-left mb-2 md:mb-0">
        <span className="font-semibold">Digital Marking Agency</span> &copy; {new Date().getFullYear()}
      </div>

      {/* Center */}
      <div className="text-center text-sm md:text-base">
        Tirunelveli
      </div>

      {/* Right */}
      <div className="text-center md:text-right">
        Contact:{" "}
        <a
          href="tel:+9500561937"
          className="underline hover:text-yellow-300 transition-colors"
        >
          +9500561937
        </a>
      </div>
    </footer>
  );
};

export default Footer;
