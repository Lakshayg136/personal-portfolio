import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer({ personalInfo }) {
  return (
    <footer className="w-full bg-[#07070a] border-t border-borderSubtle py-12 pb-32 select-none">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center space-y-4">
        
        {/* Horizontal thin top accent line */}
        <div className="h-[1px] w-24 bg-accent-gradient mb-2" />

        <p className="text-sm font-display font-medium text-textPrimary">
          Designed &amp; Built by <span className="text-gradient font-bold">{personalInfo.name}</span>
        </p>

        {/* Social Icons row */}
        <div className="flex gap-6 text-lg text-textSecondary">
          <a 
            href={personalInfo.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-accentPrimary transition-colors duration-200"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a 
            href={personalInfo.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-accentPrimary transition-colors duration-200"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a 
            href={`mailto:${personalInfo.email}`} 
            className="hover:text-accentPrimary transition-colors duration-200"
            title="Email"
          >
            <FaEnvelope />
          </a>
        </div>

        <p className="text-[10px] font-mono text-textMuted tracking-wider uppercase">
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
