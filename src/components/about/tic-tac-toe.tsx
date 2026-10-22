"use client";

import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "@/i18n/format";
import type { Messages } from "@/i18n/messages";

type Cell = "X" | "O" | null;
type Board = Cell[];

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winner(board: Board): Cell {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

/** Simple computer: win, block, centre, corner, side. */
function computerMove(board: Board): number {
  const free = board.flatMap((cell, i) => (cell ? [] : [i]));
  for (const player of ["O", "X"] as const) {
    for (const i of free) {
      const next = [...board];
      next[i] = player;
      if (winner(next) === player) return i;
    }
  }
  return [4, 0, 2, 6, 8, 1, 3, 5, 7].find((i) => free.includes(i)) ?? free[0]!;
}

export function TicTacToe({ m }: { m: Messages["about"]["bonus"] }) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));

  const result = winner(board);
  const full = board.every(Boolean);
  const over = Boolean(result) || full;
  const status = result === "X" ? m.win : result === "O" ? m.lose : full ? m.draw : m.yourTurn;

  const play = (index: number) => {
    if (over || board[index]) return;
    const next = [...board];
    next[index] = "X";
    if (!winner(next) && next.some((cell) => !cell)) next[computerMove(next)] = "O";
    setBoard(next);
  };

  return (
    <div className="flex flex-wrap items-start gap-8">
      <div role="group" aria-label={m.board} className="grid grid-cols-3 gap-1.5">
        {board.map((cell, index) => (
          <button
            key={index}
            type="button"
            onClick={() => play(index)}
            disabled={over || cell !== null}
            aria-label={format(m.cell, { n: index + 1, state: cell ?? m.empty })}
            className="grid size-16 place-items-center rounded-control border border-border-strong bg-surface font-mono text-2xl font-medium text-fg transition-colors enabled:hover:bg-frame disabled:cursor-default"
          >
            <span aria-hidden="true" className={cell === "O" ? "text-accent" : undefined}>
              {cell}
            </span>
          </button>
        ))}
      </div>
      <div className="grid gap-4">
        <p role="status" className="font-medium">
          {status}
        </p>
        <Button variant="secondary" onClick={() => setBoard(Array(9).fill(null))}>
          <RotateCcw size={18} strokeWidth={1.75} aria-hidden="true" />
          {m.reset}
        </Button>
      </div>
    </div>
  );
}
