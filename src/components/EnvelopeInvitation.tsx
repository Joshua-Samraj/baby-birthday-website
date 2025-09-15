import React, { useState, useEffect } from "react";
import { MapPin, Calendar, Clock, Phone, Mail, Gift, X, Play } from "lucide-react";

// Video Modal Component (Local Video)
const VideoModal = ({ isOpen, onClose, videoSrc }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-11/12 max-w-3xl bg-black rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 z-10 text-white hover:text-gray-300 transition-colors"
        >
          <X size={32} />
        </button>

        <div className="aspect-video">
          <video 
            className="w-full h-full" 
            controls 
            autoPlay
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

// Confetti Component
const ConfettiExplosion = () => {
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
        const confettiCount = 100;
        const newConfetti = Array.from({ length: confettiCount }).map((_, i) => ({
    id: i,
    style: {
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 4}s`,
        // animationDelay has been removed
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
    },
    size: Math.random() * 8 + 4,
}));
        setConfetti(newConfetti);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {confetti.map(c => (
                <div
                    key={c.id}
                    className="absolute top-0 animate-confettiFall rounded-full"
                    style={{
                        ...c.style,
                        width: `${c.size}px`,
                        height: `${c.size}px`,
                    }}
                />
            ))}
        </div>
    );
};


const EnvelopeInvitation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex flex-col items-center justify-center p-4 overflow-x-hidden">
      {/* Flash and Confetti Effects */}
      {isOpening && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* <div className="absolute inset-0 bg-white animate-flash"></div> */}
        </div>
      )}
      {isOpen && <ConfettiExplosion />}

      <div className="relative w-full max-w-4xl flex flex-col items-center">
        {/* Envelope Container */}
          <div
          className={`relative transition-all duration-1000 transform ${
            isOpening
              ? "animate-shake scale-110"
              : isOpen
              ? "scale-95 opacity-0 -translate-y-24"
              : "scale-100 opacity-100 "
          }`}
          style={{ perspective: "1000px", zIndex: isOpen ? 1 : 30 }}
        >
          {/* Envelope Flap */}
          <div
            className={`absolute top-0 left-0 w-full bg-blue-200 transition-transform duration-700 ease-in-out ${
                isOpening ? "animate-flapShake" : isOpen ? "[transform:rotateX(180deg)]" : "[transform:rotateX(0deg)]"
            }`}
            style={{
              height: "60%",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transformOrigin: "top center",
              zIndex: 10,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-10 md:w-16 md:h-12 bg-gradient-to-b from-blue-300 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
                    <Gift className="w-6 h-6 md:w-8 md:h-8 text-blue-800" />
                </div>
            </div>
          </div>

          {/* Envelope Base */}
          <div className="w-48 h-32 md:w-64 md:h-40 bg-blue-300 rounded-b-lg shadow-xl relative z-0"></div>
        </div>

        {/* Tap to Open Button */}
        {!isOpen && !isOpening && (
          <button
            onClick={handleOpenEnvelope}
            className="mt-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold text-base md:text-lg shadow-lg transform transition-all duration-300 hover:scale-105 animate-pulseBright"
          >
            Tap to Open
          </button>
        )}

        {/* Invitation Card */}
        {isOpen && (
          <div
            className={`absolute top-0 md:inset-0 z-20 transition-all duration-1000 transform ${
              isOpen
                ? "translate-y-0 opacity-100 scale-100 animate-cardReveal"
                : "translate-y-full opacity-0 scale-95"
            }`}
          >
            <div className="w-full max-w-5xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden animate-slideUp animate-cardGlow">

              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white p-6 md:p-8 text-center relative overflow-hidden animate-headerShimmer">
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2 animate-fadeInUp animate-textGlow">
                        You're Invited!
                    </h1>
                    <p className="text-lg md:text-2xl font-light animate-fadeInUp animation-delay-200 animate-textFloat">
                        Join us for a Birthday Celebration
                    </p>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-8">
                {/* Left Column: Party Details */}
                <div className="space-y-4 md:space-y-6 opacity-0 animate-fadeInStagger" style={{ animationDelay: '0.5s'}}>
                  <div className="text-center mb-4 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
                      Amanda Sarah's 1st Birthday
                    </h2>
                    <p className="text-base md:text-lg text-gray-600">
                      Let's celebrate together!
                    </p>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    {/* Date, Time, Location with staggered animation */}
                    {[
                      { icon: Calendar, label: "Date", value: "Saturday, 12/10/25", subvalue: ""},
                      { icon: Clock, label: "Time", value: "6:00pm", subvalue: ""},
                      { icon: MapPin, label: "Location", value: "The Garden Venue", subvalue: "123 Celebration St, Party City"},
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 md:space-x-4 p-3 bg-blue-50 rounded-lg opacity-0 animate-fadeInStagger" style={{ animationDelay: `${0.7 + index * 0.2}s` }}>
                        <item.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-blue-800 text-sm md:text-base">{item.label}</p>
                          <p className="text-gray-700 text-sm md:text-base">{item.value}</p>
                          {item.subvalue && <p className="text-xs text-gray-500">{item.subvalue}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Video & Theme */}
                <div className="space-y-4 md:space-y-6 opacity-0 animate-fadeInStagger" style={{ animationDelay: '0.6s'}}>
                  {/* Video Section */}
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-4 md:p-6 opacity-0 animate-fadeInStagger" style={{ animationDelay: '1.3s'}}>
                    <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-3 md:mb-4">Special Invitation Video</h3>
                    <button 
                        onClick={() => setIsVideoModalOpen(true)}
                        className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center group hover:bg-gray-300 transition-colors"
                    >
                      <video
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        src="/videos/2.mp4#t=0.1" /* The #t=0.1 helps browsers display the first frame */
                        muted
                        playsInline
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                      {/* <div className="text-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor"/>
                        </div>
                        <p className="text-gray-600 text-sm md:text-base">Click to play</p>
                      </div> */}
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-50">
                        <div className="text-center">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500 bg-opacity-80 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform shadow-lg border-2 border-white/50">
                            <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor"/>
                          </div>
                          <p className="text-white text-sm md:text-base font-semibold drop-shadow-md">Click to play</p>
                        </div>
                      </div>
                    </button>
                  </div>
                  
                  {/* Party Theme & Dress Code */}
                  {/* <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl p-4 md:p-6 opacity-0 animate-fadeInStagger" style={{ animationDelay: '1.5s'}}>
                    <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-3 md:mb-4">Party Details</h3>
                    <div className="space-y-2 md:space-y-3">
                        <div>
                            <p className="font-semibold text-blue-700 text-sm md:text-base">Theme</p>
                            <p className="text-gray-600 text-sm md:text-base">Elegant Blue & Silver</p>
                        </div>
                        <div>
                            <p className="font-semibold text-blue-700 text-sm md:text-base">Dress Code</p>
                            <p className="text-gray-600 text-sm md:text-base">Semi-formal attire</p>
                        </div>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* RSVP Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-8 opacity-0 animate-fadeInStagger" style={{ animationDelay: '1.7s'}}>
                <div className="text-center mb-4 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">Contact Details</h3>
                  {/* <p className="text-gray-600 text-sm md:text-base">
                    Please confirm your attendance by March 10th
                  </p> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
                    <a href="tel:555-123-4567" className="flex items-center justify-center space-x-3 p-3 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all">
                        <Phone className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        <div>
                            <p className="font-semibold text-blue-800 text-sm md:text-base">Call</p>
                            <p className="text-gray-700 text-sm md:text-base">(555) 123-4567</p>
                        </div>
                    </a>
                    <a href="mailto:rsvp@birthday.com" className="flex items-center justify-center space-x-3 p-3 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all">
                        <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        <div>
                            <p className="font-semibold text-blue-800 text-sm md:text-base">Email</p>
                            <p className="text-gray-700 text-sm md:text-base">rsvp@birthday.com</p>
                        </div>
                    </a>
                </div>

                {/* <div className="text-center mt-4 md:mt-6">
                    <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold text-base md:text-lg shadow-lg transform transition-all duration-300 hover:scale-105">
                        RSVP Now
                    </button>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Modal Render */}
      <VideoModal 
  isOpen={isVideoModalOpen} 
  onClose={() => setIsVideoModalOpen(false)} 
  videoSrc="/videos/2.mp4"  // Place invitation.mp4 inside public/videos/
 />

    </div>
  );
};

export default EnvelopeInvitation;