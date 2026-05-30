import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

export default function Experience({ experienceData }) {
  return (
    <div className="space-y-5 select-text">
      <div className="flex items-center space-x-2 text-accentSecondary pb-1.5 border-b border-white/5 select-none">
        <FaBriefcase className="text-sm" />
        <h3 className="text-xs font-mono font-bold tracking-widest uppercase">
          Work History
        </h3>
      </div>

      <div className="space-y-4">
        {experienceData.map((exp, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-neutral-900/40 border border-white/5 hover:border-accentPrimary/40 hover:shadow-glow transition-all duration-300 relative group"
          >
            {/* Pulsing indicator for active role */}
            {exp.current && (
              <span className="absolute top-4 right-4 flex h-3.5 w-3.5 select-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-statusGreen opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-statusGreen"></span>
              </span>
            )}

            <h4 className="text-base font-bold text-textPrimary group-hover:text-accentPrimary transition-colors">
              {exp.role}
            </h4>
            <span className="text-sm font-semibold text-accentSecondary mt-0.5 block">
              {exp.company}
            </span>

            {/* Dates & Location */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-textMuted mt-2.5 font-mono select-none">
              <span className="flex items-center space-x-1">
                <FaCalendarAlt />
                <span>{exp.duration}</span>
              </span>
              <span className="flex items-center space-x-1">
                <FaMapMarkerAlt />
                <span>{exp.location}</span>
              </span>
            </div>

            {/* Bullets */}
            <ul className="mt-4 space-y-2 text-xs sm:text-sm text-textSecondary leading-relaxed list-disc list-inside">
              {exp.points.map((pt, pIdx) => (
                <li key={pIdx} className="leading-relaxed">
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
