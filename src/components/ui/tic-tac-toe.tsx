"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { RotateCcw, Trophy, Users, Bot } from "lucide-react";

type Player = "X" | "O" | null;
type GameMode = "human" | "ai";

interface TicTacToeProps {
  className?: string;
}

export function TicTacToe({ className }: TicTacToeProps) {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [gameMode, setGameMode] = useState<GameMode>("human");
  const [winner, setWinner] = useState<Player | "tie" | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  const checkWinner = useCallback(
    (board: Player[]) => {
      for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return { winner: board[a], winningLine: combo };
        }
      }
      if (board.every((cell) => cell !== null)) {
        return { winner: "tie" as const, winningLine: [] };
      }
      return { winner: null, winningLine: [] };
    },
    [winningCombinations]
  );

  const minimax = useCallback(
    (board: Player[], depth: number, isMaximizing: boolean): number => {
      const result = checkWinner(board);

      if (result.winner === "O") return 1;
      if (result.winner === "X") return -1;
      if (result.winner === "tie") return 0;

      if (isMaximizing) {
        let maxEval = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = "O";
            const evaluation = minimax(board, depth + 1, false);
            board[i] = null;
            maxEval = Math.max(maxEval, evaluation);
          }
        }
        return maxEval;
      } else {
        let minEval = Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = "X";
            const evaluation = minimax(board, depth + 1, true);
            board[i] = null;
            minEval = Math.min(minEval, evaluation);
          }
        }
        return minEval;
      }
    },
    [checkWinner]
  );

  const getBestMove = useCallback(
    (board: Player[]): number => {
      let bestMove = -1;
      let bestValue = -Infinity;

      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "O";
          const moveValue = minimax(board, 0, false);
          board[i] = null;

          if (moveValue > bestValue) {
            bestValue = moveValue;
            bestMove = i;
          }
        }
      }
      return bestMove;
    },
    [minimax]
  );

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningLine(result.winningLine);
      if (result.winner === "tie") {
        setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
      } else {
        setScores((prev) => ({
          ...prev,
          [result.winner as "X" | "O"]: prev[result.winner as "X" | "O"] + 1,
        }));
      }
      return;
    }

    const nextPlayer = currentPlayer === "X" ? "O" : "X";
    setCurrentPlayer(nextPlayer);

    // AI move for single player mode
    if (gameMode === "ai" && nextPlayer === "O") {
      setTimeout(() => {
        const aiMove = getBestMove(newBoard);
        if (aiMove !== -1) {
          const aiBoard = [...newBoard];
          aiBoard[aiMove] = "O";
          setBoard(aiBoard);

          const aiResult = checkWinner(aiBoard);
          if (aiResult.winner) {
            setWinner(aiResult.winner);
            setWinningLine(aiResult.winningLine);
            if (aiResult.winner === "tie") {
              setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
            } else {
              setScores((prev) => ({
                ...prev,
                [aiResult.winner as "X" | "O"]:
                  prev[aiResult.winner as "X" | "O"] + 1,
              }));
            }
          } else {
            setCurrentPlayer("X");
          }
        }
      }, 500);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningLine([]);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, ties: 0 });
    resetGame();
  };

  const getCellVariants = (index: number) => {
    const isWinning = winningLine.includes(index);
    return {
      initial: { scale: 0.8, opacity: 0 },
      animate: {
        scale: 1,
        opacity: 1,
        backgroundColor: isWinning
          ? "rgba(6, 182, 212, 0.2)"
          : "rgba(255, 255, 255, 0.05)",
      },
      whileHover: winner
        ? {}
        : {
            scale: 1.05,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
      whileTap: { scale: 0.95 },
    };
  };

  return (
    <GlassCard className={`p-6 sm:p-8 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-6 h-6 text-cyan-400" />
            <h3 className="text-2xl font-bold text-white">
              TicTacToe Interactif
            </h3>
          </div>

          {/* Game Mode Toggle */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                setGameMode("human");
                resetGame();
              }}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2 ${
                gameMode === "human"
                  ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-400"
                  : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="text-sm">2 Joueurs</span>
            </button>
            <button
              onClick={() => {
                setGameMode("ai");
                resetGame();
              }}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2 ${
                gameMode === "ai"
                  ? "bg-purple-500/20 border-purple-400/50 text-purple-400"
                  : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span className="text-sm">vs IA</span>
            </button>
          </div>
        </div>

        {/* Game Status */}
        <div className="text-center">
          <AnimatePresence mode="wait">
            {winner ? (
              <motion.div
                key="winner"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="space-y-2"
              >
                {winner === "tie" ? (
                  <p className="text-xl text-yellow-400 font-semibold">
                    Match Nul ! 🤝
                  </p>
                ) : (
                  <p className="text-xl text-green-400 font-semibold">
                    Joueur {winner} gagne ! 🎉
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="current-player"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <p className="text-lg text-white/80">
                  Tour du joueur{" "}
                  <span
                    className={`font-bold ${
                      currentPlayer === "X"
                        ? "text-cyan-400"
                        : "text-purple-400"
                    }`}
                  >
                    {currentPlayer}
                  </span>
                  {gameMode === "ai" &&
                    currentPlayer === "O" &&
                    " (IA réfléchit...)"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-xs mx-auto">
          {board.map((cell, index) => (
            <motion.button
              key={index}
              variants={getCellVariants(index)}
              initial="initial"
              animate="animate"
              whileHover="whileHover"
              whileTap="whileTap"
              onClick={() => handleCellClick(index)}
              disabled={
                !!cell ||
                !!winner ||
                (gameMode === "ai" && currentPlayer === "O")
              }
              className="aspect-square bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-3xl sm:text-4xl font-bold transition-all duration-300 disabled:cursor-not-allowed backdrop-blur-sm"
            >
              <AnimatePresence>
                {cell && (
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={
                      cell === "X" ? "text-cyan-400" : "text-purple-400"
                    }
                  >
                    {cell}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        {/* Scores */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h4 className="text-center text-white/80 font-semibold mb-3">
            Scores
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-400">{scores.X}</div>
              <div className="text-sm text-white/60">Joueur X</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {scores.ties}
              </div>
              <div className="text-sm text-white/60">Nuls</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {scores.O}
              </div>
              <div className="text-sm text-white/60">
                {gameMode === "ai" ? "IA" : "Joueur O"}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/50 text-cyan-400 rounded-lg hover:from-cyan-500/30 hover:to-purple-600/30 transition-all duration-300 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Nouvelle partie</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetScores}
            className="px-4 py-2 bg-white/10 border border-white/20 text-white/70 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            <span className="text-sm">Reset scores</span>
          </motion.button>
        </div>
      </div>
    </GlassCard>
  );
}
