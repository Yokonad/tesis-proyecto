import React from 'react';
import { Sidebar } from '@monitoreo/components/shared/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-monitoreo-dark text-monitoreo-light">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-auto">
        <div className="p-8 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
