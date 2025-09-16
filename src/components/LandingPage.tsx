import React, { useState } from 'react';
import { MapPin, Mail, Video, Calendar, Heart, Star, X ,Album ,Clock} from 'lucide-react';

interface LandingPageProps {
  onOpenInvitation: () => void;
}

// Centralized Color Variables
const colors = {
  // Main gradient background
  gradientBg: "bg-gradient-to-br from-[#316280] via-[#D5B9A4] to-[#97000B]",

  // Text
  headerText: "text-[#D5B9A4]", // beige text looks good on dark background
  subText: "text-[#F5EBDD]", // lighter beige for subtitles
  star: "text-[#FFD700]", // golden star for highlights

  // Main photo section
  mainPhotoBg: "bg-gradient-to-br from-[#316280]/20 via-[#D5B9A4]/20 to-[#97000B]/20", // subtle gradient overlay
  mainPhotoOverlay2: "bg-gradient-to-t from-[#97000B]/30 to-transparent",

  // Action buttons
  locationBtn: "bg-gradient-to-br from-[#316280] to-[#D5B9A4]", // blue → beige
  videoBtn: "bg-gradient-to-br from-[#D5B9A4] to-[#97000B]", // beige → red
  invitationBtn: "bg-gradient-to-br from-[#316280] to-[#97000B]", // blue → red
  invitationBtnHover: "hover:from-[#2A4B61] hover:to-[#7B0009]", // darker shades for hover

  // Quick info cards
  quickInfoBox: "bg-white/10 backdrop-blur-md border border-[#D5B9A4]/20",
  quickInfoText: "text-[#FFFFFF] font-regular",
  quickInfoSubText: "text-[#F5EBDD] text-sm",
  quickInfoIconBlue: "text-[#316280]", // primary dark blue
  quickInfoIconPink: "text-[#97000B]", // red for emphasis

  // Call-to-action button
  ctaBtn: "bg-gradient-to-r from-[#316280] to-[#97000B] hover:from-[#2A4B61] hover:to-[#7B0009]",
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
    window.open('https://maps.app.goo.gl/SNJTCNoB98CZ7pCP6', '_blank');
  };

  const handleVideoClick = () => {
    setIsVideoOpen(true);
  };

  return (
    <div className={`min-h-screen bg-fixed ${colors.gradientBg}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-pattern opacity-10"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-indigo-400 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-blue-300 rounded-full opacity-15 animate-bounce animation-delay-1000"></div>
        {/* Birthday Elements */}
<div className="absolute inset-0 pointer-events-none overflow-hidden">
  {/* Balloons */}
  {[...Array(10)].map((_, i) => (
    <div
      key={`balloon-${i}`}
      className={`absolute w-10 h-16 text-4xl animate-float`}
      style={{
        left: `${Math.random() * 90}%`,
        top: `${Math.random() * 80}%`,
        animationDelay: `${Math.random() * 5}s`,
      }}
    >
      🎈
    </div>
  ))}

  {/* Cakes */}
  {[...Array(5)].map((_, i) => (
    <div
      key={`cake-${i}`}
      className="absolute text-2xl animate-bounce"
      style={{
        left: `${Math.random() * 90}%`,
        bottom: `${Math.random() * 10}%`,
        animationDelay: `${Math.random() * 3}s`,
      }}
    >
      🍰
    </div>
  ))}

  {/* Candles */}
  {/* {[...Array(15)].map((_, i) => (
    <div
      key={`candle-${i}`}
      className="absolute text-xl animate-pulse"
      style={{
        left: `${Math.random() * 95}%`,
        top: `${Math.random() * 90}%`,
        animationDelay: `${Math.random() * 2}s`,
      }}
    >
      🕯️
    </div>
  ))} */}

  {/* Stars for sparkle */}
  {[...Array(20)].map((_, i) => (
    <div
      key={`star-${i}`}
      className="absolute text-yellow-300 animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 14 + 8}px`,
        animationDelay: `${Math.random() * 3}s`,
      }}
    >
      ✨
    </div>
  ))}
</div>


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
              <div className={`absolute inset-0 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
                <div className={`aspect-video ${colors.mainPhotoBg} rounded-xl flex items-center justify-center overflow-hidden`}>
                  <img 
                    src="Image/2.jpg" 
                    alt="Birthday Celebration" 
                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 rounded-xl`}></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2"> 1st Birthday</h2>
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
<div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 justify-items-stretch">
  {/* Location */}
  <div className="col-span-2 md:col-span-1 flex justify-center md:justify-start">
  <button
    onClick={handleLocationClick}
    className="group w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
  >
    <div className="text-center">
      <img
        src="/Image/location.jpg"
        alt="Mall"
        className="w-full h-40 object-cover rounded-xl mb-4"
      />
      <div
        className={`w-16 h-16 ${colors.locationBtn} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <MapPin className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Sri Vaari Balaji Hall A/c</h3>
      <p className="text-blue-100 text-sm">NGO B' Colony , Near RTO Office</p>
      <p className="text-blue-200 text-xs">Tirunelveli</p>
    </div>
  </button>
  </div>

  {/* AI Video */}
  <button
    onClick={handleVideoClick}
    className="group w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
  >
    <div className="text-center">
      <div
        className={`w-16 h-16 ${colors.videoBtn} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
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
      className={`group w-full max-w-xs ${colors.invitationBtn} rounded-2xl p-6 ${colors.invitationBtnHover} transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-pulse`}
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
                {/* <span className={`${colors.quickInfoIconBlue} font-bold text-lg`}>🕰️</span> */}
                <Clock />
              </div>
              <p className={colors.quickInfoText}>6:00 PM</p>
              <p className={colors.quickInfoSubText}>Start Time</p>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-center md:justify-start">
            
            <div className={`${colors.quickInfoBox} rounded-xl p-4 text-center`}>
              <Heart className={`w-6 h-6 ${colors.quickInfoIconPink} mx-auto mb-2`} />
              <p className={colors.quickInfoText}>1st Birthday</p>
              <p className={colors.quickInfoSubText}>Special Day</p>
            </div>
            
            </div>
            {/* <div className={`${colors.quickInfoBox} rounded-xl p-4 text-center`}>
              <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                <span className={`${colors.quickInfoIconBlue} font-bold text-lg`}>🎉</span>
              </div>
              <p className={colors.quickInfoText}>Celebration</p>
              <p className={colors.quickInfoSubText}>Party Time</p>
            </div> */}
            <div className="col-span-2 md:col-span-1 flex justify-center md:justify-start">
            <div className={`${colors.quickInfoBox} rounded-xl p-4 text-center`}>
              <div className="w-60 h-6 mx-auto mb-2 flex items-center justify-center">
                <span className={`${colors.quickInfoIconBlue} font-bold text-lg`}></span>
              <Album />
              </div>
              <p className={colors.quickInfoText}>Album</p>
              <p className={colors.quickInfoSubText}>Comming Soon</p>
            </div>
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
