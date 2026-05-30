import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { FaBookOpen, FaChevronDown, FaChevronUp, FaLeaf } from 'react-icons/fa';

export default function Research({ researchData }) {
  const [showAbstract, setShowAbstract] = useState(false);

  const abstractText = `
    As machine learning (ML) models grow increasingly complex, their carbon footprint and computational requirements have escalated significantly. This paper presents an empirical analysis of the fundamental trade-offs between model accuracy, energy consumption (measured in Joules/kWh during inference and training), and model interpretability. We benchmark various architectures—ranging from deep neural networks to explainable boosting trees—across multiple datasets. By employing multi-objective optimization (Pareto frontiers), we demonstrate how practitioners can achieve substantial energy savings (up to 40%) with negligible accuracy compromises, whilst maintaining clear explainability pathways using SHAP/LIME frameworks. Our findings provide a concrete framework for the engineering of environmentally responsible, sustainable, and transparent artificial intelligence systems.
  `;

  return (
    <section id="research" className="py-24 bg-bgSecondary relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader label="05 / Research" title="Scientific Publications" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-bgCard border border-borderSubtle rounded-3xl p-6 sm:p-8 hover:border-accentSecondary hover:shadow-glow transition-all duration-300 relative group max-w-4xl mx-auto overflow-hidden"
        >
          {/* Top Decorative accent tag */}
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-accentSecondary to-accentPrimary" />

          {/* Main Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-3 text-accentSecondary">
              <FaBookOpen className="text-xl sm:text-2xl" />
              <span className="text-xs font-mono uppercase tracking-widest text-textSecondary font-semibold">
                Research Project
              </span>
            </div>

            {/* Conference Badge */}
            <div className="self-start sm:self-auto inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-statusAmber/10 border border-statusAmber/30 text-xs text-statusAmber font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-statusAmber animate-pulse" />
              <span>{researchData.status}</span>
            </div>
          </div>

          {/* Paper Title */}
          <h3 className="text-xl sm:text-2xl font-display font-bold text-textPrimary leading-snug group-hover:text-accentSecondary transition-colors duration-300">
            {researchData.title}
          </h3>

          {/* Research Tags */}
          <div className="flex flex-wrap gap-2 mt-4 mb-6">
            {researchData.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-neutral-900 border border-white/5 text-xs text-textSecondary"
              >
                {tag === "Green AI" && <FaLeaf className="text-emerald-400 text-xs" />}
                <span>{tag}</span>
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-textSecondary leading-relaxed font-body mb-6">
            {researchData.description}
          </p>

          {/* Abstract Accordion Button */}
          <div className="flex flex-col items-center sm:items-start">
            <button
              onClick={() => setShowAbstract(!showAbstract)}
              className="px-6 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs font-mono text-textPrimary hover:bg-neutral-800 hover:border-accentSecondary hover:shadow-glow transition-all duration-300 flex items-center space-x-2"
            >
              <span>{showAbstract ? 'Hide Abstract' : 'Read Paper Abstract'}</span>
              {showAbstract ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
            </button>

            {/* Accordion Content */}
            <AnimatePresence>
              {showAbstract && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden w-full"
                >
                  <div className="mt-4 p-4 sm:p-6 rounded-2xl bg-neutral-950/60 border border-borderSubtle text-xs sm:text-sm text-textSecondary font-mono leading-relaxed text-justify">
                    <strong className="text-accentSecondary block mb-2 font-display uppercase tracking-wider text-[10px]">
                      Abstract:
                    </strong>
                    {abstractText.trim()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
