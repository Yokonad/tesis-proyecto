import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  { path: '/monitoreo', label: 'Dashboard', idx: 1 },
  { path: '/monitoreo/logs', label: 'Logs', idx: 2 },
  { path: '/monitoreo/rendimiento', label: 'Rendimiento', idx: 3 },
  { path: '/monitoreo/endpoints', label: 'Endpoints', idx: 4 },
  { path: '/monitoreo/seguridad', label: 'Seguridad', idx: 5 },
  { path: '/monitoreo/usuarios', label: 'Usuarios', idx: 6 },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/monitoreo' && location.pathname.startsWith(path + '/'));
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-monitoreo-darker border-r border-monitoreo-border
        transition-all duration-300 z-50 font-mono
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Header */}
      <div className="h-16 bg-monitoreo-dark border-b border-monitoreo-border border-dashed flex items-center justify-between px-4">
        {!isCollapsed && (
          <h1 className="text-xl md:text-2xl font-bold text-monitoreo-light text-glitch tracking-widest font-mono">
            MONIT<span className="text-monitoreo-light opacity-80">OR</span>
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-monitoreo-text-secondary hover:text-monitoreo-light transition-colors"
        >
          {isCollapsed ? '[+]' : '[-]'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col pt-6 px-2 gap-1">
        {!isCollapsed && <p className="text-xs text-monitoreo-text-secondary px-4 mb-2">RUN COMMAND</p>}
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-3 px-4 py-2 transition-all duration-200 border border-transparent
              ${
                isActive(item.path)
                  ? 'text-monitoreo-light border-monitoreo-light border-dashed'
                  : 'text-monitoreo-text-secondary hover:bg-monitoreo-card hover:text-monitoreo-light hover:border-monitoreo-border hover:border-dashed'
              }
            `}
            title={isCollapsed ? item.label : ''}
          >
            <span className="text-monitoreo-light font-bold">[{item.idx}]</span>
            {!isCollapsed && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-monitoreo-border border-dashed bg-monitoreo-darker">
        {!isCollapsed ? (
          <div className="text-xs text-monitoreo-text-secondary">
            <p className="mb-1 text-monitoreo-light">&gt; sys_time</p>
            <p className="text-monitoreo-light font-bold">{new Date().toLocaleTimeString('es-ES')}</p>
          </div>
        ) : (
          <div className="mx-auto h-3 w-3 border border-monitoreo-light"></div>
        )}
      </div>
    </aside>
  );
};
