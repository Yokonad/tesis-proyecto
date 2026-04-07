import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  { path: '/monitoreo', label: 'Dashboard', icon: '📊' },
  { path: '/monitoreo/logs', label: 'Logs', icon: '📝' },
  { path: '/monitoreo/rendimiento', label: 'Rendimiento', icon: '⚡' },
  { path: '/monitoreo/endpoints', label: 'Endpoints', icon: '🔗' },
  { path: '/monitoreo/seguridad', label: 'Seguridad', icon: '🔒' },
  { path: '/monitoreo/usuarios', label: 'Usuarios', icon: '👥' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-monitoreo-dark border-r border-monitoreo-border
        transition-all duration-300 z-50
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Header */}
      <div className="h-16 bg-monitoreo-card border-b border-monitoreo-border flex items-center justify-between px-4">
        {!isCollapsed && (
          <h1 className="text-lg font-bold text-monitoreo-primary">MONITOR</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-monitoreo-text-secondary hover:text-monitoreo-light transition-colors"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col pt-4 px-2 gap-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${
                isActive(item.path)
                  ? 'bg-monitoreo-primary bg-opacity-20 text-monitoreo-primary border-l-2 border-monitoreo-primary'
                  : 'text-monitoreo-text-secondary hover:bg-monitoreo-card hover:text-monitoreo-light'
              }
            `}
            title={isCollapsed ? item.label : ''}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-monitoreo-border bg-monitoreo-card">
        {!isCollapsed && (
          <div className="text-xs text-monitoreo-text-secondary">
            <p className="font-semibold text-monitoreo-primary mb-2">Última actualización</p>
            <p>{new Date().toLocaleTimeString('es-ES')}</p>
          </div>
        )}
      </div>
    </aside>
  );
};
