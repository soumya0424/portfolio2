'use client';

/**
 * Handcrafted ASCII wordmark for "SOUMYA" — elegant, readable, developer
 * aesthetic, in mono with the accent tint. Decorative only.
 */
const ART = String.raw`
 ____   ___  _   _ __  __ __   __ _
/ ___| / _ \| | | |  \/  |\ \ / // \
\___ \| | | | | | | |\/| | \ V // _ \
 ___) | |_| | |_| | |  | |  | |/ ___ \
|____/ \___/ \___/|_|  |_|  |_/_/   \_\
`;

export function AsciiArt() {
  return (
    <pre
      aria-label="Soumya"
      className="whitespace-pre font-mono text-[0.5rem] leading-[1.15] text-accent-text sm:text-[0.6rem] md:text-[0.7rem]"
      style={{ textShadow: '0 0 18px var(--accent-glow)' }}
    >
      {ART}
    </pre>
  );
}
