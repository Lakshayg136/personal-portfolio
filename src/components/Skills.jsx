import React from 'react';
import { 
  FaPython, FaJava, FaJsSquare, FaHtml5, FaCss3Alt, FaReact, 
  FaNodeJs, FaDatabase, FaGitAlt, FaGithub, FaFigma, FaLaptopCode,
  FaBrain, FaCode, FaCube, FaLeaf, FaLaptop, FaChevronRight, FaChartBar
} from 'react-icons/fa';
import { 
  SiCplusplus, SiTailwindcss, SiExpress, SiFlask, SiJsonwebtokens, 
  SiMongodb, SiOpencv, SiVercel, SiCanva, SiArduino, SiLatex,
  SiScikitlearn, SiNumpy, SiPandas
} from 'react-icons/si';

const getSkillIcon = (name) => {
  const map = {
    "Python": { icon: FaPython, color: "text-[#3776AB]" },
    "C++": { icon: SiCplusplus, color: "text-[#00599C]" },
    "Java": { icon: FaJava, color: "text-[#007396]" },
    "JavaScript": { icon: FaJsSquare, color: "text-[#F7DF1E]" },
    "HTML5": { icon: FaHtml5, color: "text-[#E34F26]" },
    "CSS3": { icon: FaCss3Alt, color: "text-[#1572B6]" },
    "Tailwind CSS": { icon: SiTailwindcss, color: "text-[#06B6D4]" },
    "React.js": { icon: FaReact, color: "text-[#61DAFB]" },
    "Node.js": { icon: FaNodeJs, color: "text-[#339933]" },
    "Express.js": { icon: SiExpress, color: "text-[#E2E8F0]" },
    "Flask": { icon: SiFlask, color: "text-[#888888]" },
    "MongoDB": { icon: SiMongodb, color: "text-[#47A248]" },
    "DBMS (concepts)": { icon: FaDatabase, color: "text-[#F87171]" },
    "Git": { icon: FaGitAlt, color: "text-[#F05032]" },
    "GitHub": { icon: FaGithub, color: "text-[#E2E8F0]" },
    "Figma": { icon: FaFigma, color: "text-[#F24E1E]" },
    "OpenCV": { icon: SiOpencv, color: "text-[#5C3EE6]" },
    "Data Structures & Algorithms": { icon: FaBrain, color: "text-[#EAB308]" },
    "OOP": { icon: FaCube, color: "text-[#A855F7]" },
    "Operating Systems": { icon: FaLaptop, color: "text-[#3B82F6]" },
    "Arduino": { icon: SiArduino, color: "text-[#00979D]" },
    "Vercel": { icon: SiVercel, color: "text-[#FFFFFF]" },
    "Scikit-learn": { icon: SiScikitlearn, color: "text-[#F7931E]" },
    "Numpy": { icon: SiNumpy, color: "text-[#4D77CF]" },
    "Pandas": { icon: SiPandas, color: "text-[#150458]" },
    "Matplotlib": { icon: FaChartBar, color: "text-[#11557C]" }
  };
  return map[name] || { icon: FaCode, color: "text-textSecondary" };
};

export default function Skills({ skillsData }) {
  // Structure aligned with Image 3 custom modules
  const categories = [
    {
      title: "Languages",
      icon: FaCode,
      color: "text-[#3b82f6]",
      skills: ["Python", "C++", "Java", "JavaScript"]
    },
    {
      title: "Frontend",
      icon: FaLaptopCode,
      color: "text-[#a855f7]",
      skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS"]
    },
    {
      title: "Backend",
      icon: FaNodeJs,
      color: "text-[#22c55e]",
      skills: ["Node.js", "Express.js", "Flask", "MongoDB"]
    },
    {
      title: "AI & ML",
      icon: FaBrain,
      color: "text-[#f97316]",
      skills: ["Scikit-learn", "Numpy", "Pandas", "Matplotlib"]
    },
    {
      title: "Technical Core",
      icon: FaCube,
      color: "text-[#eab308]",
      skills: ["Git", "GitHub", "DBMS (concepts)", "Data Structures & Algorithms", "OOP", "Operating Systems"]
    },
    {
      title: "Soft Skills",
      icon: FaRegLightbulb,
      color: "text-[#06b6d4]",
      skills: ["Problem Solving", "Team Leadership", "Technical Writing", "UI/UX Design"]
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 select-text">
      {categories.map((cat, idx) => {
        const Icon = cat.icon || FaCode;
        return (
          <div 
            key={idx}
            className="p-4 rounded-xl bg-neutral-900/40 border border-white/5 flex flex-col justify-start hover:border-accentPrimary/30 transition-all duration-300 group"
          >
            {/* Category Header */}
            <div className="flex items-center space-x-2 mb-3 pb-1.5 border-b border-white/5 select-none">
              <Icon className={`${cat.color} text-sm`} />
              <h3 className="text-xs font-mono font-bold tracking-wider text-textPrimary uppercase">
                {cat.title}
              </h3>
            </div>

            {/* Badges List */}
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => {
                const iconInfo = getSkillIcon(skill);
                const SkillIcon = iconInfo.icon;
                return (
                  <span 
                    key={skill}
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-neutral-950 border border-white/5 text-xs text-textSecondary font-mono select-none hover:text-textPrimary hover:border-accentSecondary transition-colors"
                  >
                    <SkillIcon className={`${iconInfo.color} text-xs`} />
                    <span>{skill}</span>
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Dummy element import resolver
function FaRegLightbulb(props) {
  return (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" {...props}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .5 2.5 1.5 3.5.7.8 1.3 1.5 1.5 2.5"></path>
      <path d="M9 18h6"></path>
      <path d="M10 22h4"></path>
    </svg>
  );
}
