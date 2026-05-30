# 🍎 macOS Portfolio OS — Lakshay Gupta

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://personal-portfolio-tau-hazel-19.vercel.app/)
[![React Version](https://img.shields.io/badge/Built%20with-React%2018-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styled%20with-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Animations-Framer%20Motion-FF00C1?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

Welcome to **macOS Portfolio OS** — an interactive, premium personal portfolio simulating a realistic macOS desktop environment. Designed and engineered to provide visitors with an immersive desktop browsing experience, this project acts as a functional showcase of my technical skills, professional experience, projects, and creative integrations.

> 🌐 **Live Demo:** [lakshaygupta.vercel.app](https://personal-portfolio-tau-hazel-19.vercel.app/)

---

## 🖥️ Inside the OS

This portfolio simulates a complete Unix-like workspace containing several custom-built interactive applications:

*   **📁 Finder (System Explorer)**:
    *   **About Me.app**: A premium biography outline of my professional background and engineering goals.
    *   **Experience Log.app**: Chronological catalog of my industry tenures and academic contributions.
    *   **Skills & Technologies.app**: Grid visualization of languages, frameworks, databases, and tools.
    *   **Certifications.app**: Catalog of verified professional specializations and training programs.
*   **💻 Terminal Simulation (zsh)**:
    *   A fully functional custom shell that responds to actual Unix commands (`help`, `ls`, `cat`, `clear`, `sudo`, `neofetch`, `skills`, `projects`, `contact`). Includes easter eggs and interactive terminal game launchers.
*   **🛠️ Xcode (Projects Catalog)**:
    *   A grid of my primary software repositories, featuring live links to production demos, GitHub codebases, and comprehensive feature breakdowns.
*   **🎮 Game Center (Arcade)**:
    *   Features playable, fully functional web games (including Tic-Tac-Toe and 2048) built natively inside React state to keep visitors engaged.
*   **✉️ Mail (Contact Gateway)**:
    *   Integrated with **EmailJS** to send messages, inquiries, or suggestions directly from the simulated OS straight to my active inbox.
*   **🗑️ Trash Can (System Cleanup)**:
    *   A playful application simulating deleted files (Distraction, Procrastination, Self-Doubt). Clicking items triggers permanent performance-blocker purge notifications.

---

## 🛠️ The Tech Stack

*   **Core Framework**: [React 18](https://reactjs.org/) (Functional Components, Hooks, Context, Custom State Management)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS (Fluid spacing, custom glassmorphism utilities, scrollbars, dynamic responsive layouts)
*   **Animations**: [Framer Motion 10](https://www.framer.com/motion/) (Responsive spring physics, minimize-scaling, desktop alerts)
*   **Email Engine**: [@emailjs/browser](https://www.emailjs.com/) (Direct serverless secure email delivery)
*   **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (Sleek vector icons including FontAwesome & Ionicons)
*   **Tooling**: [Vite](https://vitejs.dev/) (Ultra-fast HMR bundler)

---

## 🤝 Open for Collaboration!

I am actively looking to collaborate with open-source contributors, UI/UX designers, and fellow software engineers to make this simulated OS even more powerful and immersive. 

### 💡 Ideas for Contribution
*   **Additional macOS Apps**: Simulating a Safari Browser app (to display external web pages in-frame), Calculator.app, or a Notes.app with LocalStorage persistence.
*   **Desktop Customization**: Adding a system configuration option to change wallpapers or toggle light/dark modes.
*   **Additional Terminal Commands**: Extending the custom zsh terminal interpreter with more utility scripts.
*   **Arcade Games**: Implementing a Retro Snake game or Tetris in the Game Center app.

### 🛠️ Local Development Setup

To run this project locally on your machine and start contributing:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Lakshayg136/personal-portfolio.git
    cd personal-portfolio
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your own EmailJS keys to test the suggestion and mail boxes:
    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```

4.  **Run Dev Server**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000/` in your browser to view the local site.

5.  **Submit a Pull Request**:
    *   Fork the repository.
    *   Create a branch for your feature (`git checkout -b feature/CoolFeature`).
    *   Commit your changes (`git commit -m "feat: add awesome Safari browser app"`).
    *   Push to your branch (`git push origin feature/CoolFeature`).
    *   Open a Pull Request on GitHub describing your enhancements!

---

##  About This Mac

Simulated system specifications:
*   **OS**: PortfolioOS 1.0 (macOS Sequoia Skin)
*   **Chip**: Lakshay Gupta M3 Ultra
*   **Memory**: 64 GB Unified LPDDR5
*   **Host**: Vercel Serverless Edge Networks
*   **Author**: [Lakshay Gupta](https://github.com/Lakshayg136)

---
*Developed with 💙 by Lakshay Gupta. Feel free to fork, customize, and build your own interactive simulated portfolio!*
