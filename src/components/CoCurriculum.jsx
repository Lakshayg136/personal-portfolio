import React from 'react';
import { FaAward, FaUsers, FaLaptopCode, FaGlobe } from 'react-icons/fa';

export default function CoCurriculum() {
  const cocurriculumItems = [
    {
      role: "Joint Secretary",
      organization: "C Square Club, Chandigarh University",
      type: "leadership",
      icon: FaUsers,
      color: "text-pink-500",
      description: "Coordinating university-level technical events, visual identity, branding strategy, and social media management."
    },
    {
      role: "Head Designer",
      organization: "C Square Club, Chandigarh University",
      type: "leadership",
      icon: FaUsers,
      color: "text-violet-500",
      description: "Leading visual and graphics design direction, defining branding guidelines, and managing promotional materials."
    },
    {
      role: "Active Hackathon Participations",
      organization: "National & Global Compete Circles",
      type: "competitions",
      icon: FaLaptopCode,
      color: "text-emerald-500",
      description: "Collaborated in high-stakes sprints developing solutions:",
      points: [
        "Finalist — Project Expo 2025, Chandigarh University",
        "Participant — Techathon (Internal SIH)",
        "Participant — Google Gen AI Hackathon",
        "Participant — AI for Bharat by AWS"
      ]
    },
    {
      role: "Campus Ambassadors",
      organization: "Premier Tech Framework Networks",
      type: "ambassador",
      icon: FaGlobe,
      color: "text-sky-500",
      description: "Represented open-source and elite tech organizations inside campus:",
      points: [
        "Techfest IIT Bombay",
        "GirlScript Summer of Code",
        "Rendezvous IIT Delhi 2025"
      ]
    }
  ];

  return (
    <div className="space-y-5 select-text">
      <div className="flex items-center space-x-2 text-accentPrimary pb-1.5 border-b border-white/5 select-none">
        <FaAward className="text-sm" />
        <h3 className="text-xs font-mono font-bold tracking-widest uppercase">
          Co-Curricular Portfolio
        </h3>
      </div>

      <div className="space-y-4">
        {cocurriculumItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-neutral-900/40 border border-white/5 hover:border-accentPrimary/40 hover:shadow-glow transition-all duration-300 relative group"
            >
              <div className="flex items-center space-x-3 select-none">
                <div className={`w-9 h-9 rounded-lg bg-neutral-950 border border-white/5 flex items-center justify-center ${item.color} group-hover:bg-accentPrimary/10 transition-colors`}>
                  <Icon className="text-base" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-textPrimary leading-tight">
                    {item.role}
                  </h4>
                  <span className="text-[10px] font-mono text-textMuted uppercase mt-0.5 block">
                    {item.organization}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-xs sm:text-sm text-textSecondary leading-relaxed font-body pl-1">
                <p>{item.description}</p>
                {item.points && (
                  <ul className="mt-2 pl-4 list-disc space-y-1 text-xs text-textMuted font-mono">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
