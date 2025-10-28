import React, { useRef, useState } from 'react';
// Import the library as requested
import HTMLFlipBook from 'react-pageflip';
// Import only X, remove Chevron icons
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

// --- AlbumModal Component ---

interface AlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlbumModal: React.FC<AlbumModalProps> = ({ isOpen, onClose }) => {
  const flipBookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageInput, setPageInput] = useState('');

  if (!isOpen) return null;

  // --- IMPORTANT ---
  // These are the paths to your album page images.
  const pages = [
    "/Image/1.jpg",       // Page 1
    "/Image/2.jpg",       // Page 2
    "/Image/1234.png",    // Page 3
    "/Image/invitation_1.png", // Page 4
    "/Image/Invitation.png",   // Page 5
    "/Image/location.jpg" // Page 6
  ];

  const totalPages = pages.length;

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

  const handlePageChange = (e: any) => {
    setCurrentPage(e.data);
  };

  const goToPage = (pageNumber: number) => {
    const targetPage = Math.max(0, Math.min(pageNumber - 1, totalPages - 1));
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().turnToPage(targetPage);
      setCurrentPage(targetPage);
    }
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      goToPage(pageNum);
      setPageInput('');
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and empty string
    if (value === '' || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };

  const downloadCurrentPage = () => {
    const currentPageIndex = currentPage;
    const imageUrl = pages[currentPageIndex];
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = imageUrl;
    
    // Extract filename from URL or create one
    const filename = imageUrl.split('/').pop() || `page-${currentPageIndex + 1}.jpg`;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        // Use a wider modal for the book
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 z-10 text-white hover:text-gray-300 transition"
        >
          <X size={32} />
        </button>

        {/* Flipbook Component */}
        <div className="flex justify-center">
          <HTMLFlipBook
            ref={flipBookRef}
            width={400} // Width of a *single* page
            height={550} // Height of a *single* page
            showCover={true}
            className="shadow-2xl"
            onFlip={handlePageChange}
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

        {/* Navigation Controls */}
        <div className="flex flex-col items-center space-y-4 mt-6">
          {/* Page Input Form and Download Button */}
          <div className="flex items-center space-x-6">
            {/* Page Input Form */}
            <form onSubmit={handlePageInputSubmit} className="flex items-center space-x-2">
              <label htmlFor="pageInput" className="text-white text-sm font-medium">
                Go to page:
              </label>
              <input
                id="pageInput"
                type="text"
                value={pageInput}
                onChange={handlePageInputChange}
                placeholder="Page #"
                className="w-20 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={3}
              />
              <button
                type="submit"
                disabled={!pageInput || parseInt(pageInput) < 1 || parseInt(pageInput) > totalPages}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Go
              </button>
            </form>

            {/* Download Button */}
            <button
              onClick={downloadCurrentPage}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              title={`Download page ${currentPage + 1}`}
            >
              <Download size={16} />
              <span className="text-sm">Download Page</span>
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center space-x-4">
            {/* Previous Button */}
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

            {/* Page Counter */}
            <div className="bg-black/70 text-white px-4 py-2 rounded-lg min-w-[100px] text-center">
              <span className="text-sm font-medium">
                {currentPage + 1} / {totalPages}
              </span>
            </div>

            {/* Next Button */}
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
      </div>
    </div>
  );
};

export default AlbumModal;