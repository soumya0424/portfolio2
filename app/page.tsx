'use client';

import { useEffect, useState } from 'react';
import { Preloader } from '@/components/loader/Preloader';
import { BackgroundCanvas } from '@/components/background/BackgroundCanvas';
import { NavigationBar } from '@/components/nav/NavigationBar';
import { HeroTerminal } from '@/components/terminal/HeroTerminal';
import { TechStackSection } from '@/components/stack/TechStackSection';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { ProjectExplorer } from '@/components/explorer/ProjectExplorer';
import { ContactSection } from '@/components/contact/ContactSection';

/**
 * Single-page orchestrator.
 *
 * Flow: Preloader (Matrix Dots) → fade into the terminal hero → reveal nav and
 * unlock scroll → About → Stack → Projects (+ virtual explorer overlay) →
 * Contact. Scrolling is locked until the loader finishes to keep the opening
 * sequence intact.
 */
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(false);

  // Lock scroll until the preloader has dissolved.
  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loaded]);

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <BackgroundCanvas />
      {loaded && <NavigationBar />}

      <main className="relative z-10">
        <HeroTerminal />
        <TechStackSection />
        <ProjectsSection onOpenExplorer={() => setExplorerOpen(true)} />
        <ContactSection />
      </main>

      <ProjectExplorer open={explorerOpen} onClose={() => setExplorerOpen(false)} />
    </>
  );
}
