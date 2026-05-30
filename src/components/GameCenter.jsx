import React, { useState, useEffect, useRef } from 'react';
import { FaRedo, FaTrophy, FaGamepad, FaSpaceShuttle } from 'react-icons/fa';

export default function GameCenter({ activeGame, setActiveGame }) {
  // Global score and achievements tracking across games
  const [flappyHighScore, setFlappyHighScore] = useState(0);
  const [tetrisHighScore, setTetrisHighScore] = useState(0);
  const [tictactoeRecord, setTictactoeRecord] = useState({ wins: 0, losses: 0, draws: 0 });
  const [nextTetromino, setNextTetromino] = useState(1); // Keeps track of next block for preview

  return (
    <div className="flex flex-col h-full bg-[#050508] text-textPrimary rounded-xl overflow-hidden border border-white/5 select-none font-sans w-full max-w-[100vw]">
      {/* 1. Cyber Menu Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-neutral-950/90 border-b border-white/5 shrink-0 select-none">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-accentSecondary animate-ping absolute opacity-60" />
            <div className="w-3.5 h-3.5 rounded-full bg-accentSecondary border border-white/20 relative z-10" />
          </div>
          <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-accentSecondary">
            LAKSHAY ARCADE MODULE v3.0 // CYBER-DASHBOARD
          </span>
        </div>
        
        <div className="flex space-x-1.5 font-mono font-bold">
          {['tictactoe', 'flappy', 'tetris'].map((game) => (
            <button
              key={game}
              onClick={() => setActiveGame(game)}
              className={`px-4 py-2 rounded-lg border text-[10px] sm:text-xs transition-all duration-300 uppercase tracking-widest ${
                activeGame === game 
                  ? 'bg-accentPrimary border-accentPrimary text-white shadow-glow' 
                  : 'bg-neutral-900 border-white/5 text-textSecondary hover:text-textPrimary hover:bg-neutral-800'
              }`}
            >
              {game}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Full-Screen Dashboard Grid (Fills Maximized Width Perfectly!) */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-4 gap-6 p-6 overflow-y-auto custom-scroll items-stretch">
        
        {/* PANEL A: Hall of Fame & Achievements (Left Column) */}
        <div className="p-5 rounded-2xl bg-neutral-950/80 border border-white/5 flex flex-col justify-between shadow-2xl relative overflow-hidden xl:col-span-1 select-none h-[420px] xl:h-auto">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-accentSecondary/5 via-transparent to-transparent pointer-events-none" />
          <div className="space-y-4">
            <div className="pb-3.5 border-b border-white/5 flex items-center space-x-2">
              <FaTrophy className="text-accentSecondary text-base" />
              <h4 className="text-xs font-mono font-extrabold uppercase tracking-widest text-textPrimary">Hall of Fame</h4>
            </div>

            {/* Live Stats */}
            <div className="space-y-2.5 font-mono text-[11px]">
              <div className="flex justify-between items-center bg-neutral-900/40 p-2.5 rounded-lg border border-white/5">
                <span className="text-textSecondary">Spaceship Best:</span>
                <span className="font-bold text-accentSecondary shadow-glow-text">{flappyHighScore} Pts</span>
              </div>
              <div className="flex justify-between items-center bg-neutral-900/40 p-2.5 rounded-lg border border-white/5">
                <span className="text-textSecondary">Tetris Record:</span>
                <span className="font-bold text-accentSecondary shadow-glow-text">{tetrisHighScore} Pts</span>
              </div>
              <div className="flex justify-between items-center bg-neutral-900/40 p-2.5 rounded-lg border border-white/5">
                <span className="text-textSecondary">Tic-Tac-Toe AI:</span>
                <span className="font-bold text-textPrimary">
                  W:{tictactoeRecord.wins} L:{tictactoeRecord.losses} D:{tictactoeRecord.draws}
                </span>
              </div>
            </div>

            {/* Pulser Achievements */}
            <div className="space-y-2 pt-2">
              <span className="text-[9px] font-mono text-textMuted uppercase tracking-widest font-extrabold block">Cyber Achievements</span>
              
              <div className={`p-2.5 rounded-xl border flex items-center space-x-2.5 transition-all ${
                flappyHighScore >= 10 
                  ? 'bg-emerald-950/20 border-emerald-500/35 text-emerald-400' 
                  : 'bg-neutral-900/20 border-white/5 text-textMuted'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] ${
                  flappyHighScore >= 10 ? 'bg-emerald-500/20 shadow-glow' : 'bg-neutral-950 border border-white/5'
                }`}>🚀</div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-[10px] font-bold truncate">Space Ace</h5>
                  <p className="text-[8px] font-mono tracking-wide opacity-80">Score &ge; 10 in Flappy Spaceship</p>
                </div>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center space-x-2.5 transition-all ${
                tetrisHighScore >= 1000 
                  ? 'bg-emerald-950/20 border-emerald-500/35 text-emerald-400' 
                  : 'bg-neutral-900/20 border-white/5 text-textMuted'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] ${
                  tetrisHighScore >= 1000 ? 'bg-emerald-500/20 shadow-glow' : 'bg-neutral-950 border border-white/5'
                }`}>🧱</div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-[10px] font-bold truncate">Tetris Master</h5>
                  <p className="text-[8px] font-mono tracking-wide opacity-80">Score &ge; 1000 in Cyber Tetris</p>
                </div>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center space-x-2.5 transition-all ${
                tictactoeRecord.wins >= 1 
                  ? 'bg-emerald-950/20 border-emerald-500/35 text-emerald-400' 
                  : 'bg-neutral-900/20 border-white/5 text-textMuted'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] ${
                  tictactoeRecord.wins >= 1 ? 'bg-emerald-500/20 shadow-glow' : 'bg-neutral-950 border border-white/5'
                }`}>🧠</div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-[10px] font-bold truncate">Minimax Conqueror</h5>
                  <p className="text-[8px] font-mono tracking-wide opacity-80">Beat the unbeatable AI</p>
                </div>
              </div>
            </div>
          </div>
          <span className="text-[8px] font-mono text-textMuted text-center uppercase mt-3">SYSTEM CRT STABLE // SECURE CRYPTO SHIELD</span>
        </div>

        {/* PANEL B: Center Arcade Bezel CRT Console (Center Columns) */}
        <div className="xl:col-span-2 flex items-center justify-center bg-neutral-950 border border-white/5 p-6 rounded-2xl shadow-2xl relative overflow-hidden h-[450px] xl:h-[480px]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/3 via-transparent to-black/30 pointer-events-none" />
          {/* Neon cabinet outline */}
          <div className="absolute inset-2 border border-accentPrimary/20 rounded-xl pointer-events-none select-none shadow-glow-accent" />
          
          <div className="relative z-10 w-full flex items-center justify-center">
            {activeGame === 'tictactoe' && <TicTacToe record={tictactoeRecord} setRecord={setTictactoeRecord} />}
            {activeGame === 'flappy' && <FlappyBird highScore={flappyHighScore} setHighScore={setFlappyHighScore} />}
            {activeGame === 'tetris' && <Tetris highScore={tetrisHighScore} setHighScore={setTetrisHighScore} nextTetromino={nextTetromino} setNextTetromino={setNextTetromino} />}
          </div>
        </div>

        {/* PANEL C: Controller Deck & Next Blocks (Right Column) */}
        <div className="p-5 rounded-2xl bg-neutral-950/80 border border-white/5 flex flex-col justify-between shadow-2xl relative overflow-hidden xl:col-span-1 select-none h-[420px] xl:h-auto">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-accentPrimary/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="space-y-4">
            <div className="pb-3.5 border-b border-white/5 flex items-center space-x-2">
              <FaGamepad className="text-accentPrimary text-base animate-pulse" />
              <h4 className="text-xs font-mono font-extrabold uppercase tracking-widest text-textPrimary">Arcade Controller</h4>
            </div>

            {/* Next Piece Tetris Box */}
            {activeGame === 'tetris' && (
              <div className="bg-neutral-900/40 p-4 rounded-xl border border-white/5 flex flex-col items-center space-y-2 select-none">
                <span className="text-[10px] font-mono text-accentSecondary uppercase tracking-widest font-extrabold">Next Tetromino</span>
                <div className="w-24 h-16 bg-[#060608] rounded-lg border border-white/5 flex items-center justify-center">
                  <NextPiecePreview shapeId={nextTetromino} />
                </div>
              </div>
            )}

            {/* Gaming Tips Deck */}
            <div className="space-y-3 p-3.5 rounded-xl bg-neutral-900/40 border border-white/5 text-xs text-textSecondary font-mono leading-relaxed select-none">
              <span className="text-[10px] font-bold text-accentSecondary uppercase tracking-widest">Active Keys Map</span>
              {activeGame === 'tictactoe' && (
                <p className="text-[11px] leading-loose text-textMuted">Click to cross ('X'). Play against our unbeatable Minimax solver tree!</p>
              )}
              {activeGame === 'flappy' && (
                <div className="space-y-1.5 text-[11px] text-textMuted">
                  <p>&bull; <strong className="text-white">Canvas Tap / Click</strong>: Thrust Ship</p>
                  <p>&bull; <strong className="text-white">Spacebar Press</strong>: Thrust Ship</p>
                  <p className="text-[10px] text-accentSecondary mt-2">💡 Combusts blue propulsion particles from spaceships engine on each click!</p>
                </div>
              )}
              {activeGame === 'tetris' && (
                <div className="space-y-1.5 text-[11px] text-textMuted">
                  <p>&bull; <strong className="text-white">← / → Arrow Keys</strong>: Move Piece</p>
                  <p>&bull; <strong className="text-white">↑ Arrow Key</strong>: Rotate Block</p>
                  <p>&bull; <strong className="text-white">↓ Arrow Key</strong>: Drop Fast</p>
                  <p className="text-[10px] text-accentSecondary mt-2">💡 Standard Ghost landing silhouettes display exactly where blocks lock!</p>
                </div>
              )}
            </div>
          </div>


        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------
// TETRIS NEXT PIECE GRAPHICAL PREVIEW
// ----------------------------------------------------
function NextPiecePreview({ shapeId }) {
  const canvasRef = useRef(null);

  const SHAPES = [
    [],
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[0, 1, 1], [1, 1, 0]], // S
    [[1, 1, 0], [0, 1, 1]], // Z
    [[1, 0, 0], [1, 1, 1]], // J
    [[0, 0, 1], [1, 1, 1]]  // L
  ];

  const COLORS = [
    '#000000',
    '#00ffcc', '#facc15', '#c084fc', '#4ade80', '#f87171', '#3b82f6', '#fb923c'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const matrix = SHAPES[shapeId];
    if (!matrix || matrix.length === 0) return;

    const size = 12; // Grid scale
    const color = COLORS[shapeId];
    const nRows = matrix.length;
    const nCols = matrix[0].length;

    const startX = (canvas.width - nCols * size) / 2;
    const startY = (canvas.height - nRows * size) / 2;

    ctx.fillStyle = color;
    for (let r = 0; r < nRows; r++) {
      for (let c = 0; c < nCols; c++) {
        if (matrix[r][c] !== 0) {
          ctx.fillRect(startX + c * size + 1, startY + r * size + 1, size - 2, size - 2);
          ctx.strokeStyle = 'rgba(255,255,255,0.2)';
          ctx.strokeRect(startX + c * size + 1, startY + r * size + 1, size - 2, size - 2);
        }
      }
    }
  }, [shapeId]);

  return <canvas ref={canvasRef} width={80} height={48} className="block" />;
}

