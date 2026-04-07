import React from 'react';
import { Card } from '@monitoreo/components/ui/Card';
import { Badge } from '@monitoreo/components/ui/Badge';

const Security: React.FC = () => {
  const overview = [
    { label: 'IPs Sospechosas', value: '8', hint: '3 bloqueadas / 5 vigiladas' },
    { label: 'Brute Force', value: '24', hint: 'eventos en 24h' },
    { label: 'Patrones Anomalos', value: '12', hint: 'en investigacion' },
    { label: 'Score Seguridad', value: '87/100', hint: 'estabilidad actual' },
  ];

  const suspiciousIps = [
    { ip: '192.168.1.105', attempts: 45, risk: 'Alto', location: 'Desconocida', detection: 94 },
    { ip: '203.0.113.45', attempts: 23, risk: 'Medio', location: 'CN', detection: 68 },
    { ip: '198.51.100.12', attempts: 18, risk: 'Bajo', location: 'RU', detection: 36 },
  ];

  const bruteForce = [
    { endpoint: '/auth/login', attempts: 45, status: 'Bloqueado' },
    { endpoint: '/admin/login', attempts: 23, status: 'Monitoreado' },
    { endpoint: '/api/auth/token', attempts: 12, status: 'Monitoreado' },
  ];

  const anomalies = [
    {
      pattern: 'Trafico inusual desde maquina local',
      description: 'Incremento del 250% en requests comparado con el promedio.',
      severity: 'Medio',
      timestamp: new Date(Date.now() - 600000).toLocaleTimeString('es-ES'),
    },
    {
      pattern: 'Multiples accesos a recursos sensibles',
      description: 'Usuario admin accediendo a archivos de configuracion.',
      severity: 'Alto',
      timestamp: new Date(Date.now() - 1800000).toLocaleTimeString('es-ES'),
    },
    {
      pattern: 'Cambios en patrones de acceso',
      description: 'Usuario nocturno accediendo en horario diurno.',
      severity: 'Bajo',
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString('es-ES'),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5">
      <section className="space-y-2 border-b border-monitoreo-border pb-4">
        <h1 className="text-3xl font-semibold tracking-wide text-monitoreo-light">SEGURIDAD</h1>
        <p className="text-sm text-monitoreo-text-secondary">Control de riesgo, intentos de acceso y patrones anormales.</p>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-4">
        {overview.map((item) => (
          <article key={item.label} className="flex min-h-[108px] flex-col justify-between border border-monitoreo-border p-4">
            <p className="text-xs uppercase tracking-wide text-monitoreo-text-secondary">{item.label}</p>
            <p className="text-3xl font-semibold leading-none text-monitoreo-light">{item.value}</p>
            <p className="text-xs text-monitoreo-text-secondary">{item.hint}</p>
          </article>
        ))}
      </section>

      <Card className="bg-transparent shadow-none" title="IPs Sospechosas Detectadas" subtitle="Origenes con actividad potencialmente maliciosa.">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-monitoreo-border">
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">IP</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Intentos</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Riesgo</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Ubicacion</th>
                <th className="px-3 py-3 text-left font-medium text-monitoreo-text-secondary">Deteccion %</th>
              </tr>
            </thead>
            <tbody>
              {suspiciousIps.map((item, idx) => (
                <tr key={idx} className="border-b border-monitoreo-border align-middle hover:bg-monitoreo-darker transition-colors">
                  <td className="px-3 py-3 font-mono text-monitoreo-light">{item.ip}</td>
                  <td className="px-3 py-3 text-monitoreo-light">{item.attempts}</td>
                  <td className="px-3 py-3">
                    <Badge variant={item.risk === 'Alto' ? 'danger' : item.risk === 'Medio' ? 'warning' : 'success'}>
                      {item.risk}
                    </Badge>
                  </td>
                  <td className="px-3 py-3 text-monitoreo-text-secondary">{item.location}</td>
                  <td className={`px-3 py-3 font-semibold ${
                    item.risk === 'Alto' ? 'text-monitoreo-danger' : item.risk === 'Medio' ? 'text-monitoreo-warning' : 'text-monitoreo-success'
                  }`}>{item.detection}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="bg-transparent shadow-none" title="Intentos de Fuerza Bruta" subtitle="Ataques repetitivos sobre endpoints de autenticacion.">
          <div className="space-y-3">
            {bruteForce.map((item, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_auto] items-center gap-3 border border-monitoreo-border p-3">
                <div>
                  <p className="text-sm font-semibold text-monitoreo-light">{item.endpoint}</p>
                  <p className="text-xs text-monitoreo-text-secondary">{item.attempts} intentos en las ultimas 24h</p>
                </div>
                <Badge variant={item.status === 'Bloqueado' ? 'danger' : 'warning'}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-transparent shadow-none" title="Patrones Anomalos Detectados" subtitle="Eventos de comportamiento fuera de la linea base.">
          <div className="space-y-3">
            {anomalies.map((item, idx) => (
              <div key={idx} className="border border-monitoreo-border p-3">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-monitoreo-light">{item.pattern}</p>
                  <Badge variant={item.severity === 'Alto' ? 'danger' : item.severity === 'Medio' ? 'warning' : 'success'}>
                    {item.severity}
                  </Badge>
                </div>
                <p className="text-sm text-monitoreo-text-secondary">{item.description}</p>
                <p className="mt-2 text-xs text-monitoreo-text-secondary">{item.timestamp}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Security;
