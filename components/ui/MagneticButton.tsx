'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/cn';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
};

/**
 * Cursor-aware "magnetic" button with a subtle spring offset and liquid-glass
 * surface. Movement is disabled under prefers-reduced-motion.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  className,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 26 });
  const sy = useSpring(y, { stiffness: 260, damping: 26 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    const max = 12;
    x.set(Math.max(-max, Math.min(max, mx * 0.35)));
    y.set(Math.max(-max, Math.min(max, my * 0.35)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    'glass-interactive inline-flex items-center justify-center gap-ds-2',
    'px-ds-6 py-ds-3 font-mono text-mono-base text-text-primary',
    'cursor-pointer select-none',
    className,
  );

  const content = (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex items-center gap-ds-2">
      {children}
    </motion.span>
  );

  if (href) {
    const external = href.startsWith('http');
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        whileTap={{ scale: 0.97 }}
        className={classes}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.97 }}
      className={classes}
    >
      {content}
    </motion.button>
  );
}
