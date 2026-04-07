import React, { useState } from 'react';
import { Card } from '@monitoreo/components/ui/Card';
import { Badge } from '@monitoreo/components/ui/Badge';

interface UserSession {
  id: number;
  username: string;
  email: string;
  ip: string;
  status: 'online' | 'idle' | 'offline';
  lastActivity: string;
  loginTime: string;
  browser: string;
}

const mockUsers: UserSession[] = [
  {
    id: 1,
    username: 'admin@company.com',
    email: 'admin@company.com',
    ip: '192.168.1.100',
    status: 'online',
    lastActivity: new Date(Date.now() - 30000).toISOString(),
    loginTime: new Date(Date.now() - 3600000).toISOString(),
    browser: 'Chrome 120',
  },
  {
    id: 2,
    username: 'user.dev@company.com',
    email: 'adev@company.com',
    ip: '192.168.1.110',
    status: 'online',
    lastActivity: new Date(Date.now() - 200000).toISOString(),
    loginTime: new Date(Date.now() - 7200000).toISOString(),
    browser: 'Firefox 121',
  },
  {
    id: 3,
    username: 'analyst@company.com',
    email: 'analyst@company.com',
    ip: '192.168.1.115',
    status: 'idle',
    lastActivity: new Date(Date.now() - 900000).toISOString(),
    loginTime: new Date(Date.now() - 5400000).toISOString(),
    browser: 'Safari 17',
  },
  {
    id: 4,
    username: 'support@company.com',
    email: 'support@company.com',
    ip: '192.168.1.120',
    status: 'offline',
    lastActivity: new Date(Date.now() - 3600000).toISOString(),
    loginTime: new Date(Date.now() - 86400000).toISOString(),
    browser: 'Chrome 120',
  },
];

