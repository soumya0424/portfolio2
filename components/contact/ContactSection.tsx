'use client';

import { motion } from 'framer-motion';
import { SOCIALS } from '@/lib/content';
import { MagneticButton } from '@/components/ui/MagneticButton';

const LINKS = [
  { label: 'github', href: SOCIALS.github, glyph: '⌥' },
  { label: 'email', href: SOCIALS.email, glyph: '✉' },
  { label: 'linkedin', href: SOCIALS.linkedin, glyph: 'in' },
];

/**
 * Contact: a relaxed terminal-style prompt. The tone is "let's connect and
 * trade ideas" — open and confident, not job-seeking.
 */
export function ContactSection() {
  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-ds-6 py-ds-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="glass p-ds-8 md:p-ds-12"
      >
        <div className="flex flex-wrap items-center gap-ds-2 font-mono text-mono-base">
          <span className="text-accent-text">soumya@portfolio</span>
          <span className="text-text-tertiary">:~$</span>
          <span className="text-text-primary">./say_hello</span>
          <span className="cursor-blink" />
        </div>

        <h2 className="mt-ds-6 text-h2 font-semibold text-text-primary">
          Let&apos;s connect
        </h2>
        <p className="mt-ds-4 max-w-prose text-body text-text-secondary">
          Always happy to talk about AI, building products, home labs, or whatever you&apos;re
          working on. If you have an idea worth exploring — or just want to trade notes — my inbox
          is open.
        </p>

        <div className="mt-ds-8 flex flex-wrap gap-ds-4">
          {LINKS.map((l) => (
            <MagneticButton key={l.label} href={l.href} ariaLabel={l.label}>
              <span className="text-accent-text">{l.glyph}</span> {l.label}
            </MagneticButton>
          ))}
        </div>
      </motion.div>

      <p className="mt-ds-12 text-center font-mono text-small text-text-tertiary">
        designed + built by Soumya Naiya — {new Date().getFullYear()}
      </p>
    </section>
  );
}
