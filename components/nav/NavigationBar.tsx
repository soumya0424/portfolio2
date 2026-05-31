'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { NAV_SECTIONS } from '@/lib/content';
import { cn } from '@/lib/cn';

/**
 * Floating glass navbar that hides on scroll-down and reveals on scroll-up.
 * Tracks the active section via IntersectionObserver and highlights it with
 * the single accent color.
 */
export function NavigationBar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string>('home');
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (y > prev && y > 240) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    NAV_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const onJump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -96 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-ds-4 z-50 mx-auto flex w-fit items-center"
    >
      <div
        className={cn(
          'glass flex items-center gap-ds-1 px-ds-2 py-ds-2 transition-all duration-base',
          scrolled ? 'shadow-2' : 'shadow-1',
        )}
      >
        <span className="px-ds-3 font-mono text-small text-text-tertiary">~/soumya</span>
        <span className="mx-ds-1 h-4 w-px bg-[var(--glass-border)]" aria-hidden="true" />
        {NAV_SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onJump(s.id)}
              className={cn(
                'relative rounded-md px-ds-3 py-ds-2 font-mono text-small transition-colors duration-fast',
                isActive ? 'text-[#04122e]' : 'text-text-tertiary hover:text-text-secondary',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-md"
                  style={{
                    background: 'var(--accent-text)',
                    boxShadow: '0 0 16px var(--accent-glow)',
                  }}
                  transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                />
              )}
              <span className="relative z-10">{s.label}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
