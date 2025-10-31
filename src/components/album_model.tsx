import React, { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface AlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FlipBookRef = {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    turnToPage: (page: number) => void;
  };
};

interface FlipEvent {
  data: number;
}

const AlbumModal: React.FC<AlbumModalProps> = ({ isOpen, onClose }) => {
  const flipBookRef = useRef<FlipBookRef | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageInput, setPageInput] = useState<string>('');

  if (!isOpen) return null;

  // Use only your attached image files for pages
  const pages: string[] = [
    
    // '/Image/1.jpg',
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 z-10 text-white hover:text-gray-300 transition"
        >
          <X size={32} />
        </button>

        <div className="flex justify-center">
          <HTMLFlipBook
            ref={flipBookRef}
            width={445}
            height={300}
            showCover={true}
            className="shadow-2xl"
            onFlip={handlePageChange}
            flippingTime={1000}
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
      </div>
    </div>
  );
};

export default AlbumModal;
