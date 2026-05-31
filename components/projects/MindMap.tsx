'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/lib/content';

/**
 * Star-topology relationship diagram, styled to read like a little solar
 * system against the space-like background — no surrounding box. A central
 * "Projects" node (the sun) is permanently connected to every domain node
 * (the planets), which are always visible. When a project card is hovered,
 * only that project's domains glow; each lights individually, connected to the
 * center, never to each other.
 */

const ALL_NODES: { id: string; label: string }[] = [
  { id: 'ai', label: 'AI' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'dl', label: 'Deep Learning' },
  { id: 'xai', label: 'Explainability' },
  { id: 'ds', label: 'Data Science' },
  { id: 'docker', label: 'Docker' },
  { id: 'backend', label: 'Backend' },
  { id: 'product', label: 'Product' },
];

export function MindMap({ project }: { project: Project | null }) {
  const lit = new Set(project?.nodes ?? []);

  const cx = 50;
  const cy = 50;
  const radius = 36;

  const placed = ALL_NODES.map((n, i) => {
    const angle = (-90 + (360 / ALL_NODES.length) * i) * (Math.PI / 180);
    return {
      ...n,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
      glow: lit.has(n.id),
    };
  });

  return (
    <div className="relative aspect-square w-full">
      <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        {/* Spokes — every node is permanently connected to the center */}
        {placed.map((n, i) => (
          <motion.line
            key={`spoke-${n.id}`}
            x1={cx}
            y1={cy}
            x2={n.x}
            y2={n.y}
            stroke={n.glow ? 'var(--accent-text)' : 'var(--glass-border)'}
            strokeWidth={n.glow ? 0.55 : 0.3}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            animate={{ opacity: n.glow ? 0.95 : 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            style={{ filter: n.glow ? 'drop-shadow(0 0 2px var(--accent-glow))' : 'none' }}
          />
        ))}

        {/* Domain nodes (planets) — always visible, glow on hover */}
        {placed.map((n, i) => (
          <g key={`node-${n.id}`}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={2.4}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              animate={{
                scale: n.glow ? 1.35 : 1,
                fill: n.glow ? 'var(--accent)' : 'var(--bg-surface)',
                stroke: n.glow ? 'var(--accent-text)' : 'var(--glass-border)',
                filter: n.glow ? 'drop-shadow(0 0 3px var(--accent-glow))' : 'none',
              }}
              strokeWidth={0.4}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            />
            <text
              x={n.x}
              y={n.y - 3.6}
              textAnchor="middle"
              className={n.glow ? 'fill-[var(--text-primary)]' : 'fill-[var(--text-tertiary)]'}
              style={{ fontSize: '2.5px' }}
              fontFamily="var(--font-mono)"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* Center "Projects" node (the sun) — always bold and larger */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={6.5}
          fill="var(--accent)"
          stroke="var(--accent-text)"
          strokeWidth={0.7}
          animate={{
            filter: project
              ? 'drop-shadow(0 0 7px var(--accent-glow))'
              : 'drop-shadow(0 0 3px var(--accent-glow))',
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        />
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          className="fill-[var(--text-primary)]"
          style={{ fontSize: '3px', fontWeight: 700 }}
          fontFamily="var(--font-mono)"
        >
          Projects
        </text>
      </svg>
    </div>
  );
}
