import React from 'react';
import { SectionCard } from '@landing/components/ui/SectionCard';

const Home: React.FC = () => {
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.22em] text-landing-primary">Modulo Publico</p>
        <h2 className="text-4xl font-bold text-landing-light">Landing de Preventiva</h2>
        <p className="max-w-2xl text-base text-landing-text-secondary">
          Punto de entrada para certificaciones, validacion y acceso al ecosistema. Esta estructura queda lista para evolucionar con React + Tailwind + TypeScript, manteniendo aislamiento total del modulo de monitoreo.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <SectionCard title="Autenticacion" description="Flujo inicial de acceso y validacion de sesiones." />
        <SectionCard title="Certificados" description="Consulta y gestion de certificados digitales de seguridad." />
        <SectionCard title="Navegacion" description="Entrada controlada al dashboard de monitoreo operativo." />
      </div>
    </section>
  );
};

export default Home;
