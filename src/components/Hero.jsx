import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronDown } from 'react-icons/fa';

export default function Hero({ personalInfo }) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const phrases = personalInfo.titles || [
    "Full-Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Open Source Contributor"
  ];

  useEffect(() => {
    let timer;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Deleting text
      timer = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length - 1));
        setTypingSpeed(40); // Delete faster
      }, typingSpeed);
    } else {
      // Typing text
      timer = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length + 1));
        setTypingSpeed(100); // Standard typing rate
      }, typingSpeed);
    }

    // Word fully typed
    if (!isDeleting && text === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // 2 second pause before deleting
    }

    // Word fully deleted
    if (isDeleting && text === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      setTypingSpeed(150); // Pause before next word
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed]);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen relative flex flex-col justify-center items-center px-4 overflow-hidden pt-10"
    >
      {/* CSS Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Floating Glassmorphic Blurred Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] rounded-full bg-accentPrimary/10 blur-[100px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-accentSecondary/10 blur-[80px] animate-float-slower pointer-events-none" />

      {/* Content Area */}
      <div className="text-center z-10 max-w-4xl flex flex-col items-center">
        {/* Small greeting badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-1.5 rounded-full bg-neutral-900/80 border border-white/5 text-xs text-accentSecondary tracking-wider font-mono mb-6"
        >
          👋 Welcome to my portfolio
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-textPrimary mb-4"
        >
          Hi, I'm <span className="text-gradient font-extrabold">{personalInfo.name}</span>
        </motion.h1>

        {/* Dynamic Typing Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl font-mono text-textSecondary font-semibold mb-6 h-10 flex items-center"
        >
          <span>I'm a&nbsp;</span>
          <span className="text-accentSecondary cursor-blink border-r-2 border-transparent">
            {text}
          </span>
        </motion.h2>

        {/* Summary line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-sm sm:text-base md:text-lg text-textSecondary max-w-2xl mb-10 leading-relaxed font-body"
        >
          B.Tech CSE @ Chandigarh University | Building user-focused digital solutions
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <button
            onClick={handleScrollToProjects}
            className="px-8 py-3.5 rounded-2xl bg-accent-gradient text-textPrimary font-semibold hover:shadow-glow-accent hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            View My Work ↓
          </button>
          
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-2xl bg-neutral-900 border border-white/10 text-textSecondary font-semibold hover:text-textPrimary hover:border-accentPrimary hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center"
          >
            Download Resume
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex gap-6 text-xl text-textSecondary"
        >
          <a 
            href={personalInfo.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-accentPrimary hover:scale-110 transition-all duration-300"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a 
            href={personalInfo.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-accentPrimary hover:scale-110 transition-all duration-300"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a 
            href={`mailto:${personalInfo.email}`} 
            className="hover:text-accentPrimary hover:scale-110 transition-all duration-300"
            title="Email"
          >
            <FaEnvelope />
          </a>
        </motion.div>
      </div>

      {/* Mouse Scroll Down Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center select-none text-textMuted text-xs font-mono tracking-widest uppercase">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="cursor-pointer flex flex-col items-center"
          onClick={handleScrollToProjects}
        >
          <span className="mb-2">Scroll</span>
          <FaChevronDown />
        </motion.div>
      </div>
    </section>
  );
}
