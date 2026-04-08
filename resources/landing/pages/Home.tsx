import React from 'react';
import { FeatureCard } from '@landing/components/ui/FeatureCard';
import { 
  ChevronRight, Activity, Flame, HeartPulse, HardHat, 
  ClipboardCheck, Wrench, FileCheck, Phone, Mail, MapPin 
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-0 pb-0 pt-16">

      {/* ═══════════════ HERO ═══════════════ */}
      <section id="inicio" className="relative flex flex-col items-center justify-center text-center py-28 md:py-36 animate-landing-slide-up">
        {/* Background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[500px] bg-landing-primary-glow blur-[140px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-landing-accent-glow blur-[100px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-landing-gold-glow blur-[80px] rounded-full pointer-events-none -z-10"></div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-landing-accent/30 bg-landing-card/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-landing-gold shadow-sm backdrop-blur">
          <Activity className="h-4 w-4 animate-pulse" />
          <span>Protección Integral</span>
        </div>

        <h2 className="mb-4 max-w-4xl text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-landing-light via-landing-gold to-landing-primary sm:text-6xl lg:text-7xl">
          Seguridad, Nuestra Prioridad
        </h2>
        
        <p className="mb-10 text-xl text-landing-text-secondary italic font-light sm:text-2xl">
          Preventiva, siempre contigo.
        </p>

        <a 
          href="#contacto"
          className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-landing-primary px-10 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_40px_rgba(253,71,13,0.4)] transition-all hover:scale-105 hover:bg-landing-primary-light hover:shadow-[0_0_60px_rgba(253,71,13,0.6)] focus:outline-none"
        >
          <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></span>
          Contáctanos
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </section>

      {/* ═══════════════ SERVICIOS ═══════════════ */}
      <section id="servicios" className="scroll-mt-24 py-24 space-y-14">
        <div className="text-center">
          <h3 className="text-3xl font-black uppercase tracking-wide text-landing-light sm:text-4xl">Nuestros Servicios</h3>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-landing-primary"></div>
          <p className="mt-6 max-w-2xl mx-auto text-landing-text-secondary leading-relaxed">
            Estamos trabajando cada día para ofrecerles un servicio aún mejor y para expandir 
            continuamente nuestra área de trabajo, con el objetivo de aumentar nuestra eficiencia 
            y garantizar la confiabilidad que ustedes merecen.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard 
            title="Planes de Emergencia" 
            description="Desarrollo e implementación de planes integrales para afrontar sismos, incendios y evacuaciones con protocolos validados."
            icon={Flame}
            delay={100}
          />
          <FeatureCard 
            title="Salud Ocupacional" 
            description="Exámenes médicos ocupacionales, vigilancia epidemiológica y monitoreo de factores de riesgo laboral."
            icon={HeartPulse}
            delay={150}
          />
          <FeatureCard 
            title="Capacitaciones" 
            description="Formación certificada en trabajos de alto riesgo: altura, espacios confinados y materiales peligrosos."
            icon={HardHat}
            delay={200}
          />
          <FeatureCard 
            title="Inspecciones de Seguridad" 
            description="Evaluación técnica de instalaciones, equipos y condiciones de trabajo para identificar riesgos potenciales."
            icon={ClipboardCheck}
            delay={250}
          />
          <FeatureCard 
            title="Mantenimiento Preventivo" 
            description="Elaboración y ejecución de planes de mantenimiento para equipos críticos y sistemas de protección."
            icon={Wrench}
            delay={300}
          />
          <FeatureCard 
            title="Auditorías y Certificación" 
            description="Procesos de auditoría interna y acompañamiento para la obtención de certificaciones de seguridad."
            icon={FileCheck}
            delay={350}
          />
        </div>
      </section>

      {/* ═══════════════ NOSOTROS ═══════════════ */}
      <section id="nosotros" className="scroll-mt-24 py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-landing-accent">Sobre Nosotros</p>
              <h3 className="text-3xl font-black uppercase tracking-wide text-landing-light sm:text-4xl">¿Quiénes Somos?</h3>
              <div className="mt-3 h-1 w-16 rounded-full bg-landing-primary"></div>
            </div>
            <p className="text-landing-text-secondary leading-relaxed">
              Somos una empresa peruana especializada en brindar soluciones integrales en seguridad industrial, 
              salud ocupacional y medio ambiente. Con más de 15 años de experiencia, nos dedicamos a proteger 
              lo más valioso de cada organización: su gente.
            </p>
            <p className="text-landing-text-secondary leading-relaxed">
              Nuestro equipo de profesionales altamente capacitados trabaja día a día para garantizar 
              ambientes laborales seguros, cumpliendo con las normativas nacionales e internacionales vigentes.
            </p>
            
            {/* Stats inline */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="rounded-xl border border-landing-border bg-landing-card/40 p-4 text-center backdrop-blur">
                <p className="text-2xl font-extrabold text-landing-primary">500+</p>
                <p className="mt-1 text-xs text-landing-text-secondary">Empresas Protegidas</p>
              </div>
              <div className="rounded-xl border border-landing-border bg-landing-card/40 p-4 text-center backdrop-blur">
                <p className="text-2xl font-extrabold text-landing-gold">10K+</p>
                <p className="mt-1 text-xs text-landing-text-secondary">Capacitaciones</p>
              </div>
              <div className="rounded-xl border border-landing-border bg-landing-card/40 p-4 text-center backdrop-blur">
                <p className="text-2xl font-extrabold text-landing-accent">99%</p>
                <p className="mt-1 text-xs text-landing-text-secondary">Satisfacción</p>
              </div>
              <div className="rounded-xl border border-landing-border bg-landing-card/40 p-4 text-center backdrop-blur">
                <p className="text-2xl font-extrabold text-landing-light">15+</p>
                <p className="mt-1 text-xs text-landing-text-secondary">Años de Experiencia</p>
              </div>
            </div>
          </div>
          
          {/* Right: Visual element */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-landing-primary-glow blur-[80px] rounded-full opacity-30"></div>
            <div className="relative w-full max-w-sm rounded-2xl border border-landing-border bg-landing-card/60 p-8 backdrop-blur space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-landing-primary/20">
                  <Flame className="h-6 w-6 text-landing-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-landing-light">Misión</p>
                  <p className="text-xs text-landing-text-secondary">Proteger vidas y generar cultura de prevención</p>
                </div>
              </div>
              <div className="h-px bg-landing-border"></div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-landing-gold/20">
                  <Activity className="h-6 w-6 text-landing-gold" />
                </div>
                <div>
                  <p className="text-sm font-bold text-landing-light">Visión</p>
                  <p className="text-xs text-landing-text-secondary">Ser referentes en seguridad a nivel nacional</p>
                </div>
              </div>
              <div className="h-px bg-landing-border"></div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-landing-accent/20">
                  <HeartPulse className="h-6 w-6 text-landing-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-landing-light">Valores</p>
                  <p className="text-xs text-landing-text-secondary">Compromiso, integridad y excelencia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACTO ═══════════════ */}
      <section id="contacto" className="scroll-mt-24 py-24">
        <div className="text-center mb-14">
          <h3 className="text-3xl font-black uppercase tracking-wide text-landing-light sm:text-4xl">Contáctanos</h3>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-landing-primary"></div>
          <p className="mt-6 max-w-xl mx-auto text-landing-text-secondary">
            ¿Tienes dudas o necesitas una cotización? No dudes en comunicarte con nosotros.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="group rounded-2xl border border-landing-border bg-landing-card/40 p-8 text-center backdrop-blur transition-all hover:border-landing-primary/40 hover:shadow-[0_0_30px_rgba(253,71,13,0.1)]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-landing-primary/15">
              <Phone className="h-6 w-6 text-landing-primary" />
            </div>
            <p className="text-sm font-bold text-landing-light mb-1">Teléfono</p>
            <p className="text-sm text-landing-text-secondary">+51 999 999 999</p>
          </div>
          <div className="group rounded-2xl border border-landing-border bg-landing-card/40 p-8 text-center backdrop-blur transition-all hover:border-landing-gold/40 hover:shadow-[0_0_30px_rgba(255,208,115,0.1)]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-landing-gold/15">
              <Mail className="h-6 w-6 text-landing-gold" />
            </div>
            <p className="text-sm font-bold text-landing-light mb-1">Correo</p>
            <p className="text-sm text-landing-text-secondary">info@preventivaperu.pe</p>
          </div>
          <div className="group rounded-2xl border border-landing-border bg-landing-card/40 p-8 text-center backdrop-blur transition-all hover:border-landing-accent/40 hover:shadow-[0_0_30px_rgba(115,122,77,0.1)]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-landing-accent/15">
              <MapPin className="h-6 w-6 text-landing-accent" />
            </div>
            <p className="text-sm font-bold text-landing-light mb-1">Ubicación</p>
            <p className="text-sm text-landing-text-secondary">Lima, Perú</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
