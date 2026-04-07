import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendPercent?: number;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
}

const colorStyles = {
  primary: 'bg-monitoreo-primary bg-opacity-10 text-monitoreo-primary',
  success: 'bg-green-500 bg-opacity-10 text-green-500',
  warning: 'bg-yellow-500 bg-opacity-10 text-yellow-500',
  danger: 'bg-red-500 bg-opacity-10 text-red-500',
};

const trendIcons = {
  up: '↑',
  down: '↓',
  stable: '→',
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  trend,
  trendPercent,
  color = 'primary',
  icon,
}) => {
  return (
    <div className="bg-monitoreo-card border border-monitoreo-border rounded-lg p-6 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-monitoreo-text-secondary mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-monitoreo-light">{value}</span>
            {unit && <span className="text-sm text-monitoreo-text-secondary">{unit}</span>}
          </div>
        </div>
        {icon && (
          <div className={`p-3 rounded-lg ${colorStyles[color]}`}>
            {icon}
          </div>
        )}
      </div>

      {trend && trendPercent !== undefined && (
        <div className="flex items-center gap-1 text-sm">
          <span className={`
            ${trend === 'up' ? 'text-red-500' : 'text-green-500'}
          `}>
            {trendIcons[trend]} {Math.abs(trendPercent)}%
          </span>
          <span className="text-monitoreo-text-secondary">vs última hora</span>
        </div>
      )}
    </div>
  );
};
