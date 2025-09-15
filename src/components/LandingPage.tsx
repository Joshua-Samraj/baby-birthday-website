import React, { useState } from 'react';
import { MapPin, Mail, Video, Calendar, Heart, Star, X } from 'lucide-react';

interface LandingPageProps {
  onOpenInvitation: () => void;
}

// Centralized Color Variables
const colors = {
  gradientBg: "bg-gradient-to-br from-pink-400 via-pink-500 to-rose-900",
  headerText: "text-white",
  subText: "text-pink-100",
  star: "text-yellow-400",

  // Main photo section
  mainPhotoOverlay: "bg-gradient-to-r from-pink-500 to-rose-600",
  mainPhotoBg: "bg-gradient-to-br from-pink-100 to-rose-100",
  mainPhotoOverlay2: "bg-gradient-to-t from-rose-900/30 to-transparent",

  // Action buttons
  locationBtn: "bg-gradient-to-br from-pink-400 to-rose-500",
  videoBtn: "bg-gradient-to-br from-rose-400 to-fuchsia-600",
  invitationBtn: "bg-gradient-to-br from-pink-500 to-fuchsia-600",
  invitationBtnHover: "hover:from-pink-600 hover:to-fuchsia-700",

  // Quick info cards
  quickInfoBox: "bg-white/10 backdrop-blur-md border border-white/20",
  quickInfoText: "text-white font-semibold",
  quickInfoSubText: "text-pink-200 text-sm",
  quickInfoIconBlue: "text-rose-300",   // swapped blue → rose
  quickInfoIconPink: "text-fuchsia-300",

  // Call-to-action button
  ctaBtn: "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600",
};


const VideoModal: React.FC<{ isOpen: boolean; onClose: () => void; videoSrc: string }> = ({ isOpen, onClose, videoSrc }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative w-11/12 max-w-3xl bg-black rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
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
    <div className={`min-h-screen ${colors.gradientBg}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-pattern opacity-10"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-indigo-400 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-blue-300 rounded-full opacity-15 animate-bounce animation-delay-1000"></div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <Star className={`w-8 h-8 ${colors.star} mr-2 animate-pulse`} />
              <h1 className={`text-4xl md:text-6xl font-bold ${colors.headerText} animate-fadeInUp`}>
                Birthday Celebration
              </h1>
              <Star className={`w-8 h-8 ${colors.star} ml-2 animate-pulse`} />
            </div>
            <p className={`text-xl md:text-2xl ${colors.subText} animate-fadeInUp animation-delay-200`}>
              Join us for an unforgettable celebration!
            </p>
          </div>

          {/* Main Photo */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative group">
              <div className={`absolute inset-0 ${colors.mainPhotoOverlay} rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
                <div className={`aspect-video ${colors.mainPhotoBg} rounded-xl flex items-center justify-center overflow-hidden`}>
                  <img 
                    src="Image/1.jpg" 
                    alt="Birthday Celebration" 
                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 ${colors.mainPhotoOverlay2} rounded-xl`}></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Amanda Sarah's 1st Birthday</h2>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span className="text-lg">12/10/25</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 justify-items-center">
            
            {/* Location */}
            <button
              onClick={handleLocationClick}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-center">
                <div className={`w-16 h-16 ${colors.locationBtn} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                <p className="text-blue-100 text-sm">The Garden Venue</p>
                <p className="text-blue-200 text-xs">123 Celebration Street</p>
              </div>
            </button>

            {/* AI Video */}
            <button
              onClick={handleVideoClick}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-center">
                <div className={`w-16 h-16 ${colors.videoBtn} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Video</h3>
                <p className="text-blue-100 text-sm">Personal Message</p>
                <p className="text-blue-200 text-xs">Tap to watch</p>
              </div>
            </button>

            {/* E-Invitation */}
            <button
              onClick={onOpenInvitation}
              className={`group ${colors.invitationBtn} rounded-2xl p-6 ${colors.invitationBtnHover} transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-pulse col-span-full md:col-span-1`}
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
          </div>

          {/* Quick Info */}
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`${colors.quickInfoBox} rounded-xl p-4 text-center`}>
              <Calendar className={`w-6 h-6 ${colors.quickInfoIconBlue} mx-auto mb-2`} />
              <p className={colors.quickInfoText}>12/10/25</p>
              <p className={colors.quickInfoSubText}>Sunday</p>
            </div>
            
            <div className={`${colors.quickInfoBox} rounded-xl p-4 text-center`}>
              <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                <span className={`${colors.quickInfoIconBlue} font-bold text-lg`}>🕰️</span>
              </div>
              <p className={colors.quickInfoText}>6:00 PM</p>
              <p className={colors.quickInfoSubText}>Start Time</p>
            </div>
            
            <div className={`${colors.quickInfoBox} rounded-xl p-4 text-center`}>
              <Heart className={`w-6 h-6 ${colors.quickInfoIconPink} mx-auto mb-2`} />
              <p className={colors.quickInfoText}>1st Birthday</p>
              <p className={colors.quickInfoSubText}>Special Day</p>
            </div>
            
            <div className={`${colors.quickInfoBox} rounded-xl p-4 text-center`}>
              <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                <span className={`${colors.quickInfoIconBlue} font-bold text-lg`}>🎉</span>
              </div>
              <p className={colors.quickInfoText}>Celebration</p>
              <p className={colors.quickInfoSubText}>Party Time</p>
            </div>
          </div>

          {/* CTA */}
          {/* <div className="text-center mt-12">
            <p className="text-blue-100 text-lg mb-4">Ready to celebrate with us?</p>
            <button
              onClick={onOpenInvitation}
              className={`${colors.ctaBtn} text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              View Full Invitation ✨
            </button>
          </div> */}
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="/videos/2.mp4"
      />
    </div>
  );
};

export default LandingPage;
