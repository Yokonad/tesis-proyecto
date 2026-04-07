import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  colorClass?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, value, trend, trendUp, colorClass = 'text-white' 
}) => {
  return (
    <div className="bg-monitoreo-card pixel-border pixel-box p-4 flex flex-col relative group h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-monitoreo-secondary font-mono text-xs md:text-sm uppercase tracking-wider">{title}</h3>
      </div>
      <div className="flex items-end justify-between mt-auto">
        <span className={`text-2xl md:text-4xl font-sans font-bold ${colorClass}`}>
          {value}
        </span>
        {trend && (
          <span className={`font-mono text-xs md:text-sm ${trendUp ? 'text-monitoreo-light' : 'text-monitoreo-secondary'} bg-monitoreo-darker px-1`}>
            {trendUp ? '+' : '-'} {trend}
          </span>
        )}
      </div>
    </div>
  );
};
