'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TerminalContent } from './TerminalContent';
import { PixelAvatar } from '@/components/about/PixelAvatar';

/**
 * Hero: a terminal window. The pixel-art logo sits on the left; the ASCII name
 * and `>`-prefixed about_me / interests paragraphs sit on the right. The window
 * is wide (not tall) so it fits the landing viewport. On scroll it drifts up
 * and fades so the next section emerges from underneath.
 */
export function HeroTerminal() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center px-ds-4 py-ds-24"
    >
      <motion.div
        style={{ y, opacity, scale }}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass w-full max-w-4xl overflow-hidden"
      >
        {/* Window header */}
        <div className="flex items-center gap-ds-2 border-b border-[var(--glass-border)] bg-[var(--bg-elevated)] px-ds-4 py-ds-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-ds-3 font-mono text-small text-text-secondary">
            soumya@portfolio — zsh
          </span>
        </div>

        {/* Body: pixel logo + ASCII name + paragraphs */}
        <div className="px-ds-6 py-ds-8 md:px-ds-8">
          <TerminalContent logo={<PixelAvatar />} />
        </div>
      </motion.div>
    </section>
  );
}
