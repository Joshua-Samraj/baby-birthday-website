import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
// MODIFICATION: Added Shrink icon
import { X, ChevronLeft, ChevronRight, Download, Smartphone, Fullscreen, Shrink } from 'lucide-react';

// --- Custom Hook to Detect Orientation (Unchanged) ---
const useScreenOrientation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsMobile(width < 768); 
      setIsPortrait(height > width);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  return { isMobile, isPortrait };
};

// --- MODIFICATION: Updated Overlay Component ---
// We now pass isFullscreen to hide the button if already in fullscreen
const RotateDeviceOverlay = ({ isFullscreen }: { isFullscreen: boolean }) => {

  const handleForceRotate = async () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if ((elem as any).mozRequestFullScreen) {
        await (elem as any).mozRequestFullScreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        await (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        await (elem as any).msRequestFullscreen();
      }

      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock('landscape');
      }
    } catch (error) {
      console.warn('Failed to enter fullscreen or lock orientation:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white rounded-lg p-10 h-[300px] md:h-[400px]">
      
      <div className="relative mb-6">
        <Smartphone size={64} className="animate-rotate-phone" />
      </div>
      <h2 className="text-xl font-bold mb-2">Please Rotate Your Device</h2>
      <p className="text-gray-300 text-center mb-6">
        This album is best viewed in landscape mode.
      </p>
      
      {/* --- MODIFICATION: Button is now conditional --- */}
      {/* Only show this button if NOT already in fullscreen */}
      {/* {!isFullscreen && (
        <button
          onClick={handleForceRotate}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Fullscreen size={16} className="mr-2" />
          Enter Fullscreen & Rotate
        </button>
      )} */}
    </div>
  );
};


// --- Your Original Interfaces (Unchanged) ---
interface AlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface PageFlip {
  flipNext: () => void;
  flipPrev: () => void;
  turnToPage: (page: number) => void;
}
type FlipBookRef = {
  pageFlip: () => PageFlip;
};
interface FlipEvent {
  data: number; // The new page number
}

