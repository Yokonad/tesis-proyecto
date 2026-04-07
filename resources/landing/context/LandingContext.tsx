import React, { createContext, useContext } from 'react';
import type { LandingContextType } from '@landing/types/index';

const LandingContext = createContext<LandingContextType | undefined>(undefined);

const landingContextValue: LandingContextType = {
  platformName: 'Preventiva Peru',
  moduleName: 'Landing',
  status: 'active',
};

export const LandingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <LandingContext.Provider value={landingContextValue}>{children}</LandingContext.Provider>;
};

export const useLanding = (): LandingContextType => {
  const context = useContext(LandingContext);
  if (!context) {
    throw new Error('useLanding debe usarse dentro de LandingProvider');
  }
  return context;
};
