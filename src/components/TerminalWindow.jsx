import React, { useState, useEffect, useRef } from 'react';

export default function TerminalWindow({ 
  personalInfo, 
  skills, 
  projects, 
  experience, 
  certifications, 
  achievements,
  onLaunchGame, 
  onOpenWindow 
}) {
  const [history, setHistory] = useState([
    { text: "Welcome to Lakshay-OS Terminal v1.0.0", type: "system" },
    { text: "Type 'help' to view all available commands.", type: "system" },
    { text: "", type: "spacing" }
  ]);
  const [input, setInput] = useState("");
  
  // Tic-Tac-Toe Game State
  const [isGameActive, setIsGameActive] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null)); // Array of 9 cells
  const [gameMessage, setGameMessage] = useState("");

  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  // Refocus input on click
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Helper to draw Tic-Tac-Toe Board
  const renderBoardText = (grid) => {
    const b = grid.map((c, i) => c || (i + 1));
    return [
      `  ${b[0]} | ${b[1]} | ${b[2]}  `,
      ` ---|---|--- `,
      `  ${b[3]} | ${b[4]} | ${b[5]}  `,
      ` ---|---|--- `,
      `  ${b[6]} | ${b[7]} | ${b[8]}  `
    ];
  };

  // Check Tic-Tac-Toe Winner
  const checkWinner = (grid) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        return grid[a];
      }
    }
    if (grid.every(cell => cell !== null)) return 'Draw';
    return null;
  };

  // Computer AI Move
  const makeComputerMove = (currentBoard) => {
    const emptyIndices = currentBoard
      .map((cell, idx) => (cell === null ? idx : null))
      .filter(val => val !== null);
    
    if (emptyIndices.length === 0) return currentBoard;
    
    // Simplistic random pick AI
    const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const nextBoard = [...currentBoard];
    nextBoard[randomIdx] = 'O';
    return nextBoard;
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const commandLine = { text: `lakshay@macbook ~ % ${cmd}`, type: "command" };
    let response = [];

    // Handle Active Tic-Tac-Toe game moves
    if (isGameActive) {
      const move = parseInt(cmd, 10);
      if (isNaN(move) || move < 1 || move > 9 || board[move - 1] !== null) {
        setHistory(prev => [
          ...prev, 
          commandLine, 
          { text: "Invalid move! Please enter an empty cell number (1-9).", type: "error" }
        ]);
        setInput("");
        return;
      }

      // 1. Player Move
      const playerBoard = [...board];
      playerBoard[move - 1] = 'X';
      
      let winner = checkWinner(playerBoard);
      
      if (winner === 'X') {
        setIsGameActive(false);
        setHistory(prev => [
          ...prev,
          commandLine,
          ...renderBoardText(playerBoard).map(l => ({ text: l, type: "info" })),
          { text: "🎉 CONGRATULATIONS! You beat the computer! Lakshay-OS optimizes you!", type: "success" },
          { text: "", type: "spacing" }
        ]);
        setInput("");
        return;
      } else if (winner === 'Draw') {
        setIsGameActive(false);
        setHistory(prev => [
          ...prev,
          commandLine,
          ...renderBoardText(playerBoard).map(l => ({ text: l, type: "info" })),
          { text: "🤝 Draw game! Well played.", type: "system" },
          { text: "", type: "spacing" }
        ]);
        setInput("");
        return;
      }

      // 2. Computer Move
      const finalBoard = makeComputerMove(playerBoard);
      winner = checkWinner(finalBoard);

      if (winner === 'O') {
        setIsGameActive(false);
        setHistory(prev => [
          ...prev,
          commandLine,
          ...renderBoardText(finalBoard).map(l => ({ text: l, type: "info" })),
          { text: "💻 Computer wins! Try again by typing 'play tictactoe'.", type: "error" },
          { text: "", type: "spacing" }
        ]);
      } else if (winner === 'Draw') {
        setIsGameActive(false);
        setHistory(prev => [
          ...prev,
          commandLine,
          ...renderBoardText(finalBoard).map(l => ({ text: l, type: "info" })),
          { text: "🤝 Draw game! Well played.", type: "system" },
          { text: "", type: "spacing" }
        ]);
      } else {
        setBoard(finalBoard);
        setHistory(prev => [
          ...prev,
          commandLine,
          ...renderBoardText(finalBoard).map(l => ({ text: l, type: "info" })),
          { text: "Your turn! Enter empty grid position (1-9):", type: "system" }
        ]);
      }

      setInput("");
      return;
    }

    // Normal command processing
    const cleanCmd = cmd.toLowerCase();

    switch (cleanCmd) {
      case 'help':
        response = [
          { text: "AVAILABLE OS COMMANDS:", type: "system" },
          { text: "  about   - Print brief biography summary", type: "info" },
          { text: "  skills  - List core technical skills", type: "info" },
          { text: "  contact - Show professional contact details", type: "info" },
          { text: "  secret  - Prompt to reveal", type: "info" },
          { text: "  games   - Launch retro arcade games module", type: "success" },
          { text: "  clear   - Clear the terminal prompt history", type: "info" }
        ];
        break;
      case 'about':
      case 'aboutme':
        if (onOpenWindow) onOpenWindow('about');
        response = [
          { text: "👤 PROFILE REPORT: ABOUT ME", type: "system" },
          { text: `  Name     : ${personalInfo.name}`, type: "info" },
          { text: `  Roles    : ${personalInfo.titles.join(' | ')}`, type: "info" },
          { text: `  Status   : ${personalInfo.currentRole}`, type: "info" },
          { text: `  Location : ${personalInfo.location}`, type: "info" },
          { text: `  Bio      : ${personalInfo.summary}`, type: "info" },
          { text: "Launching graphical 'About Me' window...", type: "success" }
        ];
        break;
      case 'skills':
        if (onOpenWindow) onOpenWindow('skills');
        response = [
          { text: "💻 TECHNICAL SKILLS ROSTER", type: "system" },
          { text: `  Languages  : ${skills.languages.join(', ')}`, type: "info" },
          { text: `  Frontend   : ${skills.frontend.join(', ')}`, type: "info" },
          { text: `  Backend    : ${skills.backend.join(', ')}`, type: "info" },
          { text: `  Database   : ${skills.database.join(', ')}`, type: "info" },
          { text: `  Core CS    : ${skills.coreCs.join(', ')}`, type: "info" },
          { text: `  Tools/Misc : ${skills.tools.join(', ')}`, type: "info" },
          { text: "Launching graphical 'Skills' directory...", type: "success" }
        ];
        break;
      case 'contact':
      case 'mail':
      case 'email':
        if (onOpenWindow) onOpenWindow('contact');
        response = [
          { text: "✉️ CONTACT COORDINATES", type: "system" },
          { text: `  Email    : ${personalInfo.email}`, type: "info" },
          { text: `  Phone    : ${personalInfo.phone}`, type: "info" },
          { text: `  Location : ${personalInfo.location}`, type: "info" },
          { text: "Launching graphical interactive Mail Box Contact window...", type: "success" }
        ];
        break;
      case 'games':
      case 'play':
        if (onLaunchGame) onLaunchGame('tictactoe');
        response = [
          { text: "🎮 LAUNCHING LAKSHAY GAME CENTER ARCADE...", type: "success" },
          { text: "Successfully opened Game Center window. Enjoy the gaming deck! 🚀", type: "info" }
        ];
        break;
      case 'play tictactoe':
      case 'tictactoe':
        if (onLaunchGame) onLaunchGame('tictactoe');
        response = [
          { text: "🎮 LAUNCHING TIC-TAC-TOE VS COMPUTER!", type: "success" },
          { text: "Opened Game Center window showing active Tic-Tac-Toe. Have fun!", type: "info" }
        ];
        break;
      case 'play tetris':
      case 'tetris':
        if (onLaunchGame) onLaunchGame('tetris');
        response = [
          { text: "🧱 LAUNCHING TETRIS NEON STACKER...", type: "success" },
          { text: "Opened Game Center window showing active Tetris. Use arrows to clear rows!", type: "info" }
        ];
        break;
      case 'play flappy':
      case 'flappy':
        if (onLaunchGame) onLaunchGame('flappy');
        response = [
          { text: "🐦 LAUNCHING FLAPPY BIRD NEON ORB...", type: "success" },
          { text: "Opened Game Center window showing active Flappy Bird. Click or spacebar to jump!", type: "info" }
        ];
        break;
      case 'secret':
        response = [
          { text: "🔓 EASTER EGG UNLOCKED!", type: "success" },
          { text: "Glad you reached till here!", type: "success" },
          { text: "Fact: The person who made this doesn’t like tea. I hope any HR reading this rejects me because of it. ☕", type: "info" }
        ];
        break;
      case 'clear':
        setHistory([]);
        setInput("");
        return;
      default:
        response = [
          { text: `zsh: command not found: ${input}`, type: "error" },
          { text: "Type 'help' to review a list of supported commands.", type: "system" }
        ];
    }

    setHistory((prev) => [...prev, commandLine, ...response, { text: "", type: "spacing" }]);
    setInput("");
  };

  return (
    <div 
      onClick={handleTerminalClick}
      className="w-full h-full bg-[#0b0b10] text-[#00ff66] font-mono text-xs sm:text-sm p-4 rounded-xl flex flex-col justify-between h-[360px] sm:h-[400px] overflow-hidden border border-white/5 cursor-text select-text"
    >
      <div 
        ref={bodyRef}
        className="flex-grow overflow-y-auto space-y-1.5 custom-scroll pr-1"
      >
        {history.map((log, idx) => {
          if (log.type === "spacing") return <div key={idx} className="h-2" />;
          
          let colorClass = "text-[#A8FFB2]";
          if (log.type === "command") colorClass = "text-textPrimary font-semibold";
          if (log.type === "system") colorClass = "text-accentSecondary";
          if (log.type === "error") colorClass = "text-rose-400";
          if (log.type === "success") colorClass = "text-emerald-400 font-bold";
          if (log.type === "info") colorClass = "text-textSecondary";

          return (
            <div key={idx} className={`${colorClass} whitespace-pre-wrap break-words leading-relaxed`}>
              {log.text}
            </div>
          );
        })}
      </div>

      {/* Terminal prompt form */}
      <form onSubmit={handleCommandSubmit} className="flex items-center mt-3 pt-2 border-t border-white/5">
        <span className="text-accentPrimary font-semibold shrink-0 select-none mr-2">
          lakshay@macbook ~ %
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-textPrimary focus:outline-none placeholder-textMuted/45 caret-accentSecondary"
          placeholder={isGameActive ? "enter move 1-9..." : "type help..."}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
