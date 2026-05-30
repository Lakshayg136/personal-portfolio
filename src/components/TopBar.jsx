import React, { useState, useEffect } from 'react';
import { FaApple, FaWifi } from 'react-icons/fa';
import { IoIosBatteryFull } from 'react-icons/io';
import emailjs from '@emailjs/browser';

export default function TopBar({ 
  activeWindow, 
  windows, 
  onToggleWindow, 
  onCloseAll, 
  onZoomActive, 
  onForceQuit,
  onShowToast 
}) {
  const [time, setTime] = useState(new Date());
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionName, setSuggestionName] = useState('');
  const [suggestionEmail, setSuggestionEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Maps active window IDs to realistic macOS application names
  const getAppTitle = (winId) => {
    const map = {
      about: 'Finder',
      projects: 'Xcode',
      skills: 'System Settings',
      experience: 'Time Machine',
      certificates: 'Keychain',
      cocurriculum: 'Keychain',
      terminal: 'Terminal',
      contact: 'Mail',
      trash: 'Trash'
    };
    return map[winId] || 'Finder';
  };

  const handleMenuClick = (menuId) => {
    setActiveDropdown(activeDropdown === menuId ? null : menuId);
  };

  const handleMenuHover = (menuId) => {
    if (activeDropdown !== null) {
      setActiveDropdown(menuId);
    }
  };

  const handleAppLaunch = (appId) => {
    onToggleWindow(appId);
    setActiveDropdown(null);
  };

  const handleLinkLaunch = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setActiveDropdown(null);
  };

  const handleCloseAllAction = () => {
    onCloseAll();
    setActiveDropdown(null);
  };

  const handleZoomAction = () => {
    onZoomActive();
    setActiveDropdown(null);
  };

  const handleForceQuitAction = (winId) => {
    onForceQuit(winId);
    setActiveDropdown(null);
  };

  const handleSuggestionSubmit = (e) => {
    e.preventDefault();
    if (!suggestionName.trim() || !suggestionEmail.trim() || !suggestion.trim()) {
      onShowToast(`All fields are required.`);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(suggestionEmail)) {
      onShowToast(`Please provide a valid email.`);
      return;
    }

    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn("Simulating Suggestion Box EmailJS delivery in local/default environment.");
      setTimeout(() => {
        setLoading(false);
        onShowToast(`Suggestion received from ${suggestionName}! Thank you! 🚀`);
        setSuggestionName('');
        setSuggestionEmail('');
        setSuggestion('');
        setShowSuggestion(false);
      }, 1200);
      return;
    }

    const templateParams = {
      from_name: suggestionName,
      from_email: suggestionEmail,
      subject: `OS Suggestion from ${suggestionName}`,
      message: suggestion,
      to_name: "Lakshay Gupta",
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setLoading(false);
        onShowToast(`Suggestion sent successfully! Thank you, ${suggestionName}! 🚀`);
        setSuggestionName('');
        setSuggestionEmail('');
        setSuggestion('');
        setShowSuggestion(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        onShowToast(`Failed to send suggestion via mail. Please try another method.`);
      });
  };

  return (
    <>
      {/* Click Outside Dropdown Closer Backdrop */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40 bg-transparent pointer-events-auto"
          onClick={() => setActiveDropdown(null)}
        />
      )}

      <header className="fixed top-0 left-0 right-0 h-10 glass-nav text-xs text-textPrimary px-4 flex items-center justify-between z-50 select-none pointer-events-auto">
        {/* Left Menu Items */}
        <div className="flex items-center space-x-4">
          <FaApple 
            className="w-4.5 h-4.5 text-white hover:text-accentPrimary transition-all hover:scale-110 active:scale-95 duration-200 cursor-pointer select-none"
            onClick={() => handleMenuClick('apple')}
            role="img"
            aria-label="Apple Logo"
          />
          <span className="font-bold text-white cursor-pointer text-xs select-none mr-2 tracking-wide font-sans">
            {getAppTitle(activeWindow)}
          </span>

          <div className="flex space-x-4 text-textSecondary relative">
            {/* File Menu */}
            <div className="relative">
              <span 
                onClick={() => handleMenuClick('file')}
                onMouseEnter={() => handleMenuHover('file')}
                className={`cursor-pointer hover:text-textPrimary py-1 px-2 rounded transition-colors ${
                  activeDropdown === 'file' ? 'bg-white/10 text-textPrimary' : ''
                }`}
              >
                File
              </span>
              {activeDropdown === 'file' && (
                <div className="absolute top-7 left-0 w-44 bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-1.5 flex flex-col space-y-0.5 text-textSecondary font-sans font-medium text-[11px] z-50">
                  <span className="px-3 py-1.5 text-[9px] font-mono text-textMuted uppercase tracking-wider">Launch Applications</span>
                  <button onClick={() => handleAppLaunch('about')} className="px-3 py-1.5 text-left rounded hover:bg-accentPrimary hover:text-white transition-colors">
                    <span>About Me.app</span>
                  </button>
                  <button onClick={() => handleAppLaunch('projects')} className="px-3 py-1.5 text-left rounded hover:bg-accentPrimary hover:text-white transition-colors">
                    <span>Projects.app</span>
                  </button>
                  <button onClick={() => handleAppLaunch('experience')} className="px-3 py-1.5 text-left rounded hover:bg-accentPrimary hover:text-white transition-colors">
                    <span>Experience.app</span>
                  </button>
                  <button onClick={() => handleAppLaunch('skills')} className="px-3 py-1.5 text-left rounded hover:bg-accentPrimary hover:text-white transition-colors">
                    <span>Skills.app</span>
                  </button>
                  <button onClick={() => handleAppLaunch('certificates')} className="px-3 py-1.5 text-left rounded hover:bg-accentPrimary hover:text-white transition-colors">
                    <span>Certifications.app</span>
                  </button>
                  <button onClick={() => handleAppLaunch('cocurriculum')} className="px-3 py-1.5 text-left rounded hover:bg-accentPrimary hover:text-white transition-colors">
                    <span>Co-Curriculum.app</span>
                  </button>
                  <button onClick={() => handleAppLaunch('terminal')} className="px-3 py-1.5 text-left rounded hover:bg-accentPrimary hover:text-white transition-colors">
                    <span>Terminal.app</span>
                  </button>
                  <button onClick={() => handleAppLaunch('trash')} className="px-3 py-1.5 text-left rounded hover:bg-accentPrimary hover:text-white transition-colors">
                    <span>Trash Can.app</span>
                  </button>
                </div>
              )}
            </div>

            {/* View Menu */}
            <div className="relative">
              <span 
                onClick={() => handleMenuClick('view')}
                onMouseEnter={() => handleMenuHover('view')}
                className={`cursor-pointer hover:text-textPrimary py-1 px-2 rounded transition-colors ${
                  activeDropdown === 'view' ? 'bg-white/10 text-textPrimary' : ''
                }`}
              >
                View
              </span>
              {activeDropdown === 'view' && (
                <div className="absolute top-7 left-0 w-64 bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-2 flex flex-col space-y-1 text-textSecondary font-sans font-medium text-[11px] z-50">
                  <span className="px-3 py-1 text-[9px] font-mono text-textMuted uppercase tracking-wider">Personal Information</span>
                  <div className="px-3 py-1 text-left text-textPrimary font-semibold flex flex-col">
                    <span>Lakshay Gupta</span>
                    <span className="text-[10px] text-textMuted font-mono">lakshayg136@gmail.com</span>
                    <span className="text-[10px] text-textMuted font-mono">+91 8373968303</span>
                    <span className="text-[10px] text-textMuted font-mono">Gurugram / Chandigarh, India</span>
                  </div>
                  <div className="h-[1px] bg-white/5 my-1" />
                  <span className="px-3 py-1 text-[9px] font-mono text-textMuted uppercase tracking-wider">Contact Gateway</span>
                  <button onClick={() => handleAppLaunch('contact')} className="px-3 py-1.5 text-left rounded hover:bg-accentPrimary hover:text-white transition-colors flex justify-between">
                    <span>Open Mail Application</span>
                    <span className="text-accentSecondary text-[10px]">Active</span>
                  </button>
                </div>
              )}
            </div>

            {/* Go Menu */}
            <div className="relative">
              <span 
                onClick={() => handleMenuClick('go')}
                onMouseEnter={() => handleMenuHover('go')}
                className={`cursor-pointer hover:text-textPrimary py-1 px-2 rounded transition-colors ${
                  activeDropdown === 'go' ? 'bg-white/10 text-textPrimary' : ''
                }`}
              >
                Go
              </span>
              {activeDropdown === 'go' && (
                <div className="absolute top-7 left-0 w-48 bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-1.5 flex flex-col space-y-0.5 text-textSecondary font-sans font-medium text-[11px] z-50">
                  <span className="px-3 py-1.5 text-[9px] font-mono text-textMuted uppercase tracking-wider">Hyperlinks</span>
                  <button onClick={() => handleLinkLaunch('/resume.pdf')} className="px-3 py-1.5 text-left rounded hover:bg-accentPrimary hover:text-white transition-colors flex justify-between">
                    <span>Download CV</span>
                    <span className="text-[10px]">PDF ↗</span>
                  </button>
                  <button onClick={() => handleLinkLaunch('https://www.linkedin.com/in/lakshaygupta2121/')} className="px-3 py-1.5 text-left rounded hover:bg-accentPrimary hover:text-white transition-colors flex justify-between">
                    <span>LinkedIn Profile</span>
                    <span className="text-[10px]">Web ↗</span>
                  </button>
                  <button onClick={() => handleLinkLaunch('https://github.com/Lakshayg136')} className="px-3 py-1.5 text-left rounded hover:bg-accentPrimary hover:text-white transition-colors flex justify-between">
                    <span>GitHub Code</span>
                    <span className="text-[10px]">Web ↗</span>
                  </button>
                </div>
              )}
            </div>

            {/* Window Menu */}
            <div className="relative">
              <span 
                onClick={() => handleMenuClick('window')}
                onMouseEnter={() => handleMenuHover('window')}
                className={`cursor-pointer hover:text-textPrimary py-1 px-2 rounded transition-colors ${
                  activeDropdown === 'window' ? 'bg-white/10 text-textPrimary' : ''
                }`}
              >
                Window
              </span>
              {activeDropdown === 'window' && (
                <div className="absolute top-7 left-0 w-52 bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-1.5 flex flex-col space-y-0.5 text-textSecondary font-sans font-medium text-[11px] z-50">
                  <button onClick={handleCloseAllAction} className="px-3 py-1.5 text-left rounded hover:bg-accentPrimary hover:text-white transition-colors">
                    Close All Windows
                  </button>
                  <button onClick={handleZoomAction} className="px-3 py-1.5 text-left rounded hover:bg-accentPrimary hover:text-white transition-colors">
                    Zoom Active Window
                  </button>
                  <div className="h-[1px] bg-white/5 my-1" />
                  <span className="px-3 py-1 text-[9px] font-mono text-textMuted uppercase tracking-wider">Force Quit Specific</span>
                  {Object.keys(windows).map((winKey) => {
                    const isOpen = windows[winKey].isOpen;
                    if (!isOpen) return null;
                    return (
                      <button 
                        key={winKey}
                        onClick={() => handleForceQuitAction(winKey)}
                        className="px-3 py-1 rounded hover:bg-rose-600 hover:text-white transition-colors text-left flex justify-between items-center text-xs"
                      >
                        <span className="capitalize">{winKey}</span>
                        <span className="text-[9px] font-mono text-rose-400">Kill</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Help Menu */}
            <div className="relative">
              <span 
                onClick={() => handleMenuClick('help')}
                onMouseEnter={() => handleMenuHover('help')}
                className={`cursor-pointer hover:text-textPrimary py-1 px-2 rounded transition-colors ${
                  activeDropdown === 'help' ? 'bg-white/10 text-textPrimary' : ''
                }`}
              >
                Help
              </span>
              {activeDropdown === 'help' && (
                <div className="absolute top-7 left-0 w-48 bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-2 flex flex-col space-y-2 text-textSecondary font-sans font-medium text-[11px] z-50">
                  <button 
                    onClick={() => {
                      setShowSuggestion(true);
                      setActiveDropdown(null);
                    }} 
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-accentPrimary hover:text-white transition-colors flex justify-between"
                  >
                    <span>Suggestion Box</span>
                    <span className="text-[10px]">⚙️</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Menu Icons & Time */}
        <div className="flex items-center space-x-4 text-textSecondary">
          <FaWifi className="text-sm cursor-pointer hover:text-textPrimary transition-colors" />
          <div className="flex items-center space-x-1 cursor-pointer">
            <span className="text-[10px]">100%</span>
            <IoIosBatteryFull className="text-base text-emerald-400" />
          </div>
          <span className="hover:text-textPrimary cursor-pointer transition-colors font-medium">
            {formatDate(time)}
          </span>
          <span className="hover:text-textPrimary cursor-pointer transition-colors font-medium font-mono">
            {formatTime(time)}
          </span>
        </div>
      </header>

      {/* Suggestion Box Pop-up Modal Form */}
      {showSuggestion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center pointer-events-auto">
          <div className="bg-neutral-900 border border-white/10 w-96 rounded-2xl overflow-hidden shadow-2xl font-sans">
            <div className="h-11 bg-neutral-950 px-4 flex items-center justify-between border-b border-white/10 select-none">
              <span className="text-xs font-bold text-textPrimary">Suggestion Box</span>
              <button 
                onClick={() => {
                  setShowSuggestion(false);
                  setSuggestionName('');
                  setSuggestionEmail('');
                  setSuggestion('');
                }}
                className="text-textSecondary hover:text-textPrimary text-sm font-bold transition-colors"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSuggestionSubmit} className="p-5 space-y-4">
              <p className="text-xs text-textSecondary leading-relaxed">
                Submit your suggestions directly to Lakshay's mailbox to help optimize Lakshay-OS.
              </p>
              
              <div className="space-y-3">
                <input
                  type="text"
                  value={suggestionName}
                  onChange={(e) => setSuggestionName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-950 border border-white/5 text-textPrimary text-xs focus:outline-none focus:border-accentPrimary focus:shadow-glow transition-all"
                  required
                  disabled={loading}
                />
                <input
                  type="email"
                  value={suggestionEmail}
                  onChange={(e) => setSuggestionEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-950 border border-white/5 text-textPrimary text-xs focus:outline-none focus:border-accentPrimary focus:shadow-glow transition-all"
                  required
                  disabled={loading}
                />
                <textarea
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="Type your recommendations here..."
                  rows="4"
                  className="w-full p-3 rounded-lg bg-neutral-950 border border-white/5 text-textPrimary text-xs focus:outline-none focus:border-accentPrimary focus:shadow-glow resize-none transition-all"
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex justify-end space-x-2 select-none">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowSuggestion(false);
                    setSuggestionName('');
                    setSuggestionEmail('');
                    setSuggestion('');
                  }}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-textSecondary text-xs font-semibold transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-accent-gradient text-textPrimary text-xs font-semibold hover:shadow-glow-accent transition-all flex items-center justify-center min-w-[70px]"
                >
                  {loading ? (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent border-white animate-spin" />
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
