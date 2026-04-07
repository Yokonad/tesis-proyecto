import React from 'react';

interface StatusBadgeProps {
  status: 'online' | 'degraded' | 'down';
  className?: string;
}

const statusConfig = {
  online: {
    color: 'bg-green-500',
    text: 'Online',
    dotClass: 'animate-pulse-slow',
  },
  degraded: {
    color: 'bg-yellow-500',
    text: 'Degradado',
    dotClass: 'animate-pulse',
  },
  down: {
    color: 'bg-red-500',
    text: 'Caído',
    dotClass: 'animate-pulse-fast',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const config = statusConfig[status];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`w-3 h-3 rounded-full ${config.color} ${config.dotClass}`} />
      <span className="text-sm font-medium text-monitoreo-light">
        {config.text}
      </span>
    </div>
  );
};
