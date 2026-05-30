import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeader({ label, title }) {
  return (
    <div className="mb-12 flex flex-col items-start select-none">
      {/* Label */}
      <motion.span 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs font-mono tracking-widest text-textMuted uppercase mb-2 block"
      >
        {label}
      </motion.span>
      
      {/* Heading */}
      <motion.h2 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-4xl font-display font-bold tracking-tight text-textPrimary"
      >
        {title}
      </motion.h2>

      {/* Decorative Gradient Underline */}
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: 60 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="h-1 bg-accent-gradient rounded-full mt-3"
      />
    </div>
  );
}
