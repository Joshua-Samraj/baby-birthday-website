import React, { useRef, useState } from "react";
import { Play, Pause, ArrowBigRight } from "lucide-react";

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState<string | false>(false);
  const [showHint, setShowHint] = useState(true); // arrow + message hint

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
      setShowHint(false); // hide arrow + message after first click
    }
  };

  const triggerPopup = (message: string) => {
    setShowPopup(message);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div>
      {/* Music Button */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        {/* Arrow + Message */}
        {showHint && (
          <div className="flex items-center space-x-2 animate-pulse">
            <span className="text-sm font-medium text-pink-100 bg-pink-600/80 px-3 py-1 rounded-lg shadow-lg">
              Tap here to start music
            </span>
            <ArrowBigRight className="w-8 h-8 text-pink-400  drop-shadow-[0_0_6px_#f472b6]" />
          </div>
        )}

        <button
          onClick={togglePlay}
          className="bg-pink-500/80 backdrop-blur-md text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition-all"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>

        <audio ref={audioRef} loop>
          <source src="/Music/1.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Popup Notification (Clickable) */}
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
