import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function Education({ educationData }) {
  return (
    <section id="education" className="py-24 bg-bgPrimary relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader label="06 / Education" title="Academic Journey" />

        {/* Timeline container */}
        <div className="relative mt-12">
          {/* Vertical Timeline Spine */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accentSecondary via-accentPrimary to-bgPrimary -translate-x-1/2" />

          <div className="space-y-12">
            {educationData.map((edu, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index} 
                  className="relative flex flex-col md:flex-row items-start md:items-center justify-between"
                >
                  {/* Timeline Dot (Graduation Cap) */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div className={`p-2 rounded-full border-2 bg-neutral-950 ${
                      edu.current 
                        ? 'border-accentSecondary text-accentSecondary shadow-glow' 
                        : 'border-neutral-700 text-textSecondary'
                    }`}>
                      <FaGraduationCap className="text-sm" />
                    </div>
                  </div>

                  {/* Left Column (Desktop) */}
                  <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${isEven ? 'md:text-right md:order-1' : 'md:order-3'}`}>
                    {isEven ? (
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="bg-bgCard border border-borderSubtle p-6 rounded-2xl hover:border-accentSecondary hover:shadow-glow transition-all duration-300 relative group"
                      >
                        {edu.current && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-statusGreen/10 border border-statusGreen text-[10px] text-statusGreen font-mono uppercase mb-3">
                            Currently Enrolled
                          </span>
                        )}

                        <h3 className="text-xl font-display font-semibold text-textPrimary group-hover:text-accentSecondary transition-colors duration-300">
                          {edu.degree}
                        </h3>
                        <h4 className="text-sm font-semibold text-accentPrimary mt-1">
                          {edu.institution}
                        </h4>

                        <div className="flex flex-wrap md:justify-end gap-3 text-xs text-textMuted mt-3 font-mono">
                          <span className="flex items-center space-x-1">
                            <FaCalendarAlt />
                            <span>{edu.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FaMapMarkerAlt />
                            <span>{edu.location}</span>
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="hidden md:block" />
                    )}
                  </div>

                  {/* Spacer Column (Desktop) */}
                  <div className="hidden md:block w-[5%] order-2" />

                  {/* Right Column (Desktop) */}
                  <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${isEven ? 'md:order-3' : 'md:order-1'}`}>
                    {!isEven ? (
                      <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="bg-bgCard border border-borderSubtle p-6 rounded-2xl hover:border-accentSecondary hover:shadow-glow transition-all duration-300 relative group"
                      >
                        {edu.current && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-statusGreen/10 border border-statusGreen text-[10px] text-statusGreen font-mono uppercase mb-3">
                            Currently Enrolled
                          </span>
                        )}

                        <h3 className="text-xl font-display font-semibold text-textPrimary group-hover:text-accentSecondary transition-colors duration-300">
                          {edu.degree}
                        </h3>
                        <h4 className="text-sm font-semibold text-accentPrimary mt-1">
                          {edu.institution}
                        </h4>

                        <div className="flex flex-wrap gap-3 text-xs text-textMuted mt-3 font-mono">
                          <span className="flex items-center space-x-1">
                            <FaCalendarAlt />
                            <span>{edu.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FaMapMarkerAlt />
                            <span>{edu.location}</span>
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="hidden md:block" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
