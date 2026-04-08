import React from 'react';
import { TopBar } from '@landing/components/shared/TopBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-landing-darker font-sans text-landing-light selection:bg-landing-primary selection:text-white">
      {/* Background patterns */}
      <div className="fixed inset-0 z-0 bg-landing-gradient opacity-60"></div>
      <div className="fixed inset-0 z-0 bg-landing-mesh opacity-50"></div>
      <div className="fixed inset-0 z-0 bg-[image:var(--background-image-landing-grid)] bg-[size:32px_32px] opacity-30"></div>
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-landing-darker/50 to-landing-darker"></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <TopBar />
        <main className="mx-auto w-full max-w-6xl flex-grow px-6 py-16">{children}</main>
        
        {/* Simple footer */}
        <footer className="border-t border-landing-border/50 py-8 text-center text-xs text-landing-text-secondary">
          <p>© {new Date().getFullYear()} Proyecto de Tesis. Sistema de Monitoreo Preventivo.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