// ----------------------------------------------------
// 2. UNBEATABLE TIC-TAC-TOE VS MINIMAX AI
// ----------------------------------------------------
function TicTacToe({ record, setRecord }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  const checkWinner = (grid) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]            
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        return { winner: grid[a], line: lines[i] };
      }
    }
    if (grid.every(cell => cell !== null)) return { winner: 'Draw', line: [] };
    return null;
  };

  // Minimax Search Algorithm to make the AI an expert opponent
  const minimax = (grid, depth, isMax) => {
    const score = evaluateBoard(grid);

    // Terminal leaf points evaluations
    if (score === 10) return score - depth;
    if (score === -10) return score + depth;
    if (grid.every(cell => cell !== null)) return 0;

    if (isMax) {
      let best = -1000;
      for (let i = 0; i < 9; i++) {
        if (grid[i] === null) {
          grid[i] = 'O'; // AI
          best = Math.max(best, minimax(grid, depth + 1, false));
          grid[i] = null; // Backtrack
        }
      }
      return best;
    } else {
      let best = 1000;
      for (let i = 0; i < 9; i++) {
        if (grid[i] === null) {
          grid[i] = 'X'; // Human
          best = Math.min(best, minimax(grid, depth + 1, true));
          grid[i] = null;
        }
      }
      return best;
    }
  };

  const evaluateBoard = (grid) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]            
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        if (grid[a] === 'O') return 10; // AI wins
        if (grid[a] === 'X') return -10; // Human wins
      }
    }
    return 0;
  };

  const findBestMove = (grid) => {
    let bestVal = -1000;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (grid[i] === null) {
        grid[i] = 'O';
        const moveVal = minimax(grid, 0, false);
        grid[i] = null;

        if (moveVal > bestVal) {
          bestVal = moveVal;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const handleCellClick = (idx) => {
    if (board[idx] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[idx] = 'X';
    setBoard(newBoard);

    const winResult = checkWinner(newBoard);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.line);
      updateRecord(winResult.winner);
      return;
    }

    setIsPlayerTurn(false);
  };

  useEffect(() => {
    if (isPlayerTurn || winner) return;

    const timer = setTimeout(() => {
      const bestIdx = findBestMove([...board]);
      if (bestIdx === -1) return;

      const newBoard = [...board];
      newBoard[bestIdx] = 'O';
      setBoard(newBoard);

      const winResult = checkWinner(newBoard);
      if (winResult) {
        setWinner(winResult.winner);
        setWinningLine(winResult.line);
        updateRecord(winResult.winner);
      } else {
        setIsPlayerTurn(true);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [board, isPlayerTurn, winner]);

  const updateRecord = (outcome) => {
    setRecord(prev => {
      if (outcome === 'X') return { ...prev, wins: prev.wins + 1 };
      if (outcome === 'O') return { ...prev, losses: prev.losses + 1 };
      return { ...prev, draws: prev.draws + 1 };
    });
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setWinningLine([]);
  };

  return (
    <div className="flex flex-col items-center space-y-4 max-w-sm w-[350px] select-none p-5 rounded-2xl bg-neutral-950/90 border border-white/5 shadow-2xl h-[390px] justify-between relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-accent-gradient" />
      
      <div className="text-center select-none">
        <h4 className="text-[10px] font-mono text-textMuted uppercase tracking-widest">MINIMAX ADVANCED AI</h4>
        <p className="text-sm font-extrabold text-textPrimary mt-1.5 h-6">
          {winner 
            ? winner === 'Draw' ? "🤝 Draw Game!" : `🎉 ${winner === 'X' ? 'You beat the tree!' : 'AI blocked you!'}`
            : isPlayerTurn ? "Your turn ('X')" : "AI searching paths..."}
        </p>
      </div>

      {/* 3x3 Grid board */}
      <div className="grid grid-cols-3 gap-2.5 w-60 h-60 relative select-none">
        {board.map((cell, idx) => {
          const isWinningCell = winningLine.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleCellClick(idx)}
              className={`rounded-2xl border-2 transition-all font-display text-4xl font-extrabold flex items-center justify-center select-none ${
                cell === 'X' ? 'text-accentSecondary shadow-glow-text' : 'text-rose-500 shadow-glow-text'
              } ${
                isWinningCell 
                  ? 'bg-emerald-950/80 border-emerald-400 shadow-glow' 
                  : 'bg-neutral-900/60 border-white/5 hover:border-accentPrimary hover:bg-neutral-800'
              }`}
            >
              {cell}
            </button>
          );
        })}

        {/* Laser line effect for winning strike */}
        {winner && winner !== 'Draw' && winningLine.length === 3 && (
          <div className="absolute inset-0 pointer-events-none z-10" />
        )}
      </div>

      <button
        onClick={resetGame}
        className="px-4 py-2 rounded-lg bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors uppercase tracking-wider select-none"
      >
        <FaRedo className="text-[10px]" />
        <span>Restart Grid</span>
      </button>
    </div>
  );
}

// ----------------------------------------------------
// 3. FLAPPY SPACESHIP WITH PARTICLE ENGINE & TRAILS
// ----------------------------------------------------
function FlappyBird({ highScore, setHighScore }) {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const stateRef = useRef({
    bird: { y: 190, vy: 0, gravity: 0.22, jump: -5.0, radius: 10 },
    pipes: [],
    particles: [], // Dynamic vectors combustion particles
    trail: [],     // Historical spaceship coordinate array
    frame: 0,
    gameOver: false
  });

  const handleJump = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const state = stateRef.current;
    
    if (state.gameOver) {
      resetGame();
      return;
    }
    
    if (!isPlaying) {
      setIsPlaying(true);
      state.bird.vy = state.bird.jump;
      spawnParticles(70, state.bird.y, 10); // Combust particles instantly
      return;
    }
    
    state.bird.vy = state.bird.jump;
    spawnParticles(70, state.bird.y, 8); // Spawn burst of thrust flames!
  };

  const spawnParticles = (x, y, count) => {
    const state = stateRef.current;
    for (let i = 0; i < count; i++) {
      state.particles.push({
        x: x - 5,
        y: y + (Math.random() * 8 - 4),
        vx: -(Math.random() * 2.5 + 1.5), // Combustion sparks fly backwards!
        vy: Math.random() * 2 - 1,
        size: Math.random() * 2.5 + 1.5,
        life: 1.0,
        decay: Math.random() * 0.05 + 0.03,
        color: Math.random() > 0.4 ? '#00ffcc' : '#fb923c' // Cyan/Orange flames
      });
    }
  };

  // Keyboard space binding
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver]);

  // Main high-fidelity Canvas game loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const draw = () => {
      const state = stateRef.current;
      const b = state.bird;

      // 1. Draw Starry Space background with CRT Scanline gradient
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      for (let i = 0; i < canvas.width; i += 40) {
        for (let j = 0; j < canvas.height; j += 40) {
          ctx.fillRect(i + ((state.frame / 2) % 40), j, 1.5, 1.5);
        }
      }

      // 2. Physics checks
      if (isPlaying && !state.gameOver) {
        b.vy += b.gravity;
        b.y += b.vy;
        state.frame++;

        // Append to trail coordinate history for motion trail blur
        state.trail.push({ x: 70, y: b.y });
        if (state.trail.length > 8) {
          state.trail.shift();
        }

        // Space thruster ambient smoke particle drift
        if (state.frame % 3 === 0) {
          state.particles.push({
            x: 65,
            y: b.y,
            vx: -1.2,
            vy: Math.random() * 0.8 - 0.4,
            size: Math.random() * 1.5 + 1.0,
            life: 0.8,
            decay: 0.04,
            color: 'rgba(0, 255, 204, 0.3)'
          });
        }

        // Floor ceiling boundaries
        if (b.y + b.radius >= canvas.height) {
          b.y = canvas.height - b.radius;
          state.gameOver = true;
          setGameOver(true);
        }
        if (b.y - b.radius <= 0) {
          b.y = b.radius;
          b.vy = 0;
        }

        // Spawn Pipes (increased spacing to 125 frames for excellent playable experience)
        if (state.frame % 120 === 0) {
          const gap = 125;
          const minHeight = 45;
          const maxHeight = canvas.height - gap - minHeight;
          const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
          
          state.pipes.push({
            x: canvas.width,
            topHeight,
            bottomHeight: canvas.height - topHeight - gap,
            width: 52,
            passed: false
          });
        }

        // Update Pipes
        state.pipes.forEach((p) => {
          p.x -= 2.0; 

          // Spaceship collision checks
          const starX = 70;
          if (starX + 12 > p.x && starX - 12 < p.x + p.width) {
            if (b.y - 7 < p.topHeight || b.y + 7 > canvas.height - p.bottomHeight) {
              state.gameOver = true;
              setGameOver(true);
            }
          }

          // Score check
          if (!p.passed && p.x + p.width < starX) {
            p.passed = true;
            setScore(s => {
              const newScore = s + 1;
              setHighScore(h => Math.max(h, newScore));
              return newScore;
            });
          }
        });

        // Filter offscreen pipes
        state.pipes = state.pipes.filter(p => p.x + p.width > 0);
      }

      // 3. Draw Pipes (futuristic double-line glowing vector bars)
      state.pipes.forEach((p) => {
        // Gradient pipes filling
        const gradTop = ctx.createLinearGradient(p.x, 0, p.x + p.width, 0);
        gradTop.addColorStop(0, '#312e81');
        gradTop.addColorStop(0.5, '#4f46e5');
        gradTop.addColorStop(1, '#1e1b4b');
        
        ctx.fillStyle = gradTop;
        ctx.fillRect(p.x, 0, p.width, p.topHeight);
        ctx.strokeStyle = '#818cf8';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(p.x, 0, p.width, p.topHeight);

        const gradBottom = ctx.createLinearGradient(p.x, canvas.height - p.bottomHeight, p.x + p.width, canvas.height);
        gradBottom.addColorStop(0, '#312e81');
        gradBottom.addColorStop(0.5, '#4f46e5');
        gradBottom.addColorStop(1, '#1e1b4b');

        ctx.fillStyle = gradBottom;
        ctx.fillRect(p.x, canvas.height - p.bottomHeight, p.width, p.bottomHeight);
        ctx.strokeRect(p.x, canvas.height - p.bottomHeight, p.width, p.bottomHeight);
      });

      // 4. Update and Draw Vector Particles
      state.particles.forEach((part, idx) => {
        part.x += part.vx;
        part.y += part.vy;
        part.life -= part.decay;

        if (part.life <= 0) return;

        ctx.beginPath();
        ctx.arc(part.x, part.y, part.size * part.life, 0, Math.PI * 2);
        ctx.fillStyle = part.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = part.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.closePath();
      });
      state.particles = state.particles.filter(part => part.life > 0);

      // 5. Draw Motion trail history blur lines
      if (isPlaying && !state.gameOver && state.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(state.trail[0].x, state.trail[0].y);
        for (let i = 1; i < state.trail.length; i++) {
          ctx.lineTo(state.trail[i].x, state.trail[i].y);
        }
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.25)';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
      }

      // 6. Draw High-Fidelity Cyan Spaceship Vector Sprite
      const starX = 70;
      ctx.save();
      ctx.translate(starX, b.y);
      
      // Rotate ship slightly based on velocity
      const angle = Math.max(-0.4, Math.min(0.4, b.vy * 0.08));
      ctx.rotate(angle);

      // Draw Spaceship Body
      ctx.beginPath();
      ctx.moveTo(12, 0); // nose cone
      ctx.lineTo(-6, -8); // left wing tip
      ctx.lineTo(-2, 0);  // engine core
      ctx.lineTo(-6, 8);  // right wing tip
      ctx.closePath();

      const shipGrad = ctx.createLinearGradient(-6, 0, 12, 0);
      shipGrad.addColorStop(0, '#10b981');
      shipGrad.addColorStop(1, '#00ffcc');
      ctx.fillStyle = shipGrad;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#00ffcc';
      ctx.fill();
      
      // Draw wing border lines
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Pulsing orange flame engine thrusters if jumping
      if (b.vy < 0) {
        ctx.beginPath();
        ctx.moveTo(-3, -2);
        ctx.lineTo(-12 - (Math.random() * 8), 0);
        ctx.lineTo(-3, 2);
        ctx.closePath();
        ctx.fillStyle = '#fb923c';
        ctx.shadowColor = '#fb923c';
        ctx.fill();
      }
      
      ctx.restore();
      ctx.shadowBlur = 0; // reset

      // Screen Overlays
      if (!isPlaying) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 16px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('CYBER SPACESHIP FLIGHT', canvas.width / 2, canvas.height / 2 - 30);

        ctx.fillStyle = '#ffffff';
        ctx.font = '11px Courier New';
        ctx.fillText('CLICK HERE or SPACEBAR to Fire Thrust', canvas.width / 2, canvas.height / 2 + 10);
      } else if (state.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 20px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('CRITICAL COLLISION', canvas.width / 2, canvas.height / 2 - 25);

        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Courier New';
        ctx.fillText(`Score: ${score} | High: ${highScore}`, canvas.width / 2, canvas.height / 2 + 10);
        ctx.font = '10px Courier New';
        ctx.fillText('Tap Canvas or SPACEBAR to restart', canvas.width / 2, canvas.height / 2 + 35);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, gameOver, score]);

  const resetGame = () => {
    stateRef.current = {
      bird: { y: 190, vy: -5.0, gravity: 0.22, jump: -5.0, radius: 10 },
      pipes: [],
      particles: [],
      trail: [],
      frame: 0,
      gameOver: false
    };
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center space-y-3 select-none">
      <div className="flex justify-between w-[350px] text-xs font-mono font-bold text-textSecondary px-2 select-none">
        <span>SCORE: {score}</span>
        <span>HIGH: {highScore}</span>
      </div>

      <div 
        onMouseDown={handleJump}
        className="relative border-2 border-accentPrimary/35 rounded-2xl overflow-hidden shadow-2xl cursor-pointer bg-neutral-950 hover:border-accentPrimary transition-colors duration-300 select-none"
      >
        <canvas 
          ref={canvasRef} 
          width={350} 
          height={330} 
          className="block select-none"
        />
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. RETRO TETRIS WITH GHOST PREJECTIONS
// ----------------------------------------------------
function Tetris({ highScore, setHighScore, nextTetromino, setNextTetromino }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const SHAPES = [
    [],
    [[1, 1, 1, 1]], 
    [[1, 1], [1, 1]], 
    [[0, 1, 0], [1, 1, 1]], 
    [[0, 1, 1], [1, 1, 0]], 
    [[1, 1, 0], [0, 1, 1]], 
    [[1, 0, 0], [1, 1, 1]], 
    [[0, 0, 1], [1, 1, 1]]  
  ];

  const COLORS = [
    '#000000',
    '#00ffcc', '#facc15', '#c084fc', '#4ade80', '#f87171', '#3b82f6', '#fb923c'
  ];

  const stateRef = useRef({
    board: Array(20).fill(null).map(() => Array(10).fill(0)),
    piece: { x: 3, y: 0, matrix: SHAPES[3], colorId: 3 },
    tickCounter: 0,
    speed: 32, 
    gameOver: false,
    nextPieceId: Math.floor(Math.random() * 7) + 1
  });

  const rotateMatrix = (matrix) => {
    const N = matrix.length;
    const M = matrix[0].length;
    const rotated = Array(M).fill(null).map(() => Array(N).fill(0));
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < M; c++) {
        rotated[c][N - 1 - r] = matrix[r][c];
      }
    }
    return rotated;
  };

  const checkCollision = (board, piece, offsetX = 0, offsetY = 0, matrix = piece.matrix) => {
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c] !== 0) {
          const targetX = piece.x + c + offsetX;
          const targetY = piece.y + r + offsetY;

          if (targetX < 0 || targetX >= 10 || targetY >= 20) {
            return true;
          }
          if (targetY >= 0 && board[targetY][targetX] !== 0) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Calculates landing row for ghost outline piece projection
  const getGhostY = () => {
    const state = stateRef.current;
    let offset = 0;
    while (!checkCollision(state.board, state.piece, 0, offset + 1)) {
      offset++;
    }
    return state.piece.y + offset;
  };

  const lockPiece = () => {
    const state = stateRef.current;
    const p = state.piece;

    for (let r = 0; r < p.matrix.length; r++) {
      for (let c = 0; c < p.matrix[r].length; c++) {
        if (p.matrix[r][c] !== 0) {
          if (p.y + r >= 0) {
            state.board[p.y + r][p.x + c] = p.colorId;
          }
        }
      }
    }

    let linesCleared = 0;
    state.board = state.board.filter(row => {
      const isFull = row.every(cell => cell !== 0);
      if (isFull) linesCleared++;
      return !isFull;
    });

    while (state.board.length < 20) {
      state.board.unshift(Array(10).fill(0));
    }

    if (linesCleared > 0) {
      setScore(s => {
        const newScore = s + linesCleared * 100;
        setHighScore(h => Math.max(h, newScore));
        return newScore;
      });
    }

    // Spawn block and prepare next tetromino
    spawnPiece();
  };

  const spawnPiece = () => {
    const state = stateRef.current;
    const currentId = state.nextPieceId;
    
    // Spawn the previously locked "next" piece
    state.piece = {
      x: 3,
      y: -1,
      matrix: SHAPES[currentId],
      colorId: currentId
    };

    // Roll next block random id
    const rollNext = Math.floor(Math.random() * 7) + 1;
    state.nextPieceId = rollNext;
    setNextTetromino(rollNext);

    if (checkCollision(state.board, state.piece)) {
      state.gameOver = true;
      setGameOver(true);
    }
  };

  const moveLeft = () => {
    const state = stateRef.current;
    if (!checkCollision(state.board, state.piece, -1, 0)) {
      state.piece.x -= 1;
    }
  };

  const moveRight = () => {
    const state = stateRef.current;
    if (!checkCollision(state.board, state.piece, 1, 0)) {
      state.piece.x += 1;
    }
  };

  const rotate = () => {
    const state = stateRef.current;
    const p = state.piece;
    const rotated = rotateMatrix(p.matrix);
    
    if (!checkCollision(state.board, p, 0, 0, rotated)) {
      p.matrix = rotated;
    } else if (!checkCollision(state.board, p, -1, 0, rotated)) {
      p.matrix = rotated;
      p.x -= 1;
    } else if (!checkCollision(state.board, p, 1, 0, rotated)) {
      p.matrix = rotated;
      p.x += 1;
    }
  };

  const drop = () => {
    const state = stateRef.current;
    if (!checkCollision(state.board, state.piece, 0, 1)) {
      state.piece.y += 1;
    } else {
      lockPiece();
    }
  };

  // Keyboard binding controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying || stateRef.current.gameOver) return;

      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        moveLeft();
      }
      if (e.code === 'ArrowRight') {
        e.preventDefault();
        moveRight();
      }
      if (e.code === 'ArrowDown') {
        e.preventDefault();
        drop();
      }
      if (e.code === 'ArrowUp') {
        e.preventDefault();
        rotate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const draw = () => {
      const state = stateRef.current;
      
      // Cyber arena fill
      ctx.fillStyle = '#040406';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const blockW = canvas.width / 10;
      const blockH = canvas.height / 20;

      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      for (let x = 0; x <= 10; x++) {
        ctx.beginPath();
        ctx.moveTo(x * blockW, 0);
        ctx.lineTo(x * blockW, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= 20; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * blockH);
        ctx.lineTo(canvas.width, y * blockH);
        ctx.stroke();
      }

      if (isPlaying && !state.gameOver) {
        state.tickCounter++;
        if (state.tickCounter >= state.speed) {
          drop();
          state.tickCounter = 0;
        }
      }

      // Draw Locked blocks
      for (let r = 0; r < 20; r++) {
        for (let c = 0; c < 10; c++) {
          const val = state.board[r][c];
          if (val !== 0) {
            ctx.fillStyle = COLORS[val];
            ctx.fillRect(c * blockW + 1, r * blockH + 1, blockW - 2, blockH - 2);
            ctx.shadowBlur = 4;
            ctx.shadowColor = COLORS[val];
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.strokeRect(c * blockW + 1, r * blockH + 1, blockW - 2, blockH - 2);
            ctx.shadowBlur = 0;
          }
        }
      }

      // Draw Ghost Piece Projection Landing Outline
      if (isPlaying && !state.gameOver) {
        const p = state.piece;
        const ghostY = getGhostY();
        
        // Render outline coordinates
        for (let r = 0; r < p.matrix.length; r++) {
          for (let c = 0; c < p.matrix[r].length; c++) {
            if (p.matrix[r][c] !== 0) {
              const drawX = (p.x + c) * blockW;
              const drawY = (ghostY + r) * blockH;

              if (drawY >= 0) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
                ctx.lineWidth = 1;
                ctx.strokeRect(drawX + 2, drawY + 2, blockW - 4, blockH - 4);
              }
            }
          }
        }
      }

      // Draw Active Piece
      if (isPlaying && !state.gameOver) {
        const p = state.piece;
        for (let r = 0; r < p.matrix.length; r++) {
          for (let c = 0; c < p.matrix[r].length; c++) {
            if (p.matrix[r][c] !== 0) {
              const drawX = (p.x + c) * blockW;
              const drawY = (p.y + r) * blockH;

              if (drawY >= 0) {
                ctx.fillStyle = COLORS[p.colorId];
                ctx.fillRect(drawX + 1, drawY + 1, blockW - 2, blockH - 2);
                ctx.shadowBlur = 8;
                ctx.shadowColor = COLORS[p.colorId];
                ctx.strokeStyle = '#ffffff';
                ctx.strokeRect(drawX + 1, drawY + 1, blockW - 2, blockH - 2);
                ctx.shadowBlur = 0;
              }
            }
          }
        }
      }

      // Overlays
      if (!isPlaying) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 14px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('CYBER TETRIS', canvas.width / 2, canvas.height / 2 - 20);

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Courier New';
        ctx.fillText('Press START to play', canvas.width / 2, canvas.height / 2 + 10);
      } else if (state.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 16px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Courier New';
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText('Press START to restart', canvas.width / 2, canvas.height / 2 + 35);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, gameOver, score]);

  const resetGame = () => {
    const firstPiece = Math.floor(Math.random() * 7) + 1;
    const secondPiece = Math.floor(Math.random() * 7) + 1;

    stateRef.current = {
      board: Array(20).fill(null).map(() => Array(10).fill(0)),
      piece: { x: 3, y: 0, matrix: SHAPES[firstPiece], colorId: firstPiece },
      tickCounter: 0,
      speed: 32,
      gameOver: false,
      nextPieceId: secondPiece
    };
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setNextTetromino(secondPiece);
  };

  return (
    <div className="flex flex-col items-center space-y-3 select-none">
      <div className="flex justify-between w-[260px] text-xs font-mono font-bold text-textSecondary px-2">
        <span>SCORE: {score}</span>
        <button 
          onClick={resetGame} 
          className="px-3 py-0.5 rounded-lg bg-accentSecondary/10 border border-accentSecondary/20 text-accentSecondary hover:bg-accentSecondary/25 transition-colors font-mono uppercase tracking-widest text-[10px]"
        >
          {isPlaying ? 'RESTART' : 'START'}
        </button>
      </div>

      <div className="border-2 border-accentPrimary/35 rounded-2xl overflow-hidden bg-neutral-950 shadow-2xl">
        <canvas 
          ref={canvasRef} 
          width={260} 
          height={380} 
          className="block"
        />
      </div>
    </div>
  );
}
