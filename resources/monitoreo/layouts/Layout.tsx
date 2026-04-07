import React from 'react';
import { Sidebar } from '@monitoreo/components/shared/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-monitoreo-dark text-monitoreo-light font-mono selection:bg-monitoreo-light selection:text-monitoreo-darker">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-auto scrollbar-hide">
        <div className="origin-top-left scale-[0.87] w-[114.95%] min-h-screen p-7">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
