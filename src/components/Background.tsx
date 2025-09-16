import React, { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState<string | false>(false);

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

  return (
    <div>
      {/* Music Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={togglePlay}
          className="bg-white/10 backdrop-blur-md text-white p-3 rounded-full shadow-lg hover:bg-white/20 transition-all"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>

        <audio ref={audioRef} loop>
          <source src="/Music/1.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed top-20 right-6 bg-black/80 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-fadeInOut z-50">
          {showPopup}
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
