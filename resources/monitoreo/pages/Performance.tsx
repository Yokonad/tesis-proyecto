import React from 'react';
import { Card } from '@monitoreo/components/ui/Card';
import { Badge } from '@monitoreo/components/ui/Badge';
import { useMonitoring } from '@monitoreo/context/MonitoringContext';

const Performance: React.FC = () => {
  const { systemStatus, metrics } = useMonitoring();

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-monitoreo-light">Rendimiento</h1>
        <p className="text-monitoreo-text-secondary">Métricas detalladas de rendimiento del servidor</p>
      </div>

      {/* Tiempo de Carga */}
      <Card title="Tiempo de Carga">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-monitoreo-text-secondary">P50 (Mediana)</span>
              <span className="text-2xl font-bold text-green-500">{(metrics.latencyMs * 0.8).toFixed(0)}ms</span>
            </div>
            <div className="w-full bg-monitoreo-dark rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }} />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-monitoreo-text-secondary">P95</span>
              <span className="text-2xl font-bold text-yellow-500">{(metrics.latencyMs * 1.5).toFixed(0)}ms</span>
            </div>
            <div className="w-full bg-monitoreo-dark rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-monitoreo-text-secondary">P99</span>
              <span className="text-2xl font-bold text-orange-500">{(metrics.latencyMs * 2.2).toFixed(0)}ms</span>
            </div>
            <div className="w-full bg-monitoreo-dark rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Estado del Servidor */}
      <Card title="Estado del Servidor">
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-monitoreo-dark rounded-lg border border-monitoreo-border">
            <span className="text-monitoreo-light">CPU Usage</span>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-monitoreo-card rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }} />
              </div>
              <Badge variant="warning">67%</Badge>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 bg-monitoreo-dark rounded-lg border border-monitoreo-border">
            <span className="text-monitoreo-light">RAM Usage</span>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-monitoreo-card rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '82%' }} />
              </div>
              <Badge variant="danger">82%</Badge>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 bg-monitoreo-dark rounded-lg border border-monitoreo-border">
            <span className="text-monitoreo-light">Disco</span>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-monitoreo-card rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }} />
              </div>
              <Badge variant="success">45%</Badge>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 bg-monitoreo-dark rounded-lg border border-monitoreo-border">
            <span className="text-monitoreo-light">Conexiones Activas</span>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-monitoreo-card rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '34%' }} />
              </div>
              <Badge variant="success">1,245</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Estadísticas de Requests */}
      <Card title="Estadísticas de Requests">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-monitoreo-dark rounded-lg border border-monitoreo-border">
            <p className="text-sm text-monitoreo-text-secondary mb-2">Total Hoy</p>
            <p className="text-3xl font-bold text-monitoreo-primary">1.2M</p>
            <p className="text-xs text-green-500 mt-2">↑ 15% vs ayer</p>
          </div>

          <div className="p-4 bg-monitoreo-dark rounded-lg border border-monitoreo-border">
            <p className="text-sm text-monitoreo-text-secondary mb-2">Tasa Éxito</p>
            <p className="text-3xl font-bold text-green-500">99.92%</p>
            <p className="text-xs text-green-500 mt-2">↑ 0.4 puntos</p>
          </div>

          <div className="p-4 bg-monitoreo-dark rounded-lg border border-monitoreo-border">
            <p className="text-sm text-monitoreo-text-secondary mb-2">Tiempo Resp. Promedio</p>
            <p className="text-3xl font-bold text-yellow-500">{metrics.latencyMs.toFixed(0)}ms</p>
            <p className="text-xs text-yellow-500 mt-2">↑ 2ms vs ayer</p>
          </div>

          <div className="p-4 bg-monitoreo-dark rounded-lg border border-monitoreo-border">
            <p className="text-sm text-monitoreo-text-secondary mb-2">Tasa Datos Perdidos</p>
            <p className="text-3xl font-bold text-green-500">0.00%</p>
            <p className="text-xs text-green-500 mt-2">Excelente</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Performance;
