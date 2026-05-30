import React from 'react';
import { 
  FaFilePdf, FaDownload, FaEye, FaGraduationCap, 
  FaGithub, FaLinkedin, FaTools, FaLanguage, FaHeart,
  FaEnvelope, FaPhone, FaMapMarkerAlt
} from 'react-icons/fa';
import { education } from '../data/portfolioData';

export default function About({ personalInfo }) {
  const majorSkills = [
    "Python", "C++", "Java", "JavaScript", 
    "React.js", "Node.js", "Express.js", 
    "MongoDB", "Tailwind CSS", "Figma"
  ];

  const interests = [
    "Car Driving", "Travelling", "Designing", 
    "Photography", "Music & Gaming"
  ];

  const languages = [
    { name: "English", level: "Fluent / Professional" },
    { name: "Hindi", level: "Native / Bilingual" }
  ];

  return (
    <div className="space-y-6 select-text w-full">
      {/* 1. Header: Name & Title */}
      <div className="text-center sm:text-left p-6 rounded-2xl bg-neutral-900/40 border border-white/5 shadow-2xl relative overflow-hidden select-none">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-accent-gradient" />
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5">
          <div className="w-16 h-16 rounded-2xl bg-accent-gradient flex items-center justify-center text-textPrimary font-display font-extrabold text-2xl shrink-0 shadow-glow select-none">
            LG
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-display font-extrabold text-textPrimary tracking-tight">
              {personalInfo.name}
            </h2>
            <p className="text-sm font-semibold text-gradient bg-clip-text text-transparent bg-accent-gradient font-mono tracking-widest uppercase">
              Full-Stack Developer &amp; Designer
            </p>
            
            {/* Contact Details inline like friend's site */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-textSecondary font-mono justify-center sm:justify-start select-text">
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="flex items-center space-x-1.5 hover:text-accentSecondary transition-colors"
              >
                <FaEnvelope className="text-[11px] text-accentSecondary/80" />
                <span>{personalInfo.email}</span>
              </a>
              {personalInfo.phone && (
                <a 
                  href={`tel:${personalInfo.phone}`} 
                  className="flex items-center space-x-1.5 hover:text-accentSecondary transition-colors"
                >
                  <FaPhone className="text-[11px] text-accentSecondary/80" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              {personalInfo.location && (
                <div className="flex items-center space-x-1.5 text-textSecondary">
                  <FaMapMarkerAlt className="text-[11px] text-accentSecondary/80" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Biography & Resume */}
      <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-4">
        <div className="space-y-2">
          <h3 className="text-[10px] font-mono tracking-widest text-accentSecondary uppercase">Biography</h3>
          <p className="text-xs sm:text-sm text-textSecondary leading-relaxed font-body">
            {personalInfo.summary}
          </p>
        </div>

        <div className="h-[1px] bg-white/5 my-3" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-950/40 p-4 rounded-xl border border-white/5">
          <div className="flex items-center space-x-3 select-none">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center shrink-0">
              <FaFilePdf className="text-base" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-textPrimary">Curriculum Vitae</h4>
              <p className="text-[10px] text-textMuted font-mono">Download or preview Lakshay's resume</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto shrink-0 select-none">
            <a
              href={personalInfo.resumeUrl}
              download="resume_Lakshay.pdf"
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-accentPrimary hover:bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
            >
              <FaDownload className="text-[10px]" />
              <span>Download</span>
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-textSecondary hover:text-textPrimary text-xs font-semibold flex items-center justify-center space-x-1.5 border border-white/5 transition-all"
            >
              <FaEye className="text-[10px]" />
              <span>Preview</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Major Skills */}
      <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-3">
        <div className="flex items-center space-x-2 text-accentSecondary pb-1.5 border-b border-white/5 select-none">
          <FaTools className="text-xs" />
          <h3 className="text-[10px] font-mono tracking-widest uppercase">Core Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2 pt-1.5 select-none">
          {majorSkills.map((skill, idx) => (
            <span 
              key={idx} 
              className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-white/5 text-[11px] font-mono text-textSecondary hover:border-accentPrimary hover:text-accentSecondary transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Education Timeline */}
      <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-4">
        <div className="flex items-center space-x-2 text-accentSecondary pb-1.5 border-b border-white/5 select-none">
          <FaGraduationCap className="text-xs" />
          <h3 className="text-[10px] font-mono tracking-widest uppercase">Education History</h3>
        </div>
        <div className="space-y-4 pl-2">
          {education.map((edu, idx) => (
            <div key={idx} className="relative pl-5 border-l border-white/10 space-y-1">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accentSecondary shadow-glow select-none" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
                <h4 className="text-sm font-bold text-textPrimary leading-tight">{edu.degree}</h4>
                <span className="text-[10px] font-mono text-textMuted uppercase tracking-wider select-none">{edu.duration}</span>
              </div>
              <p className="text-xs text-textSecondary">{edu.institution}, {edu.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Interests & Languages (2 Columns Side by Side) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Interests Box */}
        <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-3">
          <div className="flex items-center space-x-2 text-accentSecondary pb-1.5 border-b border-white/5 select-none">
            <FaHeart className="text-xs" />
            <h3 className="text-[10px] font-mono tracking-widest uppercase">Interests</h3>
          </div>
          <div className="flex flex-wrap gap-2 pt-1.5 select-none">
            {interests.map((interest, idx) => (
              <span 
                key={idx} 
                className="px-2 py-0.5 rounded-md bg-neutral-950 border border-white/5 text-[10px] font-mono text-textSecondary"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Languages Box */}
        <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-3">
          <div className="flex items-center space-x-2 text-accentSecondary pb-1.5 border-b border-white/5 select-none">
            <FaLanguage className="text-sm" />
            <h3 className="text-[10px] font-mono tracking-widest uppercase">Languages</h3>
          </div>
          <div className="space-y-2 pt-1.5">
            {languages.map((lang, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="font-bold text-textPrimary">{lang.name}</span>
                <span className="text-[10px] font-mono text-textMuted">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Footer Social Links */}
      <div className="pt-2 flex justify-center space-x-4 select-none">
        <a 
          href="https://www.linkedin.com/in/lakshaygupta2121/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#0077b5]/10 border border-[#0077b5]/20 text-[#0077b5] hover:bg-[#0077b5]/20 hover:shadow-glow transition-all"
        >
          <FaLinkedin className="text-base" />
          <span className="text-xs font-semibold">LinkedIn</span>
        </a>
        <a 
          href="https://github.com/Lakshayg136" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-textPrimary hover:bg-white/10 hover:shadow-glow transition-all"
        >
          <FaGithub className="text-base" />
          <span className="text-xs font-semibold">GitHub</span>
        </a>
      </div>
    </div>
  );
}
