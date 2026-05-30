import React, { useState } from 'react';
import { 
  FaUser, FaCode, FaTerminal, FaAward, FaBriefcase, 
  FaFolderOpen, FaEnvelope, FaGithub, FaLinkedin
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Centralized Data Import
import { 
  personalInfo, 
  skills, 
  experience, 
  projects, 
  achievements, 
  certifications 
} from './data/portfolioData';

// Component Imports
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import Window from './components/Window';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import CoCurriculum from './components/CoCurriculum';
import Contact from './components/Contact';
import TerminalWindow from './components/TerminalWindow';
import TrashCan from './components/TrashCan';
import GameCenter from './components/GameCenter';

export default function App() {
  // Window states: isOpen, isMinimized, isMaximized
  const [windows, setWindows] = useState({
    about: { isOpen: false, isMinimized: false, isMaximized: false },
    skills: { isOpen: false, isMinimized: false, isMaximized: false },
    projects: { isOpen: false, isMinimized: false, isMaximized: false },
    experience: { isOpen: false, isMinimized: false, isMaximized: false },
    certificates: { isOpen: false, isMinimized: false, isMaximized: false },
    cocurriculum: { isOpen: false, isMinimized: false, isMaximized: false },
    terminal: { isOpen: false, isMinimized: false, isMaximized: false },
    contact: { isOpen: false, isMinimized: false, isMaximized: false },
    trash: { isOpen: false, isMinimized: false, isMaximized: false },
    gamecenter: { isOpen: false, isMinimized: false, isMaximized: true }
  });

  // Layering focus (Z-Index map)
  const [zIndices, setZIndices] = useState({
    about: 5,
    skills: 5,
    projects: 5,
    experience: 5,
    certificates: 5,
    cocurriculum: 5,
    terminal: 5,
    contact: 5,
    trash: 5,
    gamecenter: 5
  });

  const [activeWindow, setActiveWindow] = useState('about');
  const [activeGame, setActiveGame] = useState('tictactoe');

  // Static Dark Theme
  const theme = 'dark';

  // Recycle Bin / system alerts toast state
  const [toast, setToast] = useState({ 
    show: false, 
    message: '', 
    title: 'System Notification', 
    type: 'default' 
  });
  
  const showToast = (message, title = 'System Notification', type = 'default') => {
    let resolvedType = type;
    let resolvedTitle = title;
    
    // Auto-detect trash deletion triggers for specialized styling
    if (message.includes('permanently deleted')) {
      resolvedType = 'trash';
      resolvedTitle = 'Trash Bin Cleanup';
    }
    
    setToast({ 
      show: true, 
      message, 
      title: resolvedTitle, 
      type: resolvedType 
    });
    
    setTimeout(() => {
      setToast({ 
        show: false, 
        message: '', 
        title: 'System Notification', 
        type: 'default' 
      });
    }, 6000);
  };

  // Handle focusing/raising window layer
  const handleFocusWindow = (winId) => {
    setActiveWindow(winId);
    setZIndices((prev) => {
      const maxZ = Math.max(...Object.values(prev));
      return {
        ...prev,
        [winId]: maxZ + 1
      };
    });
  };

  // Handle launching/toggling a window
  const handleToggleWindow = (winId) => {
    setWindows((prev) => {
      const isAlreadyOpen = prev[winId].isOpen;
      const isCurrentlyMinimized = prev[winId].isMinimized;

      if (!isAlreadyOpen) {
        // Open the window
        return {
          ...prev,
          [winId]: { ...prev[winId], isOpen: true, isMinimized: false }
        };
      } else if (isCurrentlyMinimized) {
        // De-minimize it
        return {
          ...prev,
          [winId]: { ...prev[winId], isMinimized: false }
        };
      } else if (activeWindow === winId) {
        // Minimize if already active and clicked
        return {
          ...prev,
          [winId]: { ...prev[winId], isMinimized: true }
        };
      }
      return prev;
    });

    handleFocusWindow(winId);
  };

  const handleCloseWindow = (winId) => {
    setWindows((prev) => ({
      ...prev,
      [winId]: { ...prev[winId], isOpen: false }
    }));
  };

  const handleMinimizeWindow = (winId) => {
    setWindows((prev) => ({
      ...prev,
      [winId]: { ...prev[winId], isMinimized: true }
    }));
  };

  const handleToggleMaximize = (winId) => {
    setWindows((prev) => ({
      ...prev,
      [winId]: { ...prev[winId], isMaximized: !prev[winId].isMaximized }
    }));
  };

  // Shortcuts list to render in macOS columns in exact custom layout
  const desktopGrid = [
    // Row 1: About Me | Projects
    [
      { id: 'about', label: 'About Me', icon: FaUser, type: 'app', bgClass: 'bg-pink-500' },
      { id: 'projects', label: 'Projects', icon: FaCode, type: 'app', bgClass: 'bg-violet-600' }
    ],
    // Row 2: Experience | Skills
    [
      { id: 'experience', label: 'Experience', icon: FaBriefcase, type: 'app', bgClass: 'bg-emerald-500' },
      { id: 'skills', label: 'Skills', icon: FaFolderOpen, type: 'app', bgClass: 'bg-sky-500' }
    ],
    // Row 3: Certifications | Co-Curriculum
    [
      { id: 'certificates', label: 'Certifications', icon: FaAward, type: 'app', bgClass: 'bg-yellow-500' },
      { id: 'cocurriculum', label: 'Co-Curriculum', icon: FaAward, type: 'app', bgClass: 'bg-teal-600' }
    ],
    // Row 4: LinkedIn | GitHub
    [
      { id: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, type: 'external', bgClass: 'bg-blue-600', url: 'https://www.linkedin.com/in/lakshaygupta2121/' },
      { id: 'github', label: 'GitHub', icon: FaGithub, type: 'external', bgClass: 'bg-neutral-800', url: 'https://github.com/Lakshayg136' }
    ]
  ];

  const handleShortcutClick = (item) => {
    if (item.type === 'app') {
      handleToggleWindow(item.id);
    } else {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCloseAll = () => {
    setWindows((prev) => {
      const closed = {};
      Object.keys(prev).forEach((winKey) => {
        closed[winKey] = { ...prev[winKey], isOpen: false };
      });
      return closed;
    });
  };

  const handleForceQuit = (winId) => {
    handleCloseWindow(winId);
    showToast(`Application '${winId}' was terminated successfully.`);
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden select-none bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: 'url("/wallpaper.jpg")' }}
    >
      {/* Background Mesh Orbs for Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent pointer-events-none" />

      {/* Top macOS Menu Bar */}
      <TopBar 
        activeWindow={activeWindow} 
        windows={windows} 
        onToggleWindow={handleToggleWindow} 
        onCloseAll={handleCloseAll}
        onZoomActive={() => handleToggleMaximize(activeWindow)}
        onForceQuit={handleForceQuit}
        onShowToast={showToast}
      />

      {/* Desktop Workspace (Holds Shortcuts + Draggable Windows) */}
      <div className="relative w-full h-[calc(100vh-40px)] mt-10 p-6 flex justify-end items-start pointer-events-none">
        
        {/* Absolute Draggable Windows Container */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          
          {/* 1. About Me Window */}
          <Window
            id="about"
            title="About Me — Finder"
            isOpen={windows.about.isOpen}
            isMinimized={windows.about.isMinimized}
            isMaximized={windows.about.isMaximized}
            onToggleMaximize={handleToggleMaximize}
            zIndex={zIndices.about}
            activeWindow={activeWindow}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onFocus={handleFocusWindow}
            defaultX={50}
            defaultY={40}
            defaultWidth={850}
            defaultHeight={550}
          >
            <About personalInfo={personalInfo} />
          </Window>

          {/* 2. Skills Window */}
          <Window
            id="skills"
            title="Skills & Technologies — Finder"
            isOpen={windows.skills.isOpen}
            isMinimized={windows.skills.isMinimized}
            isMaximized={windows.skills.isMaximized}
            onToggleMaximize={handleToggleMaximize}
            zIndex={zIndices.skills}
            activeWindow={activeWindow}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onFocus={handleFocusWindow}
            defaultX={160}
            defaultY={80}
            defaultWidth={800}
            defaultHeight={520}
          >
            <Skills skillsData={skills} />
          </Window>

          {/* 3. Projects Window */}
          <Window
            id="projects"
            title="Projects Catalog — Finder"
            isOpen={windows.projects.isOpen}
            isMinimized={windows.projects.isMinimized}
            isMaximized={windows.projects.isMaximized}
            onToggleMaximize={handleToggleMaximize}
            zIndex={zIndices.projects}
            activeWindow={activeWindow}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onFocus={handleFocusWindow}
            defaultX={200}
            defaultY={110}
            defaultWidth={900}
            defaultHeight={580}
          >
            <Projects projectsData={projects} />
          </Window>

          {/* 4. Experience Window */}
          <Window
            id="experience"
            title="Experience Log — Finder"
            isOpen={windows.experience.isOpen}
            isMinimized={windows.experience.isMinimized}
            isMaximized={windows.experience.isMaximized}
            onToggleMaximize={handleToggleMaximize}
            zIndex={zIndices.experience}
            activeWindow={activeWindow}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onFocus={handleFocusWindow}
            defaultX={240}
            defaultY={140}
            defaultWidth={820}
            defaultHeight={540}
          >
            <Experience experienceData={experience} />
          </Window>

          {/* 5. Certificates Window */}
          <Window
            id="certificates"
            title="Certifications — Finder"
            isOpen={windows.certificates.isOpen}
            isMinimized={windows.certificates.isMinimized}
            isMaximized={windows.certificates.isMaximized}
            onToggleMaximize={handleToggleMaximize}
            zIndex={zIndices.certificates}
            activeWindow={activeWindow}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onFocus={handleFocusWindow}
            defaultX={280}
            defaultY={170}
            defaultWidth={780}
            defaultHeight={520}
          >
            <Certifications />
          </Window>

          {/* 5b. Co-Curriculum Window */}
          <Window
            id="cocurriculum"
            title="Co-Curriculum — Finder"
            isOpen={windows.cocurriculum.isOpen}
            isMinimized={windows.cocurriculum.isMinimized}
            isMaximized={windows.cocurriculum.isMaximized}
            onToggleMaximize={handleToggleMaximize}
            zIndex={zIndices.cocurriculum}
            activeWindow={activeWindow}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onFocus={handleFocusWindow}
            defaultX={320}
            defaultY={200}
            defaultWidth={780}
            defaultHeight={520}
          >
            <CoCurriculum />
          </Window>

          {/* 6. Mock Interactive Terminal */}
          <Window
            id="terminal"
            title="zsh — Terminal Simulation"
            isOpen={windows.terminal.isOpen}
            isMinimized={windows.terminal.isMinimized}
            isMaximized={windows.terminal.isMaximized}
            onToggleMaximize={handleToggleMaximize}
            zIndex={zIndices.terminal}
            activeWindow={activeWindow}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onFocus={handleFocusWindow}
            defaultX={100}
            defaultY={90}
            defaultWidth={800}
            defaultHeight={500}
          >
            <TerminalWindow 
              personalInfo={personalInfo}
              skills={skills}
              projects={projects}
              experience={experience}
              certifications={certifications}
              achievements={achievements}
              onLaunchGame={(game) => {
                setActiveGame(game);
                setWindows((prev) => ({
                  ...prev,
                  gamecenter: { ...prev.gamecenter, isOpen: true, isMinimized: false, isMaximized: true }
                }));
                handleFocusWindow('gamecenter');
              }}
              onOpenWindow={(winId) => {
                setWindows((prev) => ({
                  ...prev,
                  [winId]: { ...prev[winId], isOpen: true, isMinimized: false }
                }));
                handleFocusWindow(winId);
              }}
            />
          </Window>

          {/* 7. Contact Window */}
          <Window
            id="contact"
            title="Mail — Let's Connect"
            isOpen={windows.contact.isOpen}
            isMinimized={windows.contact.isMinimized}
            isMaximized={windows.contact.isMaximized}
            onToggleMaximize={handleToggleMaximize}
            zIndex={zIndices.contact}
            activeWindow={activeWindow}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onFocus={handleFocusWindow}
            defaultX={180}
            defaultY={120}
            defaultWidth={740}
            defaultHeight={520}
          >
            <Contact personalInfo={personalInfo} />
          </Window>

          {/* 8. Recycle Bin Window */}
          <Window
            id="trash"
            title="Trash Can — Finder"
            isOpen={windows.trash.isOpen}
            isMinimized={windows.trash.isMinimized}
            isMaximized={windows.trash.isMaximized}
            onToggleMaximize={handleToggleMaximize}
            zIndex={zIndices.trash}
            activeWindow={activeWindow}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onFocus={handleFocusWindow}
            defaultX={220}
            defaultY={150}
            defaultWidth={700}
            defaultHeight={480}
          >
            <TrashCan onShowToast={showToast} />
          </Window>

          {/* 9. Game Center Window */}
          <Window
            id="gamecenter"
            title="Game Center — Arcade"
            isOpen={windows.gamecenter.isOpen}
            isMinimized={windows.gamecenter.isMinimized}
            isMaximized={windows.gamecenter.isMaximized}
            onToggleMaximize={handleToggleMaximize}
            zIndex={zIndices.gamecenter}
            activeWindow={activeWindow}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onFocus={handleFocusWindow}
            defaultX={140}
            defaultY={100}
            defaultWidth={850}
            defaultHeight={560}
          >
            <GameCenter activeGame={activeGame} setActiveGame={setActiveGame} />
          </Window>

        </div>

        {/* Desktop Shortcuts - Custom Coordinate Grid Layout (Row by Row) */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-6 pointer-events-auto mr-4 select-none">
          {desktopGrid.flat().map((item, idx) => {
            if (!item) return <div key={`empty-${idx}`} className="w-20 h-20" />;
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                onClick={() => handleShortcutClick(item)}
                className="flex flex-col items-center group cursor-pointer w-20"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bgClass} flex items-center justify-center text-textPrimary text-xl shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-200`}>
                  <Icon />
                </div>
                <span className="text-[11px] sm:text-xs font-sans font-semibold text-white text-center mt-2 tracking-wide select-none filter drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* macOS Bottom Dock */}
      <Dock 
        activeWindow={activeWindow} 
        windows={windows}
        onToggleWindow={handleToggleWindow} 
      />

      {/* Sleek Bottom-Right Custom Toast/Notification Popups */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className={`fixed bottom-24 right-6 w-80 rounded-2xl border shadow-2xl p-4 z-[100] font-sans pointer-events-auto select-none backdrop-blur-xl ${
              toast.type === 'trash'
                ? 'bg-rose-950/85 border-rose-500/30 text-rose-100 shadow-rose-950/20'
                : toast.type === 'about'
                ? 'bg-neutral-900/90 border-accentPrimary/35 text-white shadow-accentPrimary/5'
                : 'bg-neutral-900/90 border-white/15 text-white'
            }`}
          >
            {/* Header info */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-textSecondary">
                {toast.type === 'trash' && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />}
                {toast.type === 'about' && <span className="w-1.5 h-1.5 rounded-full bg-accentSecondary animate-pulse" />}
                {toast.type === 'default' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                <span>{toast.title}</span>
              </div>
              <button 
                onClick={() => setToast((prev) => ({ ...prev, show: false }))}
                className="text-[10px] text-textMuted hover:text-white transition-colors px-1"
              >
                ✕
              </button>
            </div>

            {/* Notification Body */}
            {toast.type === 'about' ? (
              <div className="space-y-1.5 text-xs">
                <div className="font-bold text-sm text-gradient">Made by Lakshay Gupta</div>
                <div className="text-[11px] leading-relaxed text-textSecondary font-medium">
                  {toast.message}
                </div>
                <div className="text-[10px] text-textMuted font-mono bg-white/5 p-1.5 rounded border border-white/5 mt-1">
                  System: macOS Portfolio Simulation v1.0
                </div>
              </div>
            ) : (
              <div className="text-xs leading-relaxed text-textSecondary font-medium">
                {toast.message}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
