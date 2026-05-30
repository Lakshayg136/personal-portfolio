import React from 'react';
import { FaCertificate, FaGraduationCap, FaChevronRight } from 'react-icons/fa';
import { certifications } from '../data/portfolioData';

export default function Certifications() {
  return (
    <div className="space-y-5 select-text">
      <div className="flex items-center space-x-2 text-accentSecondary pb-1.5 border-b border-white/5 select-none">
        <FaCertificate className="text-sm" />
        <h3 className="text-xs font-mono font-bold tracking-widest uppercase">
          Course Credentials
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1.5 custom-scroll">
        {certifications.map((cert, idx) => (
          <div 
            key={idx}
            className="p-4 rounded-xl bg-neutral-900/40 border border-white/5 flex items-center justify-between group hover:border-accentSecondary/45 hover:shadow-glow transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-white/5 flex items-center justify-center text-accentSecondary select-none shrink-0 group-hover:bg-accentSecondary/10 transition-colors">
                <FaGraduationCap className="text-base" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-textPrimary leading-snug group-hover:text-accentSecondary transition-colors">
                  {cert.title}
                </h4>
                <span className="text-[9px] font-mono text-textMuted uppercase mt-0.5 block">
                  {cert.issuer}
                </span>
              </div>
            </div>
            <FaChevronRight className="text-[10px] text-textMuted group-hover:text-accentSecondary group-hover:translate-x-1 transition-all select-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
