import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClientHome } from './pages/client/Home';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { LoginAdmin } from './pages/admin/LoginAdmin';
import { useAdminAuth } from './hooks/useAdminAuth';

// Componente para proteger las rutas de la jefa
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) return <div className="min-h-screen bg-background text-primary flex items-center justify-center">Verificando seguridad...</div>;
  if (!isAuthenticated) return <Navigate to="/login-admin" replace />;

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas (Cliente) */}
        <Route path="/" element={<ClientHome />} />
        
        {/* Ruta Oculta de Login */}
        <Route path="/login-admin" element={<LoginAdmin />} />
        
        {/* Rutas Privadas (Panel de la Jefa) */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Si escriben algo raro, los mandamos al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
