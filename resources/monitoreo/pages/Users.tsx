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
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-monitoreo-light">Usuarios</h1>
        <p className="text-monitoreo-text-secondary">Gestión de sesiones activas y actividad de usuarios</p>
      </div>

      {/* Resumen de Sesiones */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="space-y-4">
            <p className="text-sm text-monitoreo-text-secondary">Sesiones Activas</p>
            <p className="text-3xl font-bold text-green-500">
              {mockUsers.filter(u => u.status === 'online').length}
            </p>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <p className="text-sm text-monitoreo-text-secondary">Usuarios Inactivos</p>
            <p className="text-3xl font-bold text-yellow-500">
              {mockUsers.filter(u => u.status === 'idle').length}
            </p>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <p className="text-sm text-monitoreo-text-secondary">Total de Usuarios</p>
            <p className="text-3xl font-bold text-monitoreo-primary">{mockUsers.length}</p>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <p className="text-sm text-monitoreo-text-secondary">Tasa de Actividad</p>
            <p className="text-3xl font-bold text-blue-500">75%</p>
            <p className="text-xs text-green-500">↑ 5% vs ayer</p>
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <div className="flex gap-2">
          <p className="text-sm text-monitoreo-text-secondary">Filtrar por estado:</p>
          {[
            { value: 'all' as const, label: 'Todos' },
            { value: 'online' as const, label: 'En línea' },
            { value: 'idle' as const, label: 'Inactivos' },
            { value: 'offline' as const, label: 'Desconectados' },
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setFilterStatus(option.value)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filterStatus === option.value
                  ? 'bg-monitoreo-primary bg-opacity-20 text-monitoreo-primary'
                  : 'bg-monitoreo-dark text-monitoreo-text-secondary hover:text-monitoreo-light'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Tabla de Sesiones Activas */}
      <Card title="Sesiones de Usuarios" subtitle={`${filteredUsers.length} sesiones`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-monitoreo-border">
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Usuario</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Email</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Estado</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">IP</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Navegador</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Login</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Última Actividad</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-monitoreo-border hover:bg-monitoreo-card transition-colors">
                  <td className="py-3 px-4 text-monitoreo-light font-semibold">{user.username}</td>
                  <td className="py-3 px-4 text-monitoreo-text-secondary">{user.email}</td>
                  <td className="py-3 px-4">
                    <Badge variant={getStatusColor(user.status)}>
                      {getStatusLabel(user.status)}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-monitoreo-light font-mono">{user.ip}</td>
                  <td className="py-3 px-4 text-monitoreo-text-secondary text-xs">{user.browser}</td>
                  <td className="py-3 px-4 text-monitoreo-text-secondary whitespace-nowrap">
                    {new Date(user.loginTime).toLocaleString('es-ES')}
                  </td>
                  <td className="py-3 px-4 text-monitoreo-text-secondary">
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

      {/* Historial de Accesos */}
      <Card title="Últimos Accesos">
        <div className="space-y-3">
          {mockUsers.slice(0, 5).map((user, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-monitoreo-dark rounded-lg border border-monitoreo-border hover:border-monitoreo-primary transition-colors">
              <div className="flex-1">
                <p className="font-semibold text-monitoreo-light">{user.username}</p>
                <p className="text-sm text-monitoreo-text-secondary mt-1">
                  {user.ip} • {user.browser}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-monitoreo-light">
                  {new Date(user.loginTime).toLocaleTimeString('es-ES')}
                </p>
                <p className="text-xs text-monitoreo-text-secondary mt-1">
                  Hace {Math.floor((Date.now() - new Date(user.loginTime).getTime()) / 60000)} min
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Distribución de Navegadores */}
      <Card title="Distribución de Navegadores">
        <div className="space-y-3">
          {[
            { browser: 'Chrome', count: 45, percentage: 60 },
            { browser: 'Firefox', count: 20, percentage: 27 },
            { browser: 'Safari', count: 10, percentage: 13 },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-monitoreo-light">{item.browser}</span>
                <span className="text-sm text-monitoreo-text-secondary">{item.count} usuarios ({item.percentage}%)</span>
              </div>
              <div className="w-full bg-monitoreo-dark rounded-full h-2">
                <div className="bg-monitoreo-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Users;
