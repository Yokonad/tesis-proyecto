import React from 'react';
import { useMonitoring } from '@monitoreo/context/MonitoringContext';
import { Card } from '@monitoreo/components/ui/Card';
import { Badge } from '@monitoreo/components/ui/Badge';
import { StatusBadge } from '@monitoreo/components/ui/StatusBadge';
import { MetricCard } from '@monitoreo/components/ui/MetricCard';

const Dashboard: React.FC = () => {
  const { systemStatus, metrics } = useMonitoring();

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-monitoreo-light">Dashboard</h1>
        <p className="text-monitoreo-text-secondary">Estado del sistema en tiempo real</p>
      </div>

      {/* Estado del Sistema - Tarjeta Principal */}
      <Card className="lg:col-span-2">
        <div className="flex items-center justify-between">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-monitoreo-text-secondary mb-2">Estado General</p>
              <StatusBadge status={systemStatus.status} />
            </div>
            
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-sm text-monitoreo-text-secondary mb-2">Uptime</p>
                <p className="text-2xl font-bold text-green-500">{systemStatus.uptime.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm text-monitoreo-text-secondary mb-2">Tiempo de Respuesta</p>
                <p className="text-2xl font-bold text-monitoreo-primary">{systemStatus.responseTime}ms</p>
              </div>
              <div>
                <p className="text-sm text-monitoreo-text-secondary mb-2">Última Verificación</p>
                <p className="text-sm text-monitoreo-light">{new Date(systemStatus.lastCheck).toLocaleTimeString('es-ES')}</p>
              </div>
            </div>
          </div>

          {/* Indicador Visual Grande */}
          <div className="flex flex-col items-center">
            <div className={`
              w-32 h-32 rounded-full border-4 flex items-center justify-center
              ${systemStatus.status === 'online' ? 'border-green-500 bg-green-500 bg-opacity-10' : ''}
              ${systemStatus.status === 'degraded' ? 'border-yellow-500 bg-yellow-500 bg-opacity-10' : ''}
              ${systemStatus.status === 'down' ? 'border-red-500 bg-red-500 bg-opacity-10' : ''}
            `}>
              <div className={`
                w-24 h-24 rounded-full flex items-center justify-center
                ${systemStatus.status === 'online' ? 'bg-green-500' : ''}
                ${systemStatus.status === 'degraded' ? 'bg-yellow-500' : ''}
                ${systemStatus.status === 'down' ? 'bg-red-500' : ''}
              `}>
                <span className="text-white text-4xl">
                  {systemStatus.status === 'online' ? '✓' : systemStatus.status === 'degraded' ? '⚠' : '✗'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Métricas en Tiempo Real */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-monitoreo-light">Métricas en Tiempo Real</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            label="Requests/seg"
            value={metrics.requestsPerSecond.toFixed(0)}
            color="primary"
            trend="up"
            trendPercent={2.5}
            icon="📨"
          />
          <MetricCard
            label="Usuarios Activos"
            value={metrics.activeUsers}
            color="success"
            trend="stable"
            trendPercent={0.5}
            icon="👥"
          />
          <MetricCard
            label="Tasa de Error"
            value={metrics.errorRate.toFixed(2)}
            unit="%"
            color="warning"
            trend="down"
            trendPercent={0.3}
            icon="⚠️"
          />
          <MetricCard
            label="Latencia"
            value={metrics.latencyMs.toFixed(0)}
            unit="ms"
            color="primary"
            trend="stable"
            trendPercent={0}
            icon="⚡"
          />
          <MetricCard
            label="Errores Recientes"
            value={metrics.recentErrors}
            color="danger"
            trend="down"
            trendPercent={1.2}
            icon="❌"
          />
        </div>
      </div>

      {/* Sección de Alertas */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-monitoreo-light">Alertas Activas</h2>
        <Card>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-monitoreo-dark rounded-lg border-l-4 border-yellow-500">
              <div>
                <p className="font-semibold text-monitoreo-light">Tasa de error elevada</p>
                <p className="text-sm text-monitoreo-text-secondary">Tasa de error superior al 0.5% en los últimos 5 minutos</p>
              </div>
              <Badge variant="warning">Activa</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-monitoreo-dark rounded-lg border-l-4 border-red-500">
              <div>
                <p className="font-semibold text-monitoreo-light">Múltiples intentos de login fallidos</p>
                <p className="text-sm text-monitoreo-text-secondary">45 intentos fallidos desde IP 192.168.1.105</p>
              </div>
              <Badge variant="danger">Crítica</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-monitoreo-dark rounded-lg border-l-4 border-yellow-500">
              <div>
                <p className="font-semibold text-monitoreo-light">Tráfico inusual detectado</p>
                <p className="text-sm text-monitoreo-text-secondary">Incremento del 150% en requests comparado con el promedio horario</p>
              </div>
              <Badge variant="warning">Activa</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabla de Errores Recientes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-monitoreo-light">Errores Recientes (4xx, 5xx)</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-monitoreo-border">
                  <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Código</th>
                  <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Endpoint</th>
                  <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Método</th>
                  <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Ocurrencias</th>
                  <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Último</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-monitoreo-border hover:bg-monitoreo-card transition-colors">
                  <td className="py-3 px-4"><Badge variant="danger">500</Badge></td>
                  <td className="py-3 px-4 text-monitoreo-light">/api/usuarios/crear</td>
                  <td className="py-3 px-4 text-monitoreo-light">POST</td>
                  <td className="py-3 px-4">12</td>
                  <td className="py-3 px-4 text-monitoreo-text-secondary">hace 2 minutos</td>
                </tr>
                <tr className="border-b border-monitoreo-border hover:bg-monitoreo-card transition-colors">
                  <td className="py-3 px-4"><Badge variant="warning">404</Badge></td>
                  <td className="py-3 px-4 text-monitoreo-light">/api/reporte/descargar</td>
                  <td className="py-3 px-4 text-monitoreo-light">GET</td>
                  <td className="py-3 px-4">8</td>
                  <td className="py-3 px-4 text-monitoreo-text-secondary">hace 5 minutos</td>
                </tr>
                <tr className="border-b border-monitoreo-border hover:bg-monitoreo-card transition-colors">
                  <td className="py-3 px-4"><Badge variant="warning">403</Badge></td>
                  <td className="py-3 px-4 text-monitoreo-light">/admin/settings</td>
                  <td className="py-3 px-4 text-monitoreo-light">GET</td>
                  <td className="py-3 px-4">3</td>
                  <td className="py-3 px-4 text-monitoreo-text-secondary">hace 8 minutos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Endpoints Más Usados */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-monitoreo-light">Endpoints Más Usados</h2>
        <Card>
          <div className="space-y-4">
            {[
              { endpoint: '/api/datos/obtener', usage: 5420, avgTime: 45, status: 'online' },
              { endpoint: '/api/usuarios/lista', usage: 3210, avgTime: 62, status: 'online' },
              { endpoint: '/api/reporte/generar', usage: 1854, avgTime: 234, status: 'degraded' },
              { endpoint: '/api/auth/login', usage: 892, avgTime: 78, status: 'online' },
            ].map((endpoint, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-monitoreo-dark rounded-lg border border-monitoreo-border hover:border-monitoreo-primary transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-monitoreo-light">{endpoint.endpoint}</p>
                  <div className="flex gap-4 mt-2 text-sm text-monitoreo-text-secondary">
                    <span>Requests: {endpoint.usage}</span>
                    <span>Tiempo promedio: {endpoint.avgTime}ms</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${endpoint.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <Badge variant={endpoint.status === 'online' ? 'success' : 'warning'}>
                    {endpoint.status === 'online' ? 'Óptimo' : 'Lento'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
