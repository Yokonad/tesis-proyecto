import React, { createContext, useContext, useState, useEffect } from 'react';
import type { RealTimeMetrics, SystemStatus } from '@monitoreo/types';

export interface MonitoringContextType {
  systemStatus: SystemStatus;
  metrics: RealTimeMetrics;
  isLoading: boolean;
}

const MonitoringContext = createContext<MonitoringContextType | undefined>(undefined);

export const MonitoringProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    status: 'online',
    uptime: 99.98,
    responseTime: 45,
    lastCheck: new Date().toISOString(),
  });

  const [metrics, setMetrics] = useState<RealTimeMetrics>({
    requestsPerSecond: 342,
    activeUsers: 1250,
    errorRate: 0.08,
    latencyMs: 45,
    recentErrors: 12,
  });

  const isLoading = false;

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        requestsPerSecond: Math.max(50, prev.requestsPerSecond + Math.random() * 100 - 50),
        activeUsers: Math.max(500, prev.activeUsers + Math.floor(Math.random() * 100 - 50)),
        errorRate: Math.max(0, Math.min(5, prev.errorRate + (Math.random() - 0.5) * 0.1)),
        latencyMs: Math.max(20, prev.latencyMs + Math.random() * 10 - 5),
        recentErrors: Math.max(0, prev.recentErrors + Math.floor(Math.random() * 3 - 1)),
      }));

      setSystemStatus(prev => ({
        ...prev,
        lastCheck: new Date().toISOString(),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MonitoringContext.Provider value={{ systemStatus, metrics, isLoading }}>
      {children}
    </MonitoringContext.Provider>
  );
};

export const useMonitoring = () => {
  const context = useContext(MonitoringContext);
  if (!context) {
    throw new Error('useMonitoring debe usarse dentro de MonitoringProvider');
  }
  return context;
};
