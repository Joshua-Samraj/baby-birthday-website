import React, { useRef, useState } from "react";
import { Play, Pause, Music } from "lucide-react";

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState<string | false>(false);
  const [showIntroPopup, setShowIntroPopup] = useState(true); // 🎶 intro message popup

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        triggerPopup("⏸ Music Paused");
      } else {
        audioRef.current.play();
        triggerPopup("🎵 Music Playing");
      }
      setIsPlaying(!isPlaying);
    }
  };

  const triggerPopup = (message: string) => {
    setShowPopup(message);
    setTimeout(() => setShowPopup(false), 2000);
  };

  // 🪄 Function for first play when user accepts
  const handleStartMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      triggerPopup("🎵 Let the music begin!");
    }
    setShowIntroPopup(false);
  };

  // 🚫 Skip without playing
  const handleSkip = () => {
    setShowIntroPopup(false);
    triggerPopup("❌ Skipped music");
  };

  return (
    <div>
      {/* 🎶 Intro Popup Modal */}
      {showIntroPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center animate-fadeIn">
            <Music className="w-12 h-12 mx-auto text-pink-600 mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              “Where words fail, music speaks.” 🎶
            </h2>
            <p className="text-gray-600 mb-6">
              Would you like to enjoy background music while browsing?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleStartMusic}
                className="bg-pink-600 text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-pink-700 transition"
              >
                ▶ Play Music
              </button>
              <button
                onClick={handleSkip}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-medium shadow-md hover:bg-gray-400 transition"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Music Button (top-right) */}
      <div className="fixed top-4 right-4 z-40 flex items-center space-x-2">
        <button
          onClick={togglePlay}
          className="bg-pink-500/80 backdrop-blur-md text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition-all"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>

        <audio ref={audioRef} loop>
          <source src="/Music/2.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div
          onClick={togglePlay}
          className="fixed top-20 right-6 bg-pink-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-fadeInOut z-50 cursor-pointer hover:bg-pink-700 transition"
        >
          {showPopup}
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
