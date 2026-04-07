import React from 'react';
import { Card } from '@monitoreo/components/ui/Card';
import { Badge } from '@monitoreo/components/ui/Badge';
import { Button } from '@monitoreo/components/ui/Button';

const Security: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-monitoreo-light">Seguridad</h1>
        <p className="text-monitoreo-text-secondary">Monitoreo de alertas de seguridad y patrones anómalos</p>
      </div>

      {/* Resumen de Seguridad */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="space-y-4">
            <p className="text-sm text-monitoreo-text-secondary">IPs Sospechosas</p>
            <p className="text-3xl font-bold text-orange-500">8</p>
            <div className="flex gap-2">
              <Badge variant="danger">3 Bloqueadas</Badge>
              <Badge variant="warning">5 Vigiladas</Badge>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <p className="text-sm text-monitoreo-text-secondary">Intentos Brute Force</p>
            <p className="text-3xl font-bold text-red-500">24</p>
            <div className="flex gap-2">
              <Badge variant="danger">Detectados hoy</Badge>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <p className="text-sm text-monitoreo-text-secondary">Patrones Anómalos</p>
            <p className="text-3xl font-bold text-yellow-500">12</p>
            <div className="flex gap-2">
              <Badge variant="warning">En investigación</Badge>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <p className="text-sm text-monitoreo-text-secondary">Score de Seguridad</p>
            <p className="text-3xl font-bold text-green-500">87/100</p>
            <div className="w-full bg-monitoreo-dark rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }} />
            </div>
          </div>
        </Card>
      </div>

      {/* IPs Sospechosas */}
      <Card title="IPs Sospechosas Detectadas">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-monitoreo-border">
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">IP</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Intentos Fallidos</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Riesgo</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Ubicación</th>
                <th className="text-left py-3 px-4 text-monitoreo-text-secondary font-semibold">Acción</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ip: '192.168.1.105', attempts: 45, risk: 'Alto', location: 'Desconocida' },
                { ip: '203.0.113.45', attempts: 23, risk: 'Medio', location: 'CN' },
                { ip: '198.51.100.12', attempts: 18, risk: 'Bajo', location: 'RU' },
              ].map((item, idx) => (
                <tr key={idx} className="border-b border-monitoreo-border hover:bg-monitoreo-card transition-colors">
                  <td className="py-3 px-4 text-monitoreo-light font-mono">{item.ip}</td>
                  <td className="py-3 px-4">{item.attempts}</td>
                  <td className="py-3 px-4">
                    <Badge variant={item.risk === 'Alto' ? 'danger' : item.risk === 'Medio' ? 'warning' : 'success'}>
                      {item.risk}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-monitoreo-text-secondary">{item.location}</td>
                  <td className="py-3 px-4">
                    <Button size="sm" variant="danger">Bloquear</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Intentos Brute Force */}
      <Card title="Intentos de Fuerza Bruta">
        <div className="space-y-3">
          {[
            { endpoint: '/auth/login', attempts: 45, status: 'Bloqueado' },
            { endpoint: '/admin/login', attempts: 23, status: 'Monitoreado' },
            { endpoint: '/api/auth/token', attempts: 12, status: 'Monitoreado' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-monitoreo-dark rounded-lg border border-monitoreo-border">
              <div>
                <p className="font-semibold text-monitoreo-light">{item.endpoint}</p>
                <p className="text-sm text-monitoreo-text-secondary">{item.attempts} intentos en las últimas 24h</p>
              </div>
              <Badge variant={item.status === 'Bloqueado' ? 'danger' : 'warning'}>
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Patrones Anómalos */}
      <Card title="Patrones Anómalos Detectados">
        <div className="space-y-3">
          {[
            {
              pattern: 'Tráfico inusual desde máquina local',
              description: 'Incremento del 250% en requests comparado con el promedio',
              severity: 'Medio',
              timestamp: new Date(Date.now() - 600000).toLocaleTimeString('es-ES'),
            },
            {
              pattern: 'Múltiples accesos a recursos sensibles',
              description: 'Usuario admin accediendo a archivos de configuración',
              severity: 'Alto',
              timestamp: new Date(Date.now() - 1800000).toLocaleTimeString('es-ES'),
            },
            {
              pattern: 'Cambios en patrones de acceso',
              description: 'Usuario típicamente nocturno accediendo a horas diurnas',
              severity: 'Bajo',
              timestamp: new Date(Date.now() - 3600000).toLocaleTimeString('es-ES'),
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-monitoreo-dark rounded-lg border-l-4 border-yellow-500">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-monitoreo-light">{item.pattern}</p>
                  <p className="text-sm text-monitoreo-text-secondary mt-1">{item.description}</p>
                </div>
                <Badge variant={item.severity === 'Alto' ? 'danger' : item.severity === 'Medio' ? 'warning' : 'success'}>
                  {item.severity}
                </Badge>
              </div>
              <p className="text-xs text-monitoreo-text-secondary">{item.timestamp}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Security;
