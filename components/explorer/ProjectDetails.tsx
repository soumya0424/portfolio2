'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/lib/content';
import { MagneticButton } from '@/components/ui/MagneticButton';

/**
 * Project details panel — developer-documentation meets Apple product page.
 * Animates into view inside the explorer when a folder is opened.
 */
export function ProjectDetails({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 16, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.99 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="h-full overflow-y-auto p-ds-6 md:p-ds-8"
    >
      <button
        type="button"
        onClick={onBack}
        className="mb-ds-6 font-mono text-small text-text-tertiary transition-colors hover:text-accent-text"
      >
        ← back to explorer
      </button>

      <div className="flex items-center gap-ds-4">
        <FolderGlyph />
        <div>
          <h3 className="text-h2 font-semibold text-text-primary">{project.name}</h3>
          <p className="font-mono text-small text-accent-text">{project.domain}</p>
        </div>
      </div>

      <p className="mt-ds-6 max-w-prose text-body text-text-secondary">{project.overview}</p>

      <div className="mt-ds-8 grid gap-ds-8 md:grid-cols-2">
        <div>
          <h4 className="mb-ds-3 font-mono text-small uppercase tracking-[0.2em] text-text-tertiary">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-ds-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-[var(--glass-border)] px-ds-3 py-ds-1 font-mono text-small text-text-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-ds-3 font-mono text-small uppercase tracking-[0.2em] text-text-tertiary">
            Challenges
          </h4>
          <ul className="space-y-ds-2">
            {project.challenges.map((c) => (
              <li key={c} className="flex gap-ds-2 text-small text-text-secondary">
                <span className="text-accent-text">▹</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-ds-8">
        <h4 className="mb-ds-3 font-mono text-small uppercase tracking-[0.2em] text-text-tertiary">
          Outcomes
        </h4>
        <ul className="space-y-ds-2">
          {project.outcomes.map((o) => (
            <li key={o} className="flex gap-ds-2 text-small text-text-secondary">
              <span className="text-success">✓</span>
              {o}
            </li>
          ))}
        </ul>
      </div>

      {/* Screenshot placeholder strip */}
      <div className="mt-ds-8 grid grid-cols-3 gap-ds-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex aspect-video items-center justify-center rounded-md border border-[var(--glass-border)] bg-[var(--bg-elevated)] font-mono text-small text-text-tertiary"
          >
            {project.name.toLowerCase()}_{i + 1}.png
          </div>
        ))}
      </div>

      <div className="mt-ds-8">
        <MagneticButton href={project.repo} ariaLabel={`Open ${project.name} on GitHub`}>
          <span className="text-accent-text">↗</span> view_on_github
        </MagneticButton>
      </div>
    </motion.div>
  );
}

function FolderGlyph() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 6.5C3 5.7 3.7 5 4.5 5H9l2 2h8.5c.8 0 1.5.7 1.5 1.5V18c0 .8-.7 1.5-1.5 1.5h-15C3.7 19.5 3 18.8 3 18V6.5Z"
        fill="var(--accent-900)"
        stroke="var(--accent-text)"
        strokeWidth="0.8"
      />
    </svg>
  );
}
