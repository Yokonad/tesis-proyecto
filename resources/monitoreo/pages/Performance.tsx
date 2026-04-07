import React from 'react';
import { Card } from '@monitoreo/components/ui/Card';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const mockVitalsData = [
  { time: '10:00', lcp: 2.1, fcp: 0.8, cls: 0.05 },
  { time: '10:05', lcp: 1.9, fcp: 0.7, cls: 0.04 },
  { time: '10:10', lcp: 2.4, fcp: 0.9, cls: 0.06 },
  { time: '10:15', lcp: 3.1, fcp: 1.2, cls: 0.12 },
  { time: '10:20', lcp: 2.2, fcp: 0.8, cls: 0.05 },
  { time: '10:25', lcp: 2.0, fcp: 0.7, cls: 0.04 },
];

const Performance: React.FC = () => {
  const overviewItems = [
    { label: 'Avg. LCP', value: '2.1s', hint: 'largest contentful paint' },
    { label: 'Avg. FCP', value: '0.8s', hint: 'first contentful paint' },
    { label: 'TTFB', value: '120ms', hint: 'time to first byte' },
  ];

  const latencyBreakdown = [
    { label: 'DNS Lookup', width: '12%' },
    { label: 'TLS Negociation', width: '35%' },
    { label: 'Server Processing', width: '65%' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="border border-monitoreo-border bg-monitoreo-darker p-3">
          <p className="mb-2 text-sm text-monitoreo-light">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}s
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
        <h1 className="text-3xl font-semibold tracking-wide text-monitoreo-light">RENDIMIENTO</h1>
        <p className="text-sm text-monitoreo-text-secondary">Core Web Vitals y tiempos de carga organizados en una vista de control.</p>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {overviewItems.map((item) => (
          <article key={item.label} className="flex min-h-[108px] flex-col justify-between border border-monitoreo-border p-4">
            <p className="text-xs uppercase tracking-wide text-monitoreo-text-secondary">{item.label}</p>
            <p className="text-3xl font-semibold leading-none text-monitoreo-light">{item.value}</p>
            <p className="text-xs text-monitoreo-text-secondary">{item.hint}</p>
          </article>
        ))}
      </section>

      <Card className="bg-transparent shadow-none" title="Core Web Vitals Timeline" subtitle="Evolucion de LCP y FCP por ventana temporal.">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockVitalsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#AAA" tick={{fontFamily: 'VT323', fontSize: 16}} />
              <YAxis stroke="#AAA" tick={{fontFamily: 'VT323', fontSize: 16}} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="stepAfter" dataKey="lcp" name="LCP" stroke="#F59E0B" strokeWidth={3} dot={false} />
              <Line type="stepAfter" dataKey="fcp" name="FCP" stroke="#22C55E" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="bg-transparent shadow-none" title="Latencia de Red y Backend" subtitle="Distribucion de tiempos por etapa del request.">
         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {latencyBreakdown.map((item) => (
              <div key={item.label}>
                <p className="mb-2 text-sm text-monitoreo-text-secondary">{item.label}</p>
                <div className="h-4 w-full border border-monitoreo-border bg-monitoreo-darker">
                  <div className="h-full bg-monitoreo-warning" style={{ width: item.width }} />
                </div>
              </div>
            ))}
         </div>
      </Card>
    </div>
  );
};

export default Performance;
