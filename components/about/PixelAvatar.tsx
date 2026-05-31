'use client';

import { motion } from 'framer-motion';

/**
 * A handcrafted pixel-art avatar rendered as an SVG grid — a calm, abstract
 * "builder at a terminal" motif in the accent palette. No external assets.
 */
const P = '#8fbcff'; // accent-text (bright)
const D = '#2f6fed'; // accent (bright)
const S = '#143a86'; // accent-900
const _ = null;

// 12x12 grid. Each cell is a color or null (transparent).
const GRID: (string | null)[][] = [
  [_, _, _, D, D, D, D, D, D, _, _, _],
  [_, _, D, S, S, S, S, S, S, D, _, _],
  [_, _, D, S, P, S, S, P, S, D, _, _],
  [_, _, D, S, S, S, S, S, S, D, _, _],
  [_, _, D, S, P, S, S, P, S, D, _, _],
  [_, _, D, S, S, P, P, S, S, D, _, _],
  [_, _, _, D, S, S, S, S, D, _, _, _],
  [_, _, _, _, D, D, D, D, _, _, _, _],
  [_, _, D, D, D, D, D, D, D, D, _, _],
  [_, D, P, D, D, D, D, D, D, P, D, _],
  [_, D, P, D, D, D, D, D, D, P, D, _],
  [_, D, D, _, _, _, _, _, _, D, D, _],
];

export function PixelAvatar() {
  const cell = 14;
  const size = GRID.length * cell;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center justify-center"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Pixel-art avatar of Soumya"
        style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 0 16px var(--accent-glow))' }}
      >
        {GRID.flatMap((row, y) =>
          row.map((c, x) =>
            c ? (
              <motion.rect
                key={`${x}-${y}`}
                x={x * cell}
                y={y * cell}
                width={cell}
                height={cell}
                fill={c}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + (x + y) * 0.012, duration: 0.3 }}
              />
            ) : null,
          ),
        )}
      </svg>
    </motion.div>
  );
}
