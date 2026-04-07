import React from 'react';
import { createRoot } from 'react-dom/client';

const MonitoreoApp = () => {
  return (
    <div className="monitoreo-card">
      <div className="flex justify-center mb-6">
        <svg 
          className="w-16 h-16 text-sky-500 monitoreo-glow-svg" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
        </svg>
      </div>

      <h1 className="text-3xl font-light mb-2 text-sky-100">MONITOREO</h1>
      <p className="text-sky-300 font-light text-sm mb-8">
        Aquí irá el dashboard de seguridad web, recolección de logs y analíticas en tiempo real.
      </p>

      <div className="w-full h-px bg-sky-500 opacity-30 my-6"></div>

      <p className="monitoreo-construction-text">En Construcción_</p>

      <a href="/" className="inline-block mt-8 text-xs text-sky-400 hover:text-sky-200 uppercase tracking-widest transition-colors duration-300">
        &gt; Volver a módulo Landing
      </a>
    </div>
  );
};

const rootEl = document.getElementById('monitoreo-root');
if (rootEl) {
  createRoot(rootEl).render(<MonitoreoApp />);
}
