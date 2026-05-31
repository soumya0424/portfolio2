'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Opening loading sequence built from the supplied index.html "Matrix Dots
 * Loader" — the 2x4 clockwise pixel pulse, recolored to the deep cobalt accent.
 * Establishes the visual language, then dissolves smoothly into the page.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hold = reduced ? 350 : 1900;
    const timer = setTimeout(() => setVisible(false), hold);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-ds-8 bg-bg-base"
        >
          <div className="dots-loader" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="dot" />
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-mono text-small tracking-[0.3em] text-text-tertiary"
          >
            booting<span className="cursor-blink" />
          </motion.p>
          <span className="sr-only" role="status">
            Loading portfolio
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
