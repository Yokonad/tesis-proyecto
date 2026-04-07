import React, { useState } from 'react';
import { Card } from '@monitoreo/components/ui/Card';
import { Badge } from '@monitoreo/components/ui/Badge';
import { Button } from '@monitoreo/components/ui/Button';
import { PageHeader } from '@monitoreo/components/ui/PageHeader';

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
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);
  const [filterIP, setFilterIP] = useState('');
  const [filterRuta, setFilterRuta] = useState('');
  const [searchText, setSearchText] = useState('');

  const typeOptions: Array<{ value: LogType | 'all'; label: string }> = [
    { value: 'all', label: 'Todos' },
    { value: 'acceso', label: 'Acceso' },
    { value: 'error', label: 'Error' },
    { value: 'login', label: 'Login' },
  ];

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
    <div className="mx-auto w-full max-w-7xl space-y-5">
      <section className="space-y-2 border-b border-monitoreo-border pb-4">
        <h1 className="text-3xl font-semibold tracking-wide text-monitoreo-light">LOGS</h1>
        <p className="text-sm text-monitoreo-text-secondary">Historial del sistema con filtros de analisis rapido.</p>
      </section>

      <Card className="bg-transparent shadow-none" title="Filtros Rapidos" subtitle="Ajusta tipo, IP, ruta y texto para acotar resultados.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-monitoreo-light">Tipo de Log</label>
            <button
              type="button"
              onClick={() => setIsTypeMenuOpen((prev) => !prev)}
              className="flex h-[42px] w-full items-center justify-between border border-monitoreo-border bg-transparent px-3 text-left text-sm text-monitoreo-light"
            >
              <span>{typeOptions.find((option) => option.value === filterType)?.label ?? 'Todos'}</span>
              <span className="ml-3 inline-flex h-4 w-4 shrink-0 items-center justify-center text-monitoreo-text-secondary">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 origin-center transition-transform duration-150 ${isTypeMenuOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            {isTypeMenuOpen ? (
              <div className="absolute z-20 mt-1 w-full border border-monitoreo-border bg-monitoreo-darker">
                {typeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFilterType(option.value);
                      setIsTypeMenuOpen(false);
                    }}
                    className={`h-[42px] w-full border-b border-monitoreo-border px-3 text-left text-sm last:border-b-0 ${
                      filterType === option.value
                        ? 'bg-monitoreo-card text-monitoreo-light'
                        : 'text-monitoreo-text-secondary hover:bg-monitoreo-card hover:text-monitoreo-light'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-monitoreo-light">Filtrar por IP</label>
            <input
              type="text"
              placeholder="192.168.1..."
              value={filterIP}
              onChange={(e) => setFilterIP(e.target.value)}
              className="h-[42px] w-full border border-monitoreo-border bg-transparent px-3 text-sm text-monitoreo-light placeholder-monitoreo-text-secondary focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-monitoreo-light">Filtrar por Ruta</label>
            <input
              type="text"
              placeholder="/api/..."
              value={filterRuta}
              onChange={(e) => setFilterRuta(e.target.value)}
              className="h-[42px] w-full border border-monitoreo-border bg-transparent px-3 text-sm text-monitoreo-light placeholder-monitoreo-text-secondary focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-monitoreo-light">Busqueda</label>
            <input
              type="text"
              placeholder="Buscar en logs..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-[42px] w-full border border-monitoreo-border bg-transparent px-3 text-sm text-monitoreo-light placeholder-monitoreo-text-secondary focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-monitoreo-border pt-4">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setFilterType('all');
              setIsTypeMenuOpen(false);
              setFilterIP('');
              setFilterRuta('');
              setSearchText('');
            }}
          >
            Limpiar Filtros
          </Button>
          <span className="text-sm text-monitoreo-text-secondary">{filteredLogs.length} registros encontrados</span>
        </div>
      </Card>

      <Card className="bg-transparent shadow-none" title="Historial de Eventos" subtitle="Traza de accesos, errores y logins en orden cronologico.">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-monitoreo-border">
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Tipo</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">IP</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Ruta</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Codigo</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Mensaje</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b border-monitoreo-border align-middle hover:bg-monitoreo-darker transition-colors">
                    <td className="px-3 py-3">
                      <Badge variant={getLogTypeColor(log.type) as any}>
                        {getLogTypeLabel(log.type)}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 font-mono text-monitoreo-light">{log.ip}</td>
                    <td className="px-3 py-3 text-monitoreo-light">{log.ruta}</td>
                    <td className="px-3 py-3">
                      <Badge variant={log.statusCode === 200 ? 'success' : log.statusCode === 401 || log.statusCode === 403 ? 'warning' : 'danger'}>
                        {log.statusCode}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-monitoreo-text-secondary">{log.message}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-monitoreo-text-secondary">
                      {new Date(log.timestamp).toLocaleTimeString('es-ES')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-3 py-10 text-center text-monitoreo-text-secondary">
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
