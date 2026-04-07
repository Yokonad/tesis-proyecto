import React from 'react';

interface StatusBadgeProps {
  status: 'online' | 'degraded' | 'down';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    online: 'text-monitoreo-light pixel-border bg-transparent',
    degraded: 'text-monitoreo-light pixel-border bg-transparent',
    down: 'text-monitoreo-light pixel-border bg-transparent animate-pulse'
  };

  const labels = {
    online: 'SISTEMA OPERATIVO',
    degraded: 'RENDIMIENTO DEGRADADO',
    down: 'CAÍDA DETECTADA'
  };

  return (
    <div className={`inline-flex items-center px-3 py-1 font-mono text-sm tracking-widest font-bold ${styles[status]}`}>
      <span className="mr-2">□</span>
      {labels[status]}
    </div>
  );
};
