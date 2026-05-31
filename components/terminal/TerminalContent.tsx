'use client';

import { motion } from 'framer-motion';
import { TERMINAL_BLOCKS } from '@/lib/content';
import { AsciiArt } from './AsciiArt';

/**
 * Hero terminal body. Left: pixel-art logo (passed in by the parent). Right:
 * ASCII name wordmark followed by `>`-prefixed paragraph blocks (about_me,
 * interests). Plain paragraphs — no key/value table, no bullet points.
 */
export function TerminalContent({ logo }: { logo: React.ReactNode }) {
  return (
    <div className="grid items-center gap-ds-8 md:grid-cols-[auto_1fr]">
      {/* Left: pixel-art logo */}
      <div className="flex justify-center md:justify-start">{logo}</div>

      {/* Right: ASCII name + paragraph blocks */}
      <div className="min-w-0 font-mono text-mono-base">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <AsciiArt />
        </motion.div>

        <div className="mt-ds-6 space-y-ds-6">
          {TERMINAL_BLOCKS.map((block, i) => (
            <motion.div
              key={block.cmd}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-ds-2 flex items-center gap-2">
                <span className="text-accent-text">&gt;</span>
                <span className="text-text-primary">{block.cmd}</span>
              </div>
              <p className="pl-ds-4 leading-relaxed text-text-secondary">{block.paragraph}</p>
            </motion.div>
          ))}

          {/* Live prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + TERMINAL_BLOCKS.length * 0.25 + 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="text-accent-text">&gt;</span>
            <span className="cursor-blink" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
