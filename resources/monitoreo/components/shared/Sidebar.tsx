import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  { path: '/monitoreo', label: 'Dashboard', idx: 1 },
  { path: '/monitoreo/logs', label: 'Logs', idx: 2 },
  { path: '/monitoreo/rendimiento', label: 'Rendimiento', idx: 3 },
  { path: '/monitoreo/endpoints', label: 'Endpoints', idx: 4 },
  { path: '/monitoreo/seguridad', label: 'Seguridad', idx: 5 },
  { path: '/monitoreo/usuarios', label: 'Usuarios', idx: 6 },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const [showMetaText, setShowMetaText] = useState(!isCollapsed);

  useEffect(() => {
    if (isCollapsed) {
      setShowMetaText(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowMetaText(true);
    }, 90);

    return () => clearTimeout(timer);
  }, [isCollapsed]);

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/monitoreo' && location.pathname.startsWith(path + '/'));
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-monitoreo-border bg-monitoreo-darker font-mono
        transition-[width] duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Header */}
      <div className={`flex h-16 items-center border-b border-monitoreo-border px-3 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed ? (
          <h1 className="text-left text-lg font-semibold tracking-[0.24em] text-monitoreo-light">MONITOR</h1>
        ) : null}
        <button
          onClick={onToggle}
          className="inline-flex h-8 w-8 items-center justify-center border border-monitoreo-border text-monitoreo-text-secondary transition-colors hover:border-monitoreo-light hover:text-monitoreo-light"
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
            {isCollapsed ? (
              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 10H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 space-y-1 overflow-y-auto px-2 ${isCollapsed ? 'pt-[15%] pb-4' : 'py-4'}`}>
        {!isCollapsed && showMetaText ? (
          <p className="px-3 pb-1 text-[11px] uppercase tracking-wider text-monitoreo-text-secondary">Run Command</p>
        ) : null}
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex h-10 items-center border text-sm transition-colors duration-200
              ${isCollapsed ? 'mx-auto w-10 justify-center px-0' : 'justify-start gap-3 px-3'}
              ${
                isActive(item.path)
                  ? 'border-monitoreo-light text-monitoreo-light'
                  : 'border-transparent text-monitoreo-text-secondary hover:border-monitoreo-border hover:text-monitoreo-light'
              }
            `}
            title={isCollapsed ? item.label : ''}
          >
            <span className={`text-center text-xs font-semibold text-monitoreo-light ${isCollapsed ? 'w-auto' : 'w-8'}`}>[{item.idx}]</span>
            {!isCollapsed && <span className="truncate text-sm leading-none">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-monitoreo-border p-3">
        {!isCollapsed && showMetaText ? (
          <div className="space-y-1 text-left">
            <p className="text-[11px] uppercase tracking-wide text-monitoreo-text-secondary">Sys Time</p>
            <p className="text-sm font-semibold text-monitoreo-light">{new Date().toLocaleTimeString('es-ES')}</p>
          </div>
        ) : null}
      </div>
    </aside>
  );
};
