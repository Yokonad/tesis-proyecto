import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingProvider } from '@landing/context/LandingContext';
import Layout from '@landing/layouts/Layout';
import Home from '@landing/pages/Home';

const App = () => {
  return (
    <LandingProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landing" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </LandingProvider>
  );
};

const rootEl = document.getElementById('landing-root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
}
