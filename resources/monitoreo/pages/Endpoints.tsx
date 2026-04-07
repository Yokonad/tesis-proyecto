import React from 'react';
import { Card } from '@monitoreo/components/ui/Card';
import { Badge } from '@monitoreo/components/ui/Badge';

const Endpoints: React.FC = () => {
  const summary = [
    { label: 'Endpoints monitoreados', value: '28', hint: 'activos' },
    { label: 'Rutas lentas', value: '3', hint: 'avg > 500ms' },
    { label: 'Rutas con fallos', value: '3', hint: 'rate > 5%' },
    { label: 'Salud general', value: '89%', hint: 'estabilidad' },
  ];

  const slowRoutes = [
    { path: '/api/v1/reports/monthly', ms: 1250, method: 'GET' },
    { path: '/api/v1/data/sync', ms: 890, method: 'POST' },
    { path: '/api/v1/auth/verify', ms: 650, method: 'POST' },
  ];

  const errorRoutes = [
    { path: '/api/v1/payments/process', err: '12%', method: 'POST' },
    { path: '/api/v1/upload/image', err: '8.5%', method: 'PUT' },
    { path: '/api/v1/users/import', err: '5.2%', method: 'POST' },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5">
      <section className="space-y-2 border-b border-monitoreo-border pb-4">
        <h1 className="text-3xl font-semibold tracking-wide text-monitoreo-light">ENDPOINTS</h1>
        <p className="text-sm text-monitoreo-text-secondary">Analisis de trafico de API, tiempos de respuesta y tasa de error por ruta.</p>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-4">
        {summary.map((item) => (
          <article key={item.label} className="flex min-h-[108px] flex-col justify-between border border-monitoreo-border p-4">
            <p className="text-xs uppercase tracking-wide text-monitoreo-text-secondary">{item.label}</p>
            <p className="text-3xl font-semibold leading-none text-monitoreo-light">{item.value}</p>
            <p className="text-xs text-monitoreo-text-secondary">{item.hint}</p>
          </article>
        ))}
      </section>

      <section>
        <div className="w-full border border-monitoreo-border bg-transparent px-4 py-3">
          <input
            type="text"
            placeholder="Buscar endpoint (ej. /api/users)..."
            className="h-[34px] w-full bg-transparent text-sm text-monitoreo-light placeholder-monitoreo-text-secondary outline-none"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="bg-transparent shadow-none" title="Rutas Mas Lentas" subtitle="Endpoints con mayor latencia promedio.">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-monitoreo-text-secondary">Ordenado por respuesta</span>
            <Badge variant="info">AVG &gt; 500ms</Badge>
          </div>
          <div className="space-y-3">
            {slowRoutes.map((route, i) => (
               <div key={i} className="grid grid-cols-[92px_1fr_96px] items-center gap-3 border border-monitoreo-border p-3">
                 <span className="text-sm font-semibold text-monitoreo-light">{route.method}</span>
                 <span className="truncate font-mono text-sm text-monitoreo-light">{route.path}</span>
                 <span className="text-right text-sm font-semibold text-monitoreo-light">{route.ms}ms</span>
               </div>
            ))}
          </div>
        </Card>

        <Card className="bg-transparent shadow-none" title="Rutas con Fallos" subtitle="Endpoints con mayor porcentaje de error.">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-monitoreo-text-secondary">Ordenado por tasa de error</span>
            <Badge variant="info">RATE &gt; 5%</Badge>
          </div>
          <div className="space-y-3">
            {errorRoutes.map((route, i) => (
               <div key={i} className="grid grid-cols-[92px_1fr_96px] items-center gap-3 border border-monitoreo-border p-3">
                 <span className="text-sm font-semibold text-monitoreo-light">{route.method}</span>
                 <span className="truncate font-mono text-sm text-monitoreo-light">{route.path}</span>
                 <span className="text-right text-sm font-semibold text-monitoreo-secondary">{route.err}</span>
               </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Endpoints;
