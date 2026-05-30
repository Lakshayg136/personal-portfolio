import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Window({ 
  id, 
  title, 
  isOpen, 
  isMinimized, 
  isMaximized,
  onToggleMaximize,
  onClose, 
  onMinimize, 
  onFocus, 
  zIndex, 
  activeWindow, 
  defaultX = 80, 
  defaultY = 80, 
  defaultWidth = 680,
  defaultHeight = 480,
  children 
}) {
  const [position, setPosition] = useState({ x: defaultX, y: defaultY });
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const windowRef = useRef(null);
  const wasOpenRef = useRef(false);

  // Responsive mobile checking
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dynamic cascading coordinate positioning triggered on window open transition
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      const centerX = Math.max(40, (window.innerWidth - defaultWidth) / 2);
      const centerY = Math.max(60, (window.innerHeight - defaultHeight) / 2);

      if (!window.__lakshay_cascade_counter) {
        window.__lakshay_cascade_counter = 0;
      }
      const cascadeIndex = window.__lakshay_cascade_counter % 6;
      window.__lakshay_cascade_counter += 1;

      // Cascading offset: 30px offset per cascade level
      const offset = cascadeIndex * 30;
      
      // Calculate balanced, professional centered cascade coordinates
      const finalX = Math.max(20, centerX - 90 + offset);
      const finalY = Math.max(45, centerY - 90 + offset);

      setPosition({ x: finalX, y: finalY });
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, defaultWidth, defaultHeight]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-control') || e.target.closest('.resize-handle') || isMaximized || isMobile) return;
    
    onFocus(id);
    setIsDragging(true);

    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (moveEvent) => {
      const boundaryX = Math.max(10, Math.min(window.innerWidth - 150, moveEvent.clientX - startX));
      const boundaryY = Math.max(5, Math.min(window.innerHeight - 150, moveEvent.clientY - startY));
      setPosition({ x: boundaryX, y: boundaryY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeMouseDown = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    onFocus(id);
    setIsResizing(true);

    const startWidth = size.width;
    const startHeight = size.height;
    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = position.x;
    const startTop = position.y;

    const handleResizeMouseMove = (moveEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      if (direction.includes('e')) {
        newWidth = Math.max(320, startWidth + (moveEvent.clientX - startX));
      }
      if (direction.includes('w')) {
        const deltaX = moveEvent.clientX - startX;
        if (startWidth - deltaX > 320) {
          newWidth = startWidth - deltaX;
          newLeft = startLeft + deltaX;
        }
      }
      if (direction.includes('s')) {
        newHeight = Math.max(240, startHeight + (moveEvent.clientY - startY));
      }
      if (direction.includes('n')) {
        const deltaY = moveEvent.clientY - startY;
        if (startHeight - deltaY > 240) {
          newHeight = startHeight - deltaY;
          newTop = startTop + deltaY;
        }
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newLeft, y: newTop });
    };

    const handleResizeMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleResizeMouseMove);
      document.removeEventListener('mouseup', handleResizeMouseUp);
    };

    document.addEventListener('mousemove', handleResizeMouseMove);
    document.addEventListener('mouseup', handleResizeMouseUp);
  };

  const isWindowActive = activeWindow === id;

  // Animate states for gorgeous native macOS spring transitions (fade, scale, and size/position transition)
  const isInteractive = isDragging || isResizing;
  const transitionConfig = isInteractive
    ? { type: 'just' }
    : { type: 'spring', stiffness: 350, damping: 30, mass: 0.85 };

  const initialDesktop = {
    opacity: 0,
    scale: 0.85,
    y: 40,
    width: `${size.width}px`,
    height: `${size.height}px`,
    top: `${position.y}px`,
    left: `${position.x}px`
  };

  const animateDesktop = {
    width: isMaximized ? 'calc(100% - 48px)' : `${size.width}px`,
    height: isMaximized ? 'calc(100% - 100px)' : `${size.height}px`,
    top: isMaximized ? 12 : position.y,
    left: isMaximized ? 24 : position.x,
    opacity: (isOpen && !isMinimized) ? 1 : 0,
    scale: (isOpen && !isMinimized) ? 1 : 0.85,
    y: (isOpen && !isMinimized) ? 0 : 40,
    pointerEvents: (isOpen && !isMinimized) ? 'auto' : 'none'
  };

  const mobileStyles = {
    position: 'fixed',
    top: '40px',
    left: '0px',
    width: '100vw',
    height: 'calc(100vh - 120px)',
    zIndex: isWindowActive ? 40 : zIndex
  };

  const desktopStyles = {
    position: 'absolute',
    zIndex: zIndex
  };

  return (
    <motion.div
      ref={windowRef}
      onClick={() => onFocus(id)}
      initial={isMobile ? { opacity: 0, y: 50 } : initialDesktop}
      animate={isMobile ? { opacity: (isOpen && !isMinimized) ? 1 : 0, y: (isOpen && !isMinimized) ? 0 : 50, scale: (isOpen && !isMinimized) ? 1 : 0.95, pointerEvents: (isOpen && !isMinimized) ? 'auto' : 'none' } : animateDesktop}
      transition={transitionConfig}
      style={isMobile ? mobileStyles : desktopStyles}
      aria-hidden={!isOpen || isMinimized}
      className={`rounded-2xl border flex flex-col mac-window overflow-hidden transition-shadow duration-300 pointer-events-auto ${
        isWindowActive 
          ? 'shadow-glow border-accentPrimary/40' 
          : 'border-white/10 opacity-90 hover:opacity-100'
      }`}
    >
      {/* Edge & Corner Resizer Drag Handles (Hidden in maximized mode or on mobile) */}
      {!isMaximized && !isMobile && (
        <>
          {/* Borders */}
          <div onMouseDown={(e) => handleResizeMouseDown(e, 'n')} className="resize-handle absolute top-0 left-0 right-0 h-1.5 cursor-n-resize z-50 select-none" />
          <div onMouseDown={(e) => handleResizeMouseDown(e, 's')} className="resize-handle absolute bottom-0 left-0 right-0 h-1.5 cursor-s-resize z-50 select-none" />
          <div onMouseDown={(e) => handleResizeMouseDown(e, 'e')} className="resize-handle absolute top-0 bottom-0 right-0 w-1.5 cursor-e-resize z-50 select-none" />
          <div onMouseDown={(e) => handleResizeMouseDown(e, 'w')} className="resize-handle absolute top-0 bottom-0 left-0 w-1.5 cursor-w-resize z-50 select-none" />
          
          {/* Corners */}
          <div onMouseDown={(e) => handleResizeMouseDown(e, 'nw')} className="resize-handle absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-50 select-none" />
          <div onMouseDown={(e) => handleResizeMouseDown(e, 'ne')} className="resize-handle absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-50 select-none" />
          <div onMouseDown={(e) => handleResizeMouseDown(e, 'sw')} className="resize-handle absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize z-50 select-none" />
          <div onMouseDown={(e) => handleResizeMouseDown(e, 'se')} className="resize-handle absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-50 select-none" />
        </>
      )}

      {/* Title Bar - Drag Handles */}
      <div 
        onMouseDown={handleMouseDown}
        onDoubleClick={() => !isMobile && onToggleMaximize && onToggleMaximize(id)}
        className={`h-11 px-4 flex items-center justify-between border-b select-none cursor-default ${
          isWindowActive 
            ? 'bg-neutral-900/90 border-white/10 text-textPrimary' 
            : 'bg-neutral-950/90 border-white/5 text-textSecondary'
        }`}
      >
        {/* macOS Red/Yellow/Green Window Control Buttons */}
        <div className="flex items-center space-x-2.5">
          <button 
            onClick={() => onClose(id)}
            className="window-control w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 active:bg-rose-700 flex items-center justify-center transition-colors group relative"
            title="Close"
          >
            <span className="absolute opacity-0 group-hover:opacity-100 text-[8px] font-bold text-rose-950">×</span>
          </button>
          
          <button 
            onClick={() => onMinimize(id)}
            className="window-control w-3.5 h-3.5 rounded-full bg-amber-400 hover:bg-amber-500 active:bg-amber-600 flex items-center justify-center transition-colors group relative"
            title="Minimize"
          >
            <span className="absolute opacity-0 group-hover:opacity-100 text-[8px] font-bold text-amber-950">-</span>
          </button>
          
          <button 
            onClick={() => !isMobile && onToggleMaximize && onToggleMaximize(id)}
            disabled={isMobile}
            className="window-control w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 flex items-center justify-center transition-colors group relative disabled:opacity-40"
            title="Maximize"
          >
            <span className="absolute opacity-0 group-hover:opacity-100 text-[7px] font-bold text-emerald-950">⤢</span>
          </button>
        </div>

        {/* Title */}
        <span className="text-xs font-sans tracking-wide font-medium text-textPrimary select-none opacity-90">
          {title}
        </span>

        {/* Action Dot */}
        <div className="w-14 flex justify-end">
          <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            isWindowActive ? 'bg-accentSecondary shadow-glow' : 'bg-transparent'
          }`} />
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 overflow-y-auto bg-neutral-950/70 p-5 sm:p-6 custom-scroll select-text">
        {children}
      </div>
    </motion.div>
  );
}
