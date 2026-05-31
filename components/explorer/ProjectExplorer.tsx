'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS, type Project } from '@/lib/content';
import { ProjectDetails } from './ProjectDetails';

/**
 * Virtual project explorer — a macOS-Finder / file-system inspired overlay.
 * Folders are laid out in a 2x3 matrix; hover lifts + peeks the folder open,
 * click expands it into the ProjectDetails view with a spatial transition.
 * No page reload, no routing — pure overlay state.
 */
export function ProjectExplorer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selected, setSelected] = useState<Project | null>(null);

  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selected) setSelected(null);
        else onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, selected, onClose]);

  return (
    <AnimatePresence onExitComplete={() => setSelected(null)}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-ds-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Scrim */}
          <button
            type="button"
            aria-label="Close project explorer"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Window */}
          <motion.div
            initial={{ scale: 0.94, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative z-10 flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden"
          >
            {/* Title bar */}
            <div className="flex items-center gap-ds-2 border-b border-[var(--glass-border)] bg-[var(--bg-elevated)] px-ds-4 py-ds-3">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="h-3 w-3 rounded-full bg-[#ff5f57]"
              />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-ds-3 font-mono text-small text-text-tertiary">
                {selected ? `~/projects/${selected.id}` : '~/projects'}
              </span>
            </div>

            {/* Content */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {selected ? (
                  <ProjectDetails
                    key="details"
                    project={selected}
                    onBack={() => setSelected(null)}
                  />
                ) : (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid h-full grid-cols-2 gap-ds-6 overflow-y-auto p-ds-8 md:grid-cols-3"
                  >
                    {PROJECTS.map((p, i) => (
                      <FolderCard
                        key={p.id}
                        project={p}
                        index={i}
                        onOpen={() => setSelected(p)}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FolderCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="glass-interactive group flex flex-col items-center justify-center gap-ds-3 p-ds-6"
    >
      <FolderIcon />
      <span className="font-mono text-mono-base text-text-primary">{project.name}</span>
      <span className="text-center font-mono text-small text-text-tertiary opacity-0 transition-opacity duration-base group-hover:opacity-100">
        {project.tagline}
      </span>
    </motion.button>
  );
}

/** Pixel-art style folder icon with a lid that lifts on hover (peek-open). */
function FolderIcon() {
  return (
    <div className="relative h-16 w-20">
      {/* Back */}
      <div className="absolute inset-x-1 bottom-0 top-3 rounded-md border border-[var(--glass-border)] bg-[var(--accent-950)]" />
      {/* Peek content */}
      <div className="absolute inset-x-3 bottom-2 top-5 rounded-sm bg-[var(--accent-900)] opacity-0 transition-all duration-base group-hover:opacity-100" />
      {/* Lid */}
      <div
        className="absolute inset-x-0 bottom-0 top-5 origin-bottom rounded-md border border-[var(--glass-border)] bg-[var(--accent)] transition-transform duration-base group-hover:[transform:perspective(200px)_rotateX(-22deg)]"
        style={{ boxShadow: '0 0 18px var(--accent-glow)' }}
      />
      {/* Tab */}
      <div className="absolute left-2 top-3 h-3 w-8 rounded-t-md bg-[var(--accent)]" />
    </div>
  );
}
