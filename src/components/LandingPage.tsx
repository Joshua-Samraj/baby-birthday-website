import React, { useState } from 'react';
import { MapPin, Mail, Video, Calendar, Heart, Star, X } from 'lucide-react';

interface LandingPageProps {
  onOpenInvitation: () => void;
}

// Reusable Video Modal
const VideoModal: React.FC<{ isOpen: boolean; onClose: () => void; videoSrc: string }> = ({ isOpen, onClose, videoSrc }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative w-11/12 max-w-3xl bg-black rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-white hover:text-gray-300 transition"
        >
          <X size={28} />
        </button>

        <video className="w-full h-auto" controls autoPlay>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({ onOpenInvitation }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleLocationClick = () => {
    window.open('https://maps.google.com/?q=The+Garden+Venue+123+Celebration+Street', '_blank');
  };

  const handleVideoClick = () => {
    setIsVideoOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-blue-pattern opacity-10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-indigo-400 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-blue-300 rounded-full opacity-15 animate-bounce animation-delay-1000"></div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <Star className="w-8 h-8 text-yellow-400 mr-2 animate-pulse" />
              <h1 className="text-4xl md:text-6xl font-bold text-white animate-fadeInUp">
                Birthday Celebration
              </h1>
              <Star className="w-8 h-8 text-yellow-400 ml-2 animate-pulse" />
            </div>
            <p className="text-xl md:text-2xl text-blue-100 animate-fadeInUp animation-delay-200">
              Join us for an unforgettable celebration!
            </p>
          </div>

          {/* Main Photo Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center overflow-hidden">
                  <img 
                    src="Image/1.jpg" 
                    alt="Birthday Celebration" 
                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-xl"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Sarah's 1st Birthday</h2>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span className="text-lg">March 15th, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
            
            {/* Location Button */}
            <button
              onClick={handleLocationClick}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                <p className="text-blue-100 text-sm">The Garden Venue</p>
                <p className="text-blue-200 text-xs">123 Celebration Street</p>
              </div>
            </button>

            {/* E-Invitation Button */}
            <button
              onClick={onOpenInvitation}
              className="group bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-pulse"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">E-Invitation</h3>
                <p className="text-blue-100 text-sm">Open Digital Invite</p>
                <p className="text-blue-200 text-xs">Tap to view details</p>
              </div>
            </button>

            {/* AI Video Button */}
            <button
              onClick={handleVideoClick}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Video</h3>
                <p className="text-blue-100 text-sm">Personal Message</p>
                <p className="text-blue-200 text-xs">Tap to watch</p>
              </div>
            </button>
          </div>

          {/* Quick Info Cards */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
              <Calendar className="w-6 h-6 text-blue-300 mx-auto mb-2" />
              <p className="text-white font-semibold">March 15th</p>
              <p className="text-blue-200 text-sm">Saturday</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
              <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                <span className="text-blue-300 font-bold text-lg">🕰️</span>
              </div>
              <p className="text-white font-semibold">7:00 PM</p>
              <p className="text-blue-200 text-sm">Start Time</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
              <Heart className="w-6 h-6 text-pink-300 mx-auto mb-2" />
              <p className="text-white font-semibold">1st Birthday</p>
              <p className="text-blue-200 text-sm">Special Day</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
              <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                <span className="text-blue-300 font-bold text-lg">🎉</span>
              </div>
              <p className="text-white font-semibold">Celebration</p>
              <p className="text-blue-200 text-sm">Party Time</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-blue-100 text-lg mb-4">Ready to celebrate with us?</p>
            <button
              onClick={onOpenInvitation}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              View Full Invitation ✨
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="/videos/2.mp4" // place your video in public/videos/
      />
    </div>
  );
};

export default LandingPage;
