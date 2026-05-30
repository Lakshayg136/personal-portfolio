import React from 'react';
import { FaAward, FaUsers, FaGraduationCap, FaCertificate, FaChevronRight } from 'react-icons/fa';

export default function Achievements({ achievementsData, certificationsData }) {
  return (
    <div className="space-y-6 select-text">
      {/* Certifications Vault */}
      <div className="space-y-3.5">
        <div className="flex items-center space-x-2 text-accentSecondary pb-1.5 border-b border-white/5 select-none">
          <FaCertificate className="text-sm" />
          <h3 className="text-xs font-mono font-bold tracking-widest uppercase">
            Professional Certifications
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1.5 custom-scroll">
          {certificationsData.map((cert, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-xl bg-neutral-900/40 border border-white/5 flex items-center justify-between group hover:border-accentSecondary/45 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-950 border border-white/5 flex items-center justify-center text-accentSecondary select-none shrink-0 group-hover:bg-accentSecondary/10 transition-colors">
                  <FaGraduationCap className="text-sm" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-textPrimary leading-snug group-hover:text-accentSecondary transition-colors">
                    {cert.title}
                  </h4>
                  <span className="text-[9px] font-mono text-textMuted uppercase mt-0.5 block">
                    {cert.issuer}
                  </span>
                </div>
              </div>
              <FaChevronRight className="text-[9px] text-textMuted group-hover:text-accentSecondary group-hover:translate-x-1 transition-all select-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Split Block: Leadership & Competitions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Leadership */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-accentPrimary pb-1 border-b border-white/5 select-none">
            <FaUsers className="text-sm" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Leadership Roles</h3>
          </div>
          <div className="space-y-3">
            {achievementsData.leadership.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-neutral-900/30 border border-white/5">
                <h4 className="text-xs sm:text-sm font-bold text-textPrimary leading-tight">
                  {item.role}
                </h4>
                <span className="text-[10px] font-mono text-accentSecondary block mt-0.5">
                  {item.organization}
                </span>
                <p className="text-xs text-textSecondary mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Competitions */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-accentSecondary pb-1 border-b border-white/5 select-none">
            <FaAward className="text-sm" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Competitions</h3>
          </div>
          <div className="space-y-3">
            {achievementsData.competitions.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-neutral-900/30 border border-white/5">
                <h4 className="text-xs sm:text-sm font-bold text-textPrimary leading-tight">
                  {item.title}
                </h4>
                <span className="text-[10px] font-mono text-textMuted block mt-0.5">
                  {item.organization}
                </span>
                <p className="text-xs text-textSecondary mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
