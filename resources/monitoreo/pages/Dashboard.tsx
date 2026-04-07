import React from 'react';
import { useMonitoring } from '@monitoreo/context/MonitoringContext';
import { Card } from '@monitoreo/components/ui/Card';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockTrafficData = [
  { time: '10:00', requests: 400, latency: 120 },
  { time: '10:05', requests: 450, latency: 125 },
  { time: '10:10', requests: 600, latency: 150 },
  { time: '10:15', requests: 800, latency: 250 },
  { time: '10:20', requests: 500, latency: 130 },
  { time: '10:25', requests: 420, latency: 110 },
  { time: '10:30', requests: 480, latency: 115 },
];

const mockErrorData = [
  { time: '10:00', error4xx: 12, error5xx: 0 },
  { time: '10:05', error4xx: 15, error5xx: 2 },
  { time: '10:10', error4xx: 25, error5xx: 5 },
  { time: '10:15', error4xx: 40, error5xx: 15 },
  { time: '10:20', error4xx: 18, error5xx: 1 },
  { time: '10:25', error4xx: 14, error5xx: 0 },
  { time: '10:30', error4xx: 10, error5xx: 0 },
];

const Dashboard: React.FC = () => {
  const { systemStatus, metrics } = useMonitoring();
  const metricItems = [
    { label: 'Estado Web', value: systemStatus.status.toUpperCase(), hint: 'tiempo real' },
    { label: 'Uptime', value: `${systemStatus.uptime.toFixed(2)}%`, hint: 'ultimas 24h' },
    { label: 'Latencia Avg', value: `${systemStatus.responseTime}ms`, hint: 'promedio' },
    { label: 'Req/Sec', value: metrics.requestsPerSecond.toFixed(0), hint: 'actual' },
    { label: 'Usuarios', value: String(metrics.activeUsers), hint: 'activos' },
  ];

  // Custom Tooltip para Recharts en estilo 8-bit
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-monitoreo-card pixel-border p-3">
          <p className="text-white font-mono mb-2">{`[ ${label} ]`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="font-sans text-sm">
              {entry.name.toUpperCase()}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5">
      <section className="space-y-2 border-b border-monitoreo-border pb-4">
        <h1 className="text-3xl font-semibold tracking-wide text-monitoreo-light">DASHBOARD</h1>
        <p className="text-sm text-monitoreo-text-secondary">Metricas y telemetria operativa en una sola vista.</p>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <div className="border border-monitoreo-border p-4 md:col-span-2">
          <p className="text-xs uppercase tracking-wide text-monitoreo-text-secondary">Estado General</p>
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-2xl font-semibold text-monitoreo-light">{systemStatus.status.toUpperCase()}</p>
            <div className="text-right text-xs text-monitoreo-text-secondary">
              <p>Uptime {systemStatus.uptime.toFixed(2)}%</p>
              <p>Latencia {systemStatus.responseTime}ms</p>
            </div>
          </div>
        </div>
        <div className="border border-monitoreo-border p-4">
          <p className="text-xs uppercase tracking-wide text-monitoreo-text-secondary">Errores Recientes</p>
          <p className="mt-3 text-2xl font-semibold text-monitoreo-light">{metrics.recentErrors}</p>
        </div>
        <div className="border border-monitoreo-border p-4">
          <p className="text-xs uppercase tracking-wide text-monitoreo-text-secondary">Ultimo Check</p>
          <p className="mt-3 text-2xl font-semibold text-monitoreo-light">
            {new Date(systemStatus.lastCheck).toLocaleTimeString('es-ES')}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        {metricItems.map((item) => (
          <article key={item.label} className="flex min-h-[108px] flex-col justify-between border border-monitoreo-border p-4">
            <p className="text-xs uppercase tracking-wide text-monitoreo-text-secondary">{item.label}</p>
            <p className="text-3xl font-semibold leading-none text-monitoreo-light">{item.value}</p>
            <p className="text-xs text-monitoreo-text-secondary">{item.hint}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="bg-transparent shadow-none">
          <h3 className="mb-4 text-base font-semibold uppercase tracking-wide text-monitoreo-light">Trafico vs Latencia</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" stroke="#AAA" tick={{fontFamily: 'VT323', fontSize: 16}} />
                <YAxis yAxisId="left" stroke="#E5E5E5" tick={{fontFamily: 'VT323', fontSize: 16}} />
                <YAxis yAxisId="right" orientation="right" stroke="#A3A3A3" tick={{fontFamily: 'VT323', fontSize: 16}} />
                <Tooltip content={<CustomTooltip />} />
                <Area yAxisId="left" type="step" dataKey="requests" name="Requests" stroke="#E5E5E5" fill="#E5E5E5" fillOpacity={0.2} strokeWidth={3} />
                <Area yAxisId="right" type="step" dataKey="latency" name="Latencia (ms)" stroke="#A3A3A3" fillOpacity={0} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-transparent shadow-none">
          <h3 className="mb-4 text-base font-semibold uppercase tracking-wide text-monitoreo-light">Incidencias 4xx / 5xx</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockErrorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" stroke="#AAA" tick={{fontFamily: 'VT323', fontSize: 16}} />
                <YAxis stroke="#AAA" tick={{fontFamily: 'VT323', fontSize: 16}} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="error4xx" name="Errores 4XX" stackId="a" fill="#D4D4D4" />
                <Bar dataKey="error5xx" name="Errores 5XX" stackId="a" fill="#737373" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="bg-transparent shadow-none">
          <h3 className="mb-4 text-base font-semibold uppercase tracking-wide text-monitoreo-light">Requests Recientes</h3>
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-monitoreo-border text-monitoreo-secondary">
                  <th className="py-2 text-left font-normal">METODO</th>
                  <th className="py-2 text-left font-normal">RUTA</th>
                  <th className="py-2 text-left font-normal">CODIGO</th>
                  <th className="py-2 text-left font-normal">TIEMPO</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-monitoreo-dark hover:bg-monitoreo-darker transition-colors">
                  <td className="py-2 text-monitoreo-light font-bold">GET</td>
                  <td className="py-2 text-white">/api/v1/users</td>
                  <td className="py-2"><span className="text-monitoreo-light">200</span></td>
                  <td className="py-2 text-monitoreo-secondary">45ms</td>
                </tr>
                <tr className="border-b border-monitoreo-dark hover:bg-monitoreo-darker transition-colors">
                  <td className="py-2 text-monitoreo-light font-bold">POST</td>
                  <td className="py-2 text-white">/api/v1/auth/login</td>
                  <td className="py-2"><span className="text-monitoreo-light">201</span></td>
                  <td className="py-2 text-monitoreo-secondary">120ms</td>
                </tr>
                <tr className="border-b border-monitoreo-dark hover:bg-monitoreo-darker transition-colors">
                  <td className="py-2 text-monitoreo-light font-bold">DELETE</td>
                  <td className="py-2 text-white">/api/v1/data/1029</td>
                  <td className="py-2"><span className="text-monitoreo-secondary">403</span></td>
                  <td className="py-2 text-monitoreo-secondary">32ms</td>
                </tr>
                <tr className="border-b border-monitoreo-dark hover:bg-monitoreo-darker transition-colors">
                  <td className="py-2 text-monitoreo-light font-bold">GET</td>
                  <td className="py-2 text-white">/api/v1/reports</td>
                  <td className="py-2"><span className="text-monitoreo-secondary">500</span></td>
                  <td className="py-2 text-monitoreo-secondary">2500ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="bg-transparent shadow-none">
          <h3 className="mb-4 text-base font-semibold uppercase tracking-wide text-monitoreo-light">Eventos y Alertas</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 border border-monitoreo-border p-3">
              <div className="mt-1 text-monitoreo-light">[]</div>
              <div>
                <p className="text-monitoreo-light font-bold font-sans">Caida Masiva en /api/v1/reports</p>
                <p className="text-monitoreo-secondary text-xs mt-1">Hace 2 minutos • 45 errores 5xx detectados originados por Timeout en DB.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border border-monitoreo-border p-3">
              <div className="mt-1 text-monitoreo-light">[]</div>
              <div>
                <p className="text-monitoreo-light font-bold font-sans">Pico de Trafico Inusual</p>
                <p className="text-monitoreo-secondary text-xs mt-1">Hace 15 minutos • Incremento del 200% superando límite base.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border border-monitoreo-border p-3">
              <div className="mt-1 text-monitoreo-light">[]</div>
              <div>
                <p className="text-monitoreo-light font-bold font-sans">Nuevo despliegue detectado</p>
                <p className="text-monitoreo-secondary text-xs mt-1">Hace 1 hora • Versión v2.1.0 online. Caché purgada.</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
