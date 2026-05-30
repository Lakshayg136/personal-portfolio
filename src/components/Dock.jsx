import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaCode, 
  FaTerminal, 
  FaBriefcase, 
  FaFolderOpen, 
  FaGithub, 
  FaLinkedin,
  FaTrashAlt,
  FaEnvelope
} from 'react-icons/fa';

export default function Dock({ activeWindow, windows, onToggleWindow }) {
  const dockItems = [
    { id: 'about', label: 'About Me', icon: FaUser, type: 'app' },
    { id: 'projects', label: 'Projects', icon: FaCode, type: 'app' },
    { id: 'experience', label: 'Experience', icon: FaBriefcase, type: 'app' },
    { id: 'skills', label: 'Skills', icon: FaFolderOpen, type: 'app' },
    { id: 'contact', label: 'Mail Box', icon: FaEnvelope, type: 'app' },
    { 
      id: 'linkedin', 
      label: 'LinkedIn', 
      icon: FaLinkedin, 
      type: 'external', 
      url: 'https://www.linkedin.com/in/lakshaygupta2121/' 
    },
    { 
      id: 'github', 
      label: 'GitHub', 
      icon: FaGithub, 
      type: 'external', 
      url: 'https://github.com/Lakshayg136' 
    },
    { id: 'separator', type: 'separator' },
    { id: 'terminal', label: 'Terminal', icon: FaTerminal, type: 'app' },
    { id: 'trash', label: 'Trash Can', icon: FaTrashAlt, type: 'app' }
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-2 sm:px-6 py-2.5 rounded-3xl bg-neutral-950/60 backdrop-blur-xl border border-white/10 flex items-end space-x-2.5 sm:space-x-4 shadow-2xl max-w-[95vw] overflow-x-auto sm:overflow-x-visible select-none">
      {dockItems.map((item) => {
        if (item.type === 'separator') {
          return (
            <div 
              key="dock-separator" 
              className="w-[1.5px] h-9 bg-white/20 self-center mx-1.5 shrink-0" 
            />
          );
        }

        const Icon = item.icon;
        const isAppOpen = item.type === 'app' && windows[item.id]?.isOpen;
        const isActive = activeWindow === item.id && isAppOpen;

        return (
          <div key={item.id} className="relative group flex flex-col items-center">
            {/* Tooltip */}
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-150 px-2.5 py-1 text-[10px] font-mono tracking-wider rounded-md bg-neutral-950/90 text-textPrimary border border-white/10 whitespace-nowrap shadow-md pointer-events-none z-50">
              {item.label}
            </span>

            {/* App Icon Circle */}
            <motion.button
              onClick={() => {
                if (item.type === 'app') {
                  onToggleWindow(item.id);
                } else {
                  window.open(item.url, '_blank', 'noopener,noreferrer');
                }
              }}
              whileHover={{ 
                scale: 1.25,
                y: -10,
                transition: { type: 'spring', stiffness: 350, damping: 15 }
              }}
              className={`p-3 rounded-2xl flex items-center justify-center transition-all duration-300 relative ${
                isActive 
                  ? 'bg-accentPrimary text-white shadow-glow' 
                  : 'bg-neutral-900/80 text-textSecondary hover:text-textPrimary hover:bg-neutral-800/80'
              }`}
            >
              <Icon className="text-lg sm:text-xl" />
            </motion.button>

            {/* Glowing Active Indicator Dot */}
            {item.type === 'app' && isAppOpen && (
              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 transition-all duration-300 ${
                isActive 
                  ? 'bg-accentSecondary opacity-100 scale-100' 
                  : 'bg-white/40 opacity-70 scale-100'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
