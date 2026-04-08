import React, { useState } from 'react';
import { useLanding } from '@landing/context/LandingContext';
import { ShieldCheck, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contáctanos', href: '#contacto' },
];

export const TopBar: React.FC = () => {
  const { platformName } = useLanding();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 animate-landing-fade-in">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-landing-primary shadow-[0_0_20px_rgba(253,71,13,0.3)] transition-shadow group-hover:shadow-[0_0_30px_rgba(253,71,13,0.5)]">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-wide text-landing-light leading-tight">Preventiva</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-landing-primary">Perú</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-semibold text-landing-text-secondary transition-colors hover:text-landing-light relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-landing-primary transition-all duration-300 group-hover:left-1/4 group-hover:w-1/2"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-landing-border text-landing-text-secondary hover:text-landing-light hover:border-landing-primary transition-colors"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-landing-border bg-landing-dark/95 backdrop-blur-lg px-6 py-4 animate-landing-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-semibold text-landing-text-secondary transition-colors hover:text-landing-primary border-b border-landing-border/30 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};


