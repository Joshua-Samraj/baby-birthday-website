import React from 'react';
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import EnvelopeInvitation from './components/EnvelopeInvitation';

function App() {
  const [showInvitation, setShowInvitation] = useState(false);

  const handleOpenInvitation = () => {
    setShowInvitation(true);
  };

  const handleBackToLanding = () => {
    setShowInvitation(false);
  };

  return (
    <div className="relative">
      {!showInvitation ? (
        <LandingPage onOpenInvitation={handleOpenInvitation} />
      ) : (
        <div>
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
  );
}

export default App;