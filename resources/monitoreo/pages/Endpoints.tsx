import React, { useState } from 'react';
import { Card } from '@monitoreo/components/ui/Card';
import { Badge } from '@monitoreo/components/ui/Badge';

type SortBy = 'usage' | 'errors' | 'response-time';

interface Endpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  usage: number;
  errors: number;
  avgResponseTime: number;
  status: 'online' | 'slow' | 'errors';
}

const mockEndpoints: Endpoint[] = [
  { path: '/api/datos/obtener', method: 'GET', usage: 5420, errors: 2, avgResponseTime: 45, status: 'online' },
  { path: '/api/usuarios/lista', method: 'GET', usage: 3210, errors: 0, avgResponseTime: 62, status: 'online' },
  { path: '/api/reporte/generar', method: 'POST', usage: 1854, errors: 12, avgResponseTime: 234, status: 'slow' },
  { path: '/api/auth/login', method: 'POST', usage: 892, errors: 45, avgResponseTime: 78, status: 'errors' },
  { path: '/api/usuarios/crear', method: 'POST', usage: 120, errors: 8, avgResponseTime: 156, status: 'errors' },
  { path: '/api/productos/actualizar', method: 'PUT', usage: 420, errors: 0, avgResponseTime: 89, status: 'online' },
  { path: '/api/logs/obtener', method: 'GET', usage: 2100, errors: 5, avgResponseTime: 34, status: 'online' },
  { path: '/admin/settings', method: 'GET', usage: 45, errors: 3, avgResponseTime: 120, status: 'online' },
];

const Endpoints: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy>('usage');

  const sortedEndpoints = [...mockEndpoints].sort((a, b) => {
    if (sortBy === 'usage') return b.usage - a.usage;
    if (sortBy === 'errors') return b.errors - a.errors;
    if (sortBy === 'response-time') return b.avgResponseTime - a.avgResponseTime;
    return 0;
  });

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'info';
      case 'POST': return 'success';
      case 'PUT': return 'warning';
      case 'DELETE': return 'danger';
      default: return 'neutral';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'success';
      case 'slow': return 'warning';
      case 'errors': return 'danger';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-monitoreo-light">Endpoints</h1>
        <p className="text-monitoreo-text-secondary">Monitoreo de rutas de API más usadas y su rendimiento</p>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="space-y-4">
            <p className="text-sm text-monitoreo-text-secondary">Total de Endpoints</p>
            <p className="text-3xl font-bold text-monitoreo-primary">{mockEndpoints.length}</p>
            <p className="text-xs text-green-500">Monitoreados</p>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <p className="text-sm text-monitoreo-text-secondary">En Línea</p>
            <p className="text-3xl font-bold text-green-500">
              {mockEndpoints.filter(e => e.status === 'online').length}
            </p>
            <p className="text-xs text-green-500">Funcionando correctamente</p>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <p className="text-sm text-monitoreo-text-secondary">Con Problemas</p>
            <p className="text-3xl font-bold text-red-500">
              {mockEndpoints.filter(e => e.status !== 'online').length}
            </p>
            <p className="text-xs text-red-500">Requieren atención</p>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <p className="text-sm text-monitoreo-text-secondary">Total Requests</p>
            <p className="text-3xl font-bold text-monitoreo-light">
              {(mockEndpoints.reduce((sum, e) => sum + e.usage, 0) / 1000).toFixed(1)}K
            </p>
            <p className="text-xs text-monitoreo-text-secondary">Hoy</p>
          </div>
        </Card>
      </div>

      {/* Ordenar */}
      <Card>
        <div className="flex gap-2">
          <p className="text-sm text-monitoreo-text-secondary">Ordenar por:</p>
          {[
            { value: 'usage' as SortBy, label: 'Uso' },
            { value: 'errors' as SortBy, label: 'Errores' },
            { value: 'response-time' as SortBy, label: 'Tiempo Respuesta' },
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                sortBy === option.value
                  ? 'bg-monitoreo-primary bg-opacity-20 text-monitoreo-primary'
                  : 'bg-monitoreo-dark text-monitoreo-text-secondary hover:text-monitoreo-light'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Tabla de Endpoints */}
      <Card title="Listado de Endpoints" subtitle={`${sortedEndpoints.length} endpoints monitoreados`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-monitoreo-border">
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Ruta</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Método</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Requests</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Errores</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Tasa Error</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Tiempo Resp.</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {sortedEndpoints.map((endpoint, idx) => {
                const errorRate = ((endpoint.errors / endpoint.usage) * 100).toFixed(2);
                return (
                  <tr key={idx} className="border-b border-monitoreo-border hover:bg-monitoreo-card transition-colors">
                    <td className="py-3 px-4 text-monitoreo-light font-mono text-xs">{endpoint.path}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getMethodColor(endpoint.method) as any}>
                        {endpoint.method}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-monitoreo-light">{endpoint.usage.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge variant={endpoint.errors > 10 ? 'danger' : endpoint.errors > 5 ? 'warning' : 'success'}>
                        {endpoint.errors}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-monitoreo-text-secondary">{errorRate}%</td>
                    <td className="py-3 px-4">
                      <span className={`
                        ${endpoint.avgResponseTime < 100 ? 'text-green-500' : endpoint.avgResponseTime < 200 ? 'text-yellow-500' : 'text-red-500'}
                      `}>
                        {endpoint.avgResponseTime}ms
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(endpoint.status) as any}>
                        {endpoint.status === 'online' ? 'Óptimo' : endpoint.status === 'slow' ? 'Lento' : 'Con Errores'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Tabla de Mejores y Peores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Rutas Más Usadas">
          <div className="space-y-3">
            {[...mockEndpoints]
              .sort((a, b) => b.usage - a.usage)
              .slice(0, 5)
              .map((endpoint, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-monitoreo-dark rounded-lg border border-monitoreo-border">
                  <div>
                    <p className="text-sm font-semibold text-monitoreo-light">{endpoint.path}</p>
                    <p className="text-xs text-monitoreo-text-secondary">{endpoint.usage.toLocaleString()} requests</p>
                  </div>
                  <Badge>{idx + 1}</Badge>
                </div>
              ))}
          </div>
        </Card>

        <Card title="Rutas con Más Errores">
          <div className="space-y-3">
            {[...mockEndpoints]
              .sort((a, b) => b.errors - a.errors)
              .slice(0, 5)
              .map((endpoint, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-monitoreo-dark rounded-lg border border-monitoreo-border border-l-2 border-l-red-500">
                  <div>
                    <p className="text-sm font-semibold text-monitoreo-light">{endpoint.path}</p>
                    <p className="text-xs text-monitoreo-text-secondary">{endpoint.errors} errores</p>
                  </div>
                  <Badge variant="danger">{endpoint.errors}</Badge>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Endpoints;
