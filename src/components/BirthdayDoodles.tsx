const BirthdayDoodles = () => {
  // Simple doodle SVGs
  const doodles = [
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>, // balloon
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2v6h12V2"/></svg>, // cake
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>, // star
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => {
        const Doodle = doodles[Math.floor(Math.random() * doodles.length)];
        return (
          <div
            key={`doodle-${i}`}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 95}%`,
              top: `${Math.random() * 95}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDuration: `${Math.random() * 4 + 3}s`,
            }}
          >
            {Doodle}
          </div>
        );
      })}
    </div>
  );
};
