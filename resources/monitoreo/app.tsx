import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MonitoringProvider } from '@monitoreo/context/MonitoringContext';
import Layout from '@monitoreo/layouts/Layout';
import Dashboard from '@monitoreo/pages/Dashboard';
import Logs from '@monitoreo/pages/Logs';
import Security from '@monitoreo/pages/Security';
import Performance from '@monitoreo/pages/Performance';
import Users from '@monitoreo/pages/Users';
import Endpoints from '@monitoreo/pages/Endpoints';

const App = () => {
  return (
    <MonitoringProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/monitoreo" element={<Dashboard />} />
            <Route path="/monitoreo/logs" element={<Logs />} />
            <Route path="/monitoreo/seguridad" element={<Security />} />
            <Route path="/monitoreo/rendimiento" element={<Performance />} />
            <Route path="/monitoreo/usuarios" element={<Users />} />
            <Route path="/monitoreo/endpoints" element={<Endpoints />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </MonitoringProvider>
  );
};

const rootEl = document.getElementById('monitoreo-root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
}
