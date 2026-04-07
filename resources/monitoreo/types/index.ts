/**
 * Definiciones de tipos comunes para el módulo monitoreo
 */

export interface SystemStatus {
  status: 'online' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  lastCheck: string;
}

export interface RealTimeMetrics {
  requestsPerSecond: number;
  activeUsers: number;
  errorRate: number;
  latencyMs: number;
  recentErrors: number;
}

export interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
}

export interface LogEntry {
  id: number;
  type: 'acceso' | 'error' | 'login';
  ip: string;
  ruta: string;
  timestamp: string;
  statusCode?: number;
  message: string;
}

export interface Endpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  usage: number;
  errors: number;
  avgResponseTime: number;
  status: 'online' | 'slow' | 'errors';
}

export interface UserSession {
  id: number;
  username: string;
  email: string;
  ip: string;
  status: 'online' | 'idle' | 'offline';
  lastActivity: string;
  loginTime: string;
  browser: string;
}

export interface PerformanceMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  activeConnections: number;
  p50: number;
  p95: number;
  p99: number;
}

export interface SecurityEvent {
  id: string;
  type: 'brute-force' | 'anomaly' | 'suspicious-ip';
  severity: 'low' | 'medium' | 'high';
  description: string;
  timestamp: string;
  details: Record<string, any>;
}
