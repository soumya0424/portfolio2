'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, type Project } from '@/lib/content';
import { MindMap } from './MindMap';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { cn } from '@/lib/cn';

/**
 * Projects: split screen. Left = pinned project cards (floating, interactive).
 * Right = a live relationship mind-map that reorganizes / lights up around the
 * hovered project. "View All Projects" opens the virtual ProjectExplorer.
 */
export function ProjectsSection({ onOpenExplorer }: { onOpenExplorer: () => void }) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const pinned = PROJECTS.filter((p) => p.pinned);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-ds-6 py-ds-24">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-ds-2 font-mono text-small uppercase tracking-[0.3em] text-accent-text"
      >
        // projects
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-ds-3 text-h2 font-semibold text-text-primary"
      >
        Things I&apos;ve built
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-ds-12 max-w-prose text-body text-text-secondary"
      >
        A few systems I&apos;ve taken from idea to working code. Hover one to see the domains it
        connects.
      </motion.p>

      <div className="grid gap-ds-8 lg:grid-cols-2">
        {/* Left: pinned project cards */}
        <div className="flex flex-col gap-ds-4">
          {pinned.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(p)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(p)}
              onBlur={() => setHovered(null)}
              onClick={onOpenExplorer}
              whileHover={{ x: 6 }}
              className={cn(
                'glass-interactive group p-ds-6 text-left',
                hovered?.id === p.id && 'border-accent shadow-glow',
              )}
            >
              <div className="flex items-baseline justify-between gap-ds-4">
                <h3 className="font-mono text-h3 text-text-primary">{p.name}</h3>
                <span className="shrink-0 font-mono text-small text-text-tertiary">{p.domain}</span>
              </div>
              <p className="mt-ds-2 text-body text-text-secondary">{p.tagline}</p>
              <div className="mt-ds-4 flex flex-wrap gap-ds-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-[var(--glass-border)] px-ds-2 py-ds-1 font-mono text-small text-text-tertiary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}

          <div className="mt-ds-2">
            <MagneticButton onClick={onOpenExplorer} ariaLabel="View all projects">
              <span className="text-accent-text">$</span> view_all_projects
            </MagneticButton>
          </div>
        </div>

        {/* Right: free-floating hub-and-spoke "solar system" (no box) */}
        <div className="relative">
          <div className="sticky top-ds-24">
            <MindMap project={hovered} />
            <p className="mt-ds-2 text-center font-mono text-small text-text-tertiary">
              {hovered
                ? `${hovered.name} → ${hovered.nodes.length} connected domains`
                : 'hover a project to light up its connections'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