const Users: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'idle' | 'offline'>('all');

  const filteredUsers = mockUsers.filter(user => 
    filterStatus === 'all' || user.status === filterStatus
  );

  const getStatusColor = (status: 'online' | 'idle' | 'offline') => {
    switch (status) {
      case 'online': return 'success';
      case 'idle': return 'warning';
      case 'offline': return 'neutral';
      default: return 'neutral';
    }
  };

  const getStatusLabel = (status: 'online' | 'idle' | 'offline') => {
    switch (status) {
      case 'online': return 'En línea';
      case 'idle': return 'Inactivo';
      case 'offline': return 'Desconectado';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5">
      <section className="space-y-2 border-b border-monitoreo-border pb-4">
        <h1 className="text-3xl font-semibold tracking-wide text-monitoreo-light">USUARIOS</h1>
        <p className="text-sm text-monitoreo-text-secondary">Control de sesiones, actividad reciente y distribucion de clientes.</p>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <article className="flex min-h-[108px] flex-col justify-between border border-monitoreo-border p-4">
          <p className="text-xs uppercase tracking-wide text-monitoreo-text-secondary">Sesiones Activas</p>
          <p className="text-3xl font-semibold leading-none text-monitoreo-light">
            {mockUsers.filter((u) => u.status === 'online').length}
          </p>
          <p className="text-xs text-monitoreo-text-secondary">usuarios conectados ahora</p>
        </article>

        <article className="flex min-h-[108px] flex-col justify-between border border-monitoreo-border p-4">
          <p className="text-xs uppercase tracking-wide text-monitoreo-text-secondary">Usuarios Inactivos</p>
          <p className="text-3xl font-semibold leading-none text-monitoreo-light">
            {mockUsers.filter((u) => u.status === 'idle').length}
          </p>
          <p className="text-xs text-monitoreo-text-secondary">sin actividad reciente</p>
        </article>

        <article className="flex min-h-[108px] flex-col justify-between border border-monitoreo-border p-4">
          <p className="text-xs uppercase tracking-wide text-monitoreo-text-secondary">Total de Usuarios</p>
          <p className="text-3xl font-semibold leading-none text-monitoreo-light">{mockUsers.length}</p>
          <p className="text-xs text-monitoreo-text-secondary">sesiones registradas</p>
        </article>

        <article className="flex min-h-[108px] flex-col justify-between border border-monitoreo-border p-4">
          <p className="text-xs uppercase tracking-wide text-monitoreo-text-secondary">Tasa de Actividad</p>
          <p className="text-3xl font-semibold leading-none text-monitoreo-light">75%</p>
          <p className="text-xs text-monitoreo-text-secondary">+5% frente a ayer</p>
        </article>
      </section>

      <Card className="bg-transparent shadow-none" title="Filtro de Estado" subtitle="Ajusta la vista por presencia de sesion.">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { value: 'all' as const, label: 'Todos' },
            { value: 'online' as const, label: 'En linea' },
            { value: 'idle' as const, label: 'Inactivos' },
            { value: 'offline' as const, label: 'Desconectados' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilterStatus(option.value)}
              className={`inline-flex h-8 items-center border px-3 text-xs font-medium uppercase tracking-wide transition-colors ${
                filterStatus === option.value
                  ? 'border-monitoreo-light text-monitoreo-light'
                  : 'border-monitoreo-border text-monitoreo-text-secondary hover:text-monitoreo-light'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Card>

      <Card
        className="bg-transparent shadow-none"
        title="Sesiones de Usuarios"
        subtitle={`${filteredUsers.length} sesiones visibles en el estado seleccionado.`}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-monitoreo-border">
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Usuario</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Email</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Estado</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">IP</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Navegador</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Login</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Ultima Actividad</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-monitoreo-border align-middle transition-colors hover:bg-monitoreo-darker">
                  <td className="px-3 py-3 font-semibold text-monitoreo-light">{user.username}</td>
                  <td className="px-3 py-3 text-monitoreo-text-secondary">{user.email}</td>
                  <td className="px-3 py-3">
                    <Badge variant={getStatusColor(user.status)}>{getStatusLabel(user.status)}</Badge>
                  </td>
                  <td className="px-3 py-3 font-mono text-monitoreo-light">{user.ip}</td>
                  <td className="px-3 py-3 text-xs text-monitoreo-text-secondary">{user.browser}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-monitoreo-text-secondary">
                    {new Date(user.loginTime).toLocaleString('es-ES')}
                  </td>
                  <td className="px-3 py-3 text-monitoreo-text-secondary">
                    {user.status === 'online'
                      ? 'Ahora'
                      : user.status === 'idle'
                        ? 'Hace 15 min'
                        : new Date(user.lastActivity).toLocaleTimeString('es-ES')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="bg-transparent shadow-none" title="Ultimos Accesos" subtitle="Actividad mas reciente por sesion.">
          <div className="space-y-3">
            {mockUsers.slice(0, 5).map((user) => (
              <article key={user.id} className="grid grid-cols-[1fr_auto] items-center gap-3 border border-monitoreo-border p-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-monitoreo-light">{user.username}</p>
                  <p className="text-xs text-monitoreo-text-secondary">{user.ip} • {user.browser}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-sm text-monitoreo-light">{new Date(user.loginTime).toLocaleTimeString('es-ES')}</p>
                  <p className="text-xs text-monitoreo-text-secondary">
                    Hace {Math.floor((Date.now() - new Date(user.loginTime).getTime()) / 60000)} min
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card className="bg-transparent shadow-none" title="Distribucion de Navegadores" subtitle="Participacion por cliente de acceso.">
          <div className="space-y-4">
            {[
              { browser: 'Chrome', count: 45, percentage: 60 },
              { browser: 'Firefox', count: 20, percentage: 27 },
              { browser: 'Safari', count: 10, percentage: 13 },
            ].map((item) => (
              <article key={item.browser} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-monitoreo-light">{item.browser}</span>
                  <span className="text-xs text-monitoreo-text-secondary">{item.count} usuarios ({item.percentage}%)</span>
                </div>
                <div className="h-2 w-full border border-monitoreo-border">
                  <div className="h-full bg-monitoreo-light" style={{ width: `${item.percentage}%` }} />
                </div>
              </article>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Users;
