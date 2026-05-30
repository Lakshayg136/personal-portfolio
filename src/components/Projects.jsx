import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaFolder } from 'react-icons/fa';

export default function Projects({ projectsData }) {
  return (
    <div className="space-y-5 select-text">
      <div className="flex items-center space-x-2 text-accentPrimary pb-1.5 border-b border-white/5 select-none">
        <FaFolder className="text-sm" />
        <h3 className="text-xs font-mono font-bold tracking-widest uppercase">
          Projects Catalog
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projectsData.map((project, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-neutral-900/40 border border-white/5 flex flex-col justify-between hover:border-accentPrimary/40 hover:shadow-glow transition-all duration-300 group"
          >
            <div>
              {/* Stack Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-neutral-950 border border-white/5 text-accentSecondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h4 className="text-base font-bold text-textPrimary group-hover:text-accentPrimary transition-colors duration-200 leading-tight">
                {project.title}
              </h4>
              <span className="text-[10px] font-mono text-textMuted uppercase mt-0.5 block tracking-wider">
                {project.subtitle}
              </span>

              <p className="text-xs text-textSecondary mt-3.5 leading-relaxed font-body">
                {project.description}
              </p>
            </div>

            {/* Links Block */}
            <div className="flex items-center justify-between mt-5 pt-3 border-t border-white/5 select-none">
              <a 
                href={project.githubUrl || 'https://github.com/Lakshayg136'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-xs text-textSecondary hover:text-textPrimary transition-colors font-mono"
              >
                <FaGithub />
                <span>Source</span>
              </a>

              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-xs text-accentSecondary hover:text-textPrimary transition-colors font-mono"
                >
                  <span>Live Demo</span>
                  <FaExternalLinkAlt className="text-[9px]" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
