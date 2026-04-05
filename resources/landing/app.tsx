import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/app.css';

const LandingApp = () => {
  return (
    <div className="card-minimal">
      <div className="flex justify-center mb-6">
        {/* SVG Minimalista en vez de emojis */}
        <svg 
          className="w-16 h-16 text-orange-500 glow-svg" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      </div>

      <h1 className="text-3xl font-light mb-2 text-orange-100">LANDING PAGE</h1>
      <p className="text-orange-300 font-light text-sm mb-8">
        Aquí irá la página principal de gestión de certificados y validación.
      </p>

      <div className="w-full h-px bg-orange-500 opacity-30 my-6"></div>

      <p className="construction-text">En Construcción_</p>

      <a href="/monitoreo" className="inline-block mt-8 text-xs text-orange-400 hover:text-orange-200 uppercase tracking-widest transition-colors duration-300">
        &gt; Cargar módulo Monitoreo
      </a>
    </div>
  );
};

const rootEl = document.getElementById('landing-root');
if (rootEl) {
  createRoot(rootEl).render(<LandingApp />);
}
