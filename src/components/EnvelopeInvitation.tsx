import React, { useState, useEffect } from "react";
import { Gift, X } from "lucide-react";

// 🎨 Common Color Variables
const colors = {
  gradientBg: "bg-gradient-to-br from-pink-900 via-pink-800 to-rose-900",
  envelopeFlap: "bg-pink-200",
  envelopeBase: "bg-pink-300",
  giftIcon: "text-pink-800",
  buttonGradient: "bg-gradient-to-r from-pink-400 via-rose-500 to-fuchsia-500",
  buttonHover: "hover:from-pink-500 hover:to-fuchsia-600",
  headerGradient: "bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600",
  textPrimary: "text-pink-800",
  textSecondary: "text-gray-600", 
  detailBox: "bg-pink-50",
  videoBox: "bg-gradient-to-br from-pink-100 to-rose-100",
  rsvpBox: "bg-gradient-to-r from-pink-50 to-rose-50",
  callIcon: "text-pink-600",
  emailIcon: "text-pink-600",
  playButton: "bg-pink-500",
};


interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc }) => {

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-11/12 max-w-3xl bg-black rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 text-white hover:text-gray-300 transition-colors"
        >
          <X size={32} />
        </button>

        <div className="aspect-video">
          <video className="w-full h-full" controls autoPlay>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

const ConfettiExplosion = () => {
  interface ConfettiPiece {
  id: number;
  style: React.CSSProperties;
  size: number;
}

const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);


 useEffect(() => {
  const confettiCount = 100;
  const newConfetti = Array.from({ length: confettiCount }).map((_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 4}s`,
      // Pink color range: hue 330–360 (magenta to pink)
      backgroundColor: `hsl(${330 + Math.random() * 30}, 80%, 65%)`,
    },
    size: Math.random() * 8 + 4,
  }));
  setConfetti(newConfetti);
}, []);


  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((c) => (
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
    }, 500);
  };

  return (
    <div
      className={`min-h-screen ${colors.gradientBg} flex flex-col items-center justify-center p-4 overflow-x-hidden`}
    >
      {isOpening && (
        <div className="fixed inset-0 z-50 pointer-events-none"></div>
      )}
      {isOpen && <ConfettiExplosion />}

      <div className="relative w-full max-w-4xl flex flex-col items-center">
        {/* Envelope */}
        <div
          className={`relative transition-all duration-1000 transform ${
            isOpening
              ? "animate-shake scale-210"
              // ? ""
              : isOpen
              ? "scale-95 opacity-0 -translate-y-24"
              : "scale-100 opacity-100"
          }`}
          style={{ perspective: "1000px", zIndex: isOpen ? 1 : 30 }}
        >
          
          {/* Flap */}
          <div
            className={`absolute top-0 left-0 w-full ${colors.envelopeFlap} transition-transform duration-700 ease-in-out ${
              isOpening
                ? ""
                : isOpen
                ? "[transform:rotateX(180deg)]"
                : "[transform:rotateX(0deg)]"
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
                  <Gift className={`w-6 h-6 md:w-8 md:h-8 ${colors.giftIcon}`} />
                </div>
            </div>
          </div>

          {/* Base */}
          <div className={`w-48 h-32 md:w-64 md:h-40 ${colors.envelopeBase} rounded-b-lg shadow-xl relative z-0`}></div>
        </div>

        {/* Open Button */}
        {!isOpen && !isOpening && (
          <button
            onClick={handleOpenEnvelope}
            className={`mt-6 ${colors.buttonGradient} ${colors.buttonHover} text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold text-base md:text-lg shadow-lg transform transition-all duration-300 hover:scale-105 animate-pulseBright`}
          >
            Tap to Open
          </button>
        )}

        {/* Invitation */}
        {/* Invitation Image */}
{isOpen && (
  <div
    className={`fixed inset-0 z-20 flex items-center justify-center transition-all duration-1000 transform ${
      isOpen
        ? "opacity-100 scale-100 animate-cardReveal"
        : "opacity-0 scale-95"
    }`}
  >
    <div className="w-full max-w-3xl mx-auto flex justify-center px-4">
      <img
        src="/Image/invitation_1.png" // <-- replace with your image path
        alt="Birthday Invitation"
        className="rounded-2xl shadow-2xl w-full max-w-lg"
      />
    </div>
  </div>
)}


      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/videos/new.mp4"
      />
    </div>
  );
};

export default EnvelopeInvitation;
