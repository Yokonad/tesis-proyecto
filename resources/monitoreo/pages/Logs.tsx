import React, { useState } from 'react';
import { Card } from '@monitoreo/components/ui/Card';
import { Badge } from '@monitoreo/components/ui/Badge';
import { Button } from '@monitoreo/components/ui/Button';

type LogType = 'acceso' | 'error' | 'login';

interface LogEntry {
  id: number;
  type: LogType;
  ip: string;
  ruta: string;
  timestamp: string;
  statusCode?: number;
  userAgent?: string;
  message: string;
}

const mockLogs: LogEntry[] = [
  { id: 1, type: 'acceso', ip: '192.168.1.100', ruta: '/api/usuarios', timestamp: new Date(Date.now() - 5000).toISOString(), statusCode: 200, message: 'GET /api/usuarios - OK' },
  { id: 2, type: 'error', ip: '192.168.1.105', ruta: '/api/datos', timestamp: new Date(Date.now() - 45000).toISOString(), statusCode: 500, message: 'Internal Server Error en /api/datos' },
  { id: 3, type: 'login', ip: '192.168.1.110', ruta: '/auth/login', timestamp: new Date(Date.now() - 125000).toISOString(), statusCode: 200, message: 'Usuario login exitoso' },
  { id: 4, type: 'login', ip: '192.168.1.105', ruta: '/auth/login', timestamp: new Date(Date.now() - 180000).toISOString(), statusCode: 401, message: 'Intento de login fallido' },
  { id: 5, type: 'acceso', ip: '192.168.1.112', ruta: '/admin/panel', timestamp: new Date(Date.now() - 250000).toISOString(), statusCode: 403, message: 'Acceso denegado a /admin/panel' },
  { id: 6, type: 'error', ip: '192.168.1.115', ruta: '/api/reporte', timestamp: new Date(Date.now() - 320000).toISOString(), statusCode: 503, message: 'Service Unavailable' },
  { id: 7, type: 'acceso', ip: '192.168.1.120', ruta: '/api/productos', timestamp: new Date(Date.now() - 450000).toISOString(), statusCode: 200, message: 'GET /api/productos - OK' },
  { id: 8, type: 'login', ip: '192.168.1.130', ruta: '/auth/login', timestamp: new Date(Date.now() - 550000).toISOString(), statusCode: 200, message: 'Usuario login exitoso' },
];

const Logs: React.FC = () => {
  const [filterType, setFilterType] = useState<LogType | 'all'>('all');
  const [filterIP, setFilterIP] = useState('');
  const [filterRuta, setFilterRuta] = useState('');
  const [searchText, setSearchText] = useState('');

  const filteredLogs = mockLogs.filter(log => {
    const typeMatch = filterType === 'all' || log.type === filterType;
    const ipMatch = !filterIP || log.ip.includes(filterIP);
    const rutaMatch = !filterRuta || log.ruta.includes(filterRuta);
    const searchMatch = !searchText || 
      log.message.toLowerCase().includes(searchText.toLowerCase()) ||
      log.ip.includes(searchText) ||
      log.ruta.includes(searchText);
    
    return typeMatch && ipMatch && rutaMatch && searchMatch;
  });

  const getLogTypeColor = (type: LogType) => {
    switch (type) {
      case 'acceso': return 'info';
      case 'error': return 'danger';
      case 'login': return 'success';
      default: return 'neutral';
    }
  };

  const getLogTypeLabel = (type: LogType) => {
    switch (type) {
      case 'acceso': return 'Acceso';
      case 'error': return 'Error';
      case 'login': return 'Login';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-monitoreo-light">Logs del Sistema</h1>
        <p className="text-monitoreo-text-secondary">Registro detallado de eventos: acceso, errores y logins</p>
      </div>

      {/* Filtros */}
      <Card title="Filtros Rápidos">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filtro por Tipo */}
          <div>
            <label className="block text-sm font-semibold text-monitoreo-light mb-2">
              Tipo de Log
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as LogType | 'all')}
              className="w-full bg-monitoreo-dark border border-monitoreo-border rounded-lg px-3 py-2 text-monitoreo-light focus:outline-none focus:border-monitoreo-primary"
            >
              <option value="all">Todos</option>
              <option value="acceso">Acceso</option>
              <option value="error">Error</option>
              <option value="login">Login</option>
            </select>
          </div>

          {/* Filtro por IP */}
          <div>
            <label className="block text-sm font-semibold text-monitoreo-light mb-2">
              Filtrar por IP
            </label>
            <input
              type="text"
              placeholder="192.168.1..."
              value={filterIP}
              onChange={(e) => setFilterIP(e.target.value)}
              className="w-full bg-monitoreo-dark border border-monitoreo-border rounded-lg px-3 py-2 text-monitoreo-light placeholder-monitoreo-text-secondary focus:outline-none focus:border-monitoreo-primary"
            />
          </div>

          {/* Filtro por Ruta */}
          <div>
            <label className="block text-sm font-semibold text-monitoreo-light mb-2">
              Filtrar por Ruta
            </label>
            <input
              type="text"
              placeholder="/api/..."
              value={filterRuta}
              onChange={(e) => setFilterRuta(e.target.value)}
              className="w-full bg-monitoreo-dark border border-monitoreo-border rounded-lg px-3 py-2 text-monitoreo-light placeholder-monitoreo-text-secondary focus:outline-none focus:border-monitoreo-primary"
            />
          </div>

          {/* Búsqueda General */}
          <div>
            <label className="block text-sm font-semibold text-monitoreo-light mb-2">
              Búsqueda
            </label>
            <input
              type="text"
              placeholder="Buscar en logs..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-monitoreo-dark border border-monitoreo-border rounded-lg px-3 py-2 text-monitoreo-light placeholder-monitoreo-text-secondary focus:outline-none focus:border-monitoreo-primary"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setFilterType('all');
              setFilterIP('');
              setFilterRuta('');
              setSearchText('');
            }}
          >
            Limpiar Filtros
          </Button>
          <span className="text-sm text-monitoreo-text-secondary flex items-center">
            {filteredLogs.length} registros encontrados
          </span>
        </div>
      </Card>

      {/* Tabla de Logs */}
      <Card title="Historial de Eventos">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-monitoreo-border">
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Tipo</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">IP</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Ruta</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Código</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Mensaje</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b border-monitoreo-border hover:bg-monitoreo-card transition-colors">
                    <td className="py-3 px-4">
                      <Badge variant={getLogTypeColor(log.type) as any}>
                        {getLogTypeLabel(log.type)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-monitoreo-light font-mono">{log.ip}</td>
                    <td className="py-3 px-4 text-monitoreo-light">{log.ruta}</td>
                    <td className="py-3 px-4">
                      <Badge variant={log.statusCode === 200 ? 'success' : log.statusCode === 401 || log.statusCode === 403 ? 'warning' : 'danger'}>
                        {log.statusCode}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-monitoreo-text-secondary">{log.message}</td>
                    <td className="py-3 px-4 text-monitoreo-text-secondary whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleTimeString('es-ES')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-monitoreo-text-secondary">
                    No hay registros que coincidan con los filtros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Logs;
