import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight === 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-10 left-0 right-0 h-1 bg-white/5 z-50 overflow-hidden pointer-events-none">
      <div 
        className="h-full bg-accent-gradient"
        style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease-out' }}
      />
    </div>
  );
}
