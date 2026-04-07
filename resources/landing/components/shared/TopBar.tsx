import React from 'react';
import { useLanding } from '@landing/context/LandingContext';

export const TopBar: React.FC = () => {
  const { platformName } = useLanding();

  return (
    <header className="border-b border-landing-border bg-landing-card/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <h1 className="text-sm font-semibold uppercase tracking-[0.18em] text-landing-primary">{platformName}</h1>
        <a href="/monitoreo" className="rounded-md border border-landing-border px-3 py-1.5 text-xs font-medium text-landing-text-secondary transition hover:border-landing-primary hover:text-landing-light">
          Ir a Monitoreo
        </a>
      </div>
    </header>
  );
};
