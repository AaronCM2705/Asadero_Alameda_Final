import { type ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClientHome } from './pages/client/Home';
import { Menu } from './pages/client/Menu';
import { AboutUs } from './pages/client/AboutUs';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { LoginAdmin } from './pages/admin/LoginAdmin';
import { useAdminAuth } from './hooks/useAdminAuth';
import { AnnouncementPopup } from './components/client/AnnouncementPopup';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { SpeedInsights } from "@vercel/speed-insights/react";

// Componente para proteger las rutas de la jefa
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) return <div className="min-h-screen bg-background text-primary flex items-center justify-center">Verificando seguridad...</div>;
  if (!isAuthenticated) return <Navigate to="/login-admin" replace />;

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SpeedInsights />
        <Router>
          <AnnouncementPopup />
          <Routes>
            {/* Rutas Públicas (Cliente) */}
            <Route path="/" element={<ClientHome />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/sobre-nosotros" element={<AboutUs />} />
            
            {/* Ruta Oculta de Login Administrativo */}
            <Route path="/login-admin" element={<LoginAdmin />} />
            
            {/* Rutas Privadas (Panel de la Jefa) */}
            <Route 
              path="/admin/*" 
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
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
