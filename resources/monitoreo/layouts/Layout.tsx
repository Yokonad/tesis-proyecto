import React, { useState } from 'react';
import { Sidebar } from '@monitoreo/components/shared/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-monitoreo-dark text-monitoreo-light font-mono selection:bg-monitoreo-light selection:text-monitoreo-darker">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
      <main
        className={`flex-1 overflow-auto scrollbar-hide transition-[margin-left] duration-300 ease-in-out ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <div className="origin-top-left min-h-screen w-[114.95%] scale-[0.87] p-7">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
