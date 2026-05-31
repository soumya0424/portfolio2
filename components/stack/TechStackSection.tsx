'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS, type Skill } from '@/lib/content';
import { cn } from '@/lib/cn';

/**
 * Tech stack as interactive pixel-art skill nodes wired like a lightweight
 * neural network. Hovering/focusing a node expands its detail card and lights
 * the connections from the input "layer" through to it.
 */

const GROUP_LABEL: Record<Skill['group'], string> = {
  language: 'Language',
  ml: 'AI / ML',
  tools: 'Tools',
  design: 'Design',
};

const GROUP_ORDER: Skill['group'][] = ['language', 'ml', 'tools', 'design'];

export function TechStackSection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="stack" className="relative mx-auto max-w-6xl px-ds-6 py-ds-24">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-ds-2 font-mono text-small uppercase tracking-[0.3em] text-accent-text"
      >
        // stack
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-ds-12 text-h2 font-semibold text-text-primary"
      >
        Tools I build with
      </motion.h2>

      <div className="grid gap-ds-8 md:grid-cols-4">
        {GROUP_ORDER.map((group, gi) => (
          <div key={group} className="flex flex-col gap-ds-4">
            <div className="flex items-center gap-ds-2">
              <span className="h-2 w-2 rounded-[1px] bg-accent-text" />
              <span className="font-mono text-small text-text-tertiary">
                {GROUP_LABEL[group]}
              </span>
            </div>

            {SKILLS.filter((s) => s.group === group).map((skill, i) => {
              const isActive = active === skill.id;
              return (
                <motion.button
                  key={skill.id}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: gi * 0.05 + i * 0.05, duration: 0.4 }}
                  onMouseEnter={() => setActive(skill.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(skill.id)}
                  onBlur={() => setActive(null)}
                  className={cn(
                    'glass-interactive group w-full p-ds-4 text-left',
                    isActive && 'border-accent shadow-glow',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-mono-base text-text-primary">
                      {skill.label}
                    </span>
                    <span className="font-mono text-small text-accent-text">
                      {skill.proficiency}%
                    </span>
                  </div>

                  {/* Proficiency bar */}
                  <div className="mt-ds-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-elevated)]">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>

                  {/* Expanding detail */}
                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-ds-3 text-small text-text-secondary">{skill.description}</p>
                    <p className="mt-ds-2 font-mono text-small text-text-tertiary">
                      → {skill.usage}
                    </p>
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      <p className="mt-ds-8 font-mono text-small text-text-tertiary">
        Hover a node to expand its role in the network.
      </p>
    </section>
  );
}
