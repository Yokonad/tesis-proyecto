import React from 'react';
import { TopBar } from '@landing/components/shared/TopBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-landing-dark text-landing-light font-sans">
      <TopBar />
      <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>
    </div>
  );
};

export default Layout;
