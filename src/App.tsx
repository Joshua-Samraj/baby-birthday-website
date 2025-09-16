import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import EnvelopeInvitation from './components/EnvelopeInvitation';
import Footer from './components/footer';
import Background_music from './components/Background';
function App() {
  const [showInvitation, setShowInvitation] = useState(false);

  const handleOpenInvitation = () => {
    setShowInvitation(true);
    // Push a new history state so back button works
    window.history.pushState({ page: "invitation" }, "", "");
  };

  const handleBackToLanding = () => {
    setShowInvitation(false);
    // Go back in history
    window.history.back();
  };

  useEffect(() => {
    const handlePopState = () => {
      // When user presses back, close invitation
      setShowInvitation(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Background_music />
      <div className="flex-1">
        {!showInvitation ? (
          <LandingPage onOpenInvitation={handleOpenInvitation} />
        ) : (
          <div className="relative">
            <button
              onClick={handleBackToLanding}
              className="fixed top-4 left-4 z-50 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              ← Back
            </button>
            <EnvelopeInvitation />
          </div>
        )}
      </div>

     <Footer />
    </div>
  );
}

export default App;