// --- Main Album Modal Component ---
const AlbumModal: React.FC<AlbumModalProps> = ({ isOpen, onClose }) => {
  const flipBookRef = useRef<FlipBookRef | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); 
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageInput, setPageInput] = useState<string>('');
  const { isMobile, isPortrait } = useScreenOrientation();
  
  // --- MODIFICATION: Added Fullscreen State ---
  const [isFullscreen, setIsFullscreen] = useState(false);

  // --- Responsive Logic (Unchanged) ---
  const bookWidth = 890; // 445 * 2
  const bookHeight = 300; 
  const aspectRatio = bookHeight / bookWidth;
  const [size, setSize] = useState({
    width: bookWidth,
    height: bookHeight,
  });

  useEffect(() => {
    if (!isOpen) return; 
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newWidth = Math.min(containerWidth, bookWidth);
        const newHeight = newWidth * aspectRatio;
        setSize({ width: newWidth, height: newHeight });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [isOpen, aspectRatio]); 

  // --- MODIFICATION: Add Fullscreen Listener ---
  useEffect(() => {
    const handleFullscreenChange = () => {
      // document.fullscreenElement is the standard way to check
      setIsFullscreen(!!document.fullscreenElement);
    };

    // Add listeners for all browser prefixes
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari
    document.addEventListener('mozfullscreenchange', handleFullscreenChange); // Firefox
    document.addEventListener('MSFullscreenChange', handleFullscreenChange); // IE/Edge

    // Cleanup
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []); // Empty dependency array, runs once on mount


  if (!isOpen) return null;

  // --- Page Data (Unchanged) ---
  const pages: string[] = [
    '/album/front.jpg',

    '/album/(1)_left.jpg',

    '/album/(1)_right.jpg',

    '/album/(2)_left.jpg',

    '/album/(2)_right.jpg',

    '/album/(3)_left.jpg',

    '/album/(3)_right.jpg',

    '/album/(4)_left.jpg',

    '/album/(4)_right.jpg',

    '/album/(5)_left.jpg',

    '/album/(5)_right.jpg',

    '/album/(6)_left.jpg',

    '/album/(6)_right.jpg',

    '/album/(7)_left.jpg',

    '/album/(7)_right.jpg',

    '/album/(8)_left.jpg',

    '/album/(8)_right.jpg',

    '/album/(9)_left.jpg',

    '/album/(9)_right.jpg',

    '/album/(10)_left.jpg',

    '/album/(10)_right.jpg',

    '/album/(11)_left.jpg',

    '/album/(11)_right.jpg',

    '/album/(12)_left.jpg',

    '/album/(12)_right.jpg',

    '/album/(13)_left.jpg',

    '/album/(13)_right.jpg',

    '/album/(14)_left.jpg',

    '/album/(14)_right.jpg',

    '/album/(15)_left.jpg',

    '/album/(15)_right.jpg',

    '/album/(16)_left.jpg',

    '/album/(16)_right.jpg',

    '/album/(17)_left.jpg',

    '/album/(17)_right.jpg',

    '/album/(18)_left.jpg',

    '/album/(18)_right.jpg',

    '/album/(19)_left.jpg',

    '/album/(19)_right.jpg',

    '/album/(20)_left.jpg',

    '/album/(20)_right.jpg',

    '/album/(21)_left.jpg',

    '/album/(21)_right.jpg',

    '/album/(22)_left.jpg',

    '/album/(22)_right.jpg',

    '/album/(23)_left.jpg',

    '/album/(23)_right.jpg',

    '/album/(24)_left.jpg',

    '/album/(24)_right.jpg',

    '/album/(25)_left.jpg',

    '/album/(25)_right.jpg',

    '/album/(26)_left.jpg',

    '/album/(26)_right.jpg',

    '/album/(27)_left.jpg',

    '/album/(27)_right.jpg',

    '/album/(28)_left.jpg',

    '/album/(28)_right.jpg',

    '/album/(29)_left.jpg',

    '/album/(29)_right.jpg',

    '/album/back.jpg',
  ];
  const totalPages: number = pages.length;

  // --- MODIFICATION: Added Exit Fullscreen Function ---
  const handleExitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) { // Firefox
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) { // Chrome, Safari
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) { // IE/Edge
        await (document as any).msExitFullscreen();
      }
      
      // After exiting, unlock orientation
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    } catch (error) {
      console.warn('Failed to exit fullscreen:', error);
    }
  };

  // --- Other Helper Functions (Unchanged) ---
  const goToNextPage = () => {
    if (flipBookRef.current && currentPage < totalPages - 1) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };
  const goToPrevPage = () => {
    if (flipBookRef.current && currentPage > 0) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };
  const handlePageChange = (e: FlipEvent) => {
    setCurrentPage(e.data);
  };
  const goToPage = (pageNumber: number) => {
    const targetPage = Math.max(0, Math.min(pageNumber - 1, totalPages - 1));
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().turnToPage(targetPage);
      setCurrentPage(targetPage);
    }
  };
  const handlePageInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      goToPage(pageNum);
      setPageInput('');
    }
  };
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };
  const downloadCurrentPage = () => {
    const currentPageIndex = currentPage;
    const imageUrl = pages[currentPageIndex];
    const link = document.createElement('a');
    link.href = imageUrl;
    const filename = imageUrl.split('/').pop() || `page-${currentPageIndex + 1}.jpg`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // --- End of Helper Functions ---


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8 transition-opacity duration-300" 
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* --- MODIFICATION: Wrapped buttons for layout --- */}
        <div className="absolute -top-10 right-0 z-10 flex items-center space-x-4">
          {/* --- NEW EXIT FULLSCREEN BUTTON --- */}
          {isFullscreen && (
            <button
              onClick={handleExitFullscreen}
              className="text-white hover:text-gray-300 transition"
              title="Exit Fullscreen"
            >
              <Shrink size={28} />
            </button>
          )}

          
        </div>


        {/* --- MODIFICATION: Pass isFullscreen to overlay --- */}
        {(isMobile && isPortrait) ? (
          <RotateDeviceOverlay isFullscreen={isFullscreen} />
        ) : (
          <>
            <div ref={containerRef} className="flex justify-center w-full">
              <HTMLFlipBook
                ref={flipBookRef}
                width={size.width / 2}   
                height={size.height} 
                size="stretch"     
                showCover={true}
                className="shadow-2xl"
                onFlip={handlePageChange}
                flippingTime={1000}
                mobileScrollSupport={true} 
              >
                {pages.map((src, index) => (
                  <div className="bg-gray-100" key={`page-${index}`}>
                    <img 
                      src={src} 
                      alt={`Album page ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </HTMLFlipBook>
            </div>

            {/* --- CONTROLS (Unchanged) --- */}
            <div className="flex flex-col items-center space-y-4 mt-6">
              <div className="flex items-center space-x-6">
                <form onSubmit={handlePageInputSubmit} className="flex items-center space-x-2">
                  <label htmlFor="pageInput" className="text-white text-sm font-medium">Go to page:</label>
                  <input
                    id="pageInput"
                    type="text"
                    value={pageInput}
                    onChange={handlePageInputChange}
                    placeholder="Page #"
                    className="w-20 px-3 py-1 text-sm border border-gray-300 rounded-md"
                    maxLength={3}
                  />
                  <button
                    type="submit"
                    disabled={!pageInput || parseInt(pageInput) < 1 || parseInt(pageInput) > totalPages}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    Go
                  </button>
                  
                </form>
                <button
                  onClick={downloadCurrentPage}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  title={`Download page ${currentPage + 1}`}
                >
                  <Download size={16} />
                  <span className="text-sm">Download Page</span>
                </button>

                <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition"
            title="Close Album"
          >
            <X size={32} />
          </button>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 0}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
                    currentPage === 0 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-white/90 hover:bg-white text-gray-800'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="bg-black/70 text-white px-4 py-2 rounded-lg min-w-[100px] text-center">
                  <span className="text-sm font-medium">{currentPage + 1} / {totalPages}</span>
                </div>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
                    currentPage === totalPages - 1
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-white/90 hover:bg-white text-gray-800'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </>
        )} 

      </div>
    </div>
  );
};

export default AlbumModal;