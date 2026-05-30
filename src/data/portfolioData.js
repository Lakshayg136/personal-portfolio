// src/data/portfolioData.js

export const personalInfo = {
  name: "Lakshay Gupta",
  titles: [
    "Full-Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Open Source Contributor"
  ],
  summary: "I am a dedicated and creative B.E. Computer Science student at Chandigarh University with a deep passion for building intuitive, high-performance web applications. As a Full-Stack Developer and UI/UX Designer, I love bridging the gap between elegant frontend visuals and robust, clean backend systems. Currently expanding my horizons as a Technical Intern in Digital Operations at Maruti Suzuki India Limited, I thrive on tackling complex engineering problems, designing fluid digital experiences, and continuously learning emerging technologies to shape user-centered solutions.",
  currentRole: "Technical Intern (Digital Operations) @ Maruti Suzuki India Limited",
  email: "lakshayg136@gmail.com",
  phone: "+91 8373968303",
  location: "Gurugram / Chandigarh, India",
  github: "https://github.com/Lakshayg136",
  linkedin: "https://www.linkedin.com/in/lakshaygupta2121/", // User direct profile URL
  leetcode: "https://leetcode.com/Lakshayg136", // Standard profile link structure matching GitHub username
  resumeUrl: "/resume.pdf"
};

export const skills = {
  languages: ["Python", "C++", "Java", "JavaScript"],
  frontend: ["HTML5", "CSS3", "Tailwind CSS", "Responsive Design", "React.js"],
  backend: ["Node.js", "Express.js", "Flask", "REST APIs", "JWT Auth", "API Integration"],
  database: ["MongoDB", "DBMS (concepts)"],
  tools: ["Git", "GitHub", "Figma", "OpenCV", "Vercel", "Canva", "Arduino", "LaTeX", "Cloudinary"],
  coreCs: ["Data Structures & Algorithms", "OOP", "Operating Systems"]
};

export const experience = [
  {
    company: "Maruti Suzuki India Limited",
    role: "Technical Intern (Digital Operations)",
    duration: "May 2026 – Present",
    location: "Gurugram, India",
    current: true,
    points: [
      "Converting manual operational data into structured digital formats, improving audit report retrieval and supporting data-driven decision-making across departments.",
      "Collaborating with stakeholders to digitize audit workflows, reducing manual effort and establishing consistent data capture standards."
    ]
  },
  {
    company: "LOOPINTechies Services Pvt. Ltd.",
    role: "Software Graphic Design Intern",
    duration: "Dec 2025 – Jan 2026",
    location: "Remote",
    current: false,
    points: [
      "Designed wireframes and UI/UX prototypes for client-facing web applications, improving the design-to-development handoff.",
      "Collaborating with development teams to translate design specifications into production-ready interfaces."
    ]
  }
];

export const projects = [
  {
    title: "CU Market",
    subtitle: "Campus Marketplace Platform",
    description: "A full-stack campus marketplace with real-time buyer-seller chat, JWT authentication, Cloudinary image uploads, and secure product listing flows.",
    tags: ["MongoDB", "Express", "React", "Node.js", "JWT", "Cloudinary"],
    liveUrl: "https://cumarketplace.vercel.app/",
    githubUrl: "https://github.com/Lakshayg136" // Primary fallback to profile as exact repo not detailed
  },
  {
    title: "Maitri",
    subtitle: "Women's Health Companion App",
    description: "A privacy-focused MERN stack platform with cycle tracking, symptom logging, AI-powered insights, OTP authentication, and community features ensuring data confidentiality.",
    tags: ["React", "Node.js", "MongoDB", "OTP Auth"],
    liveUrl: "https://maitri-healthcare.vercel.app/",
    githubUrl: "https://github.com/Lakshayg136"
  },
  {
    title: "LinkedIn Clone",
    subtitle: "Professional Networking UI",
    description: "A responsive professional networking interface featuring user profiles, activity feeds, and networking components — built entirely with vanilla HTML5, CSS3, and JavaScript.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/Lakshayg136/linkedin-clone-html-css"
  },
  {
    title: "Sustainable & Explainable ML",
    subtitle: "Research Paper — Under Review for Conference",
    description: "Empirical trade-off analysis between model accuracy, energy efficiency, and interpretability in machine learning systems, contributing to responsible and sustainable Green AI.",
    tags: ["Green AI", "Explainable AI (XAI)", "Optimization"],

  }
];

export const research = {
  title: "Sustainable and Explainable Machine Learning: Empirical Trade-off Analysis Between Accuracy, Energy Efficiency, and Interpretability",
  status: "Under Review for Conference",
  tags: ["Green AI", "Explainable AI (XAI)", "Multi-objective Optimization"],
  description: "This research investigates the empirical trade-offs between model accuracy, energy efficiency, and interpretability in machine learning systems — contributing to the growing field of responsible and sustainable AI."
};

export const education = [
  {
    degree: "B.E. in Computer Science",
    institution: "Chandigarh University",
    location: "Mohali, India",
    duration: "July 2024 – Present",
    current: true
  },
  {
    degree: "Intermediate – Class XII",
    institution: "Lzebra Public School",
    location: "Kota, India",
    duration: "May 2023 – May 2024",
    current: false
  },
  {
    degree: "Matriculation – Class X",
    institution: "Delhi Public School",
    location: "Maruti Kunj, New Delhi, India",
    duration: "May 2021 – May 2022",
    current: false
  }
];

export const achievements = {
  leadership: [
    {
      role: "Joint Secretary & Head Designer",
      organization: "C Square Club, Chandigarh University",
      description: "Coordinating university-level technical events, visual identity, branding strategy, and social media management."
    },
    {
      role: "Campus Ambassador",
      organization: "Techfest IIT Bombay | GirlScript Summer of Code | Rendezvous IIT Delhi 2025",
      description: "Represented premier national technical networks and open-source campaigns within campus circles."
    }
  ],
  competitions: [
    {
      title: "Finalist",
      organization: "Project Expo 2025, Chandigarh University",
      description: "Recognized as a leading project submission among hundreds of engineering entries."
    },
    {
      title: "Hackathon Participant",
      organization: "Techathon (Internal SIH), Google Gen AI Hackathon, AI for Bharat by AWS",
      description: "Successfully built digital systems in highly competitive, timed development contexts."
    }
  ]
};

export const certifications = [
  {
    title: "Introduction to AI",
    issuer: "Intel & Chandigarh University"
  },
  {
    title: "Python Data Analytics",
    issuer: "Meta (Coursera)"
  },
  {
    title: "Using Databases with Python",
    issuer: "University of Michigan (Coursera)"
  },
  {
    title: "Operating Systems and You",
    issuer: "Google (Coursera)"
  },
  {
    title: "Java Programming for Beginners",
    issuer: "IBM (Coursera)"
  },
  {
    title: "Development Methodologies Overview",
    issuer: "LearnQuest (Coursera)"
  },
  {
    title: "Microsoft Power BI",
    issuer: "Microsoft"
  },
  {
    title: "AcceleratorX Global Program",
    issuer: "Launched Global"
  }
];
