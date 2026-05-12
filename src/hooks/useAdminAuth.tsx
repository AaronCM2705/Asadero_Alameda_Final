import { useState, useEffect } from 'react';

// En un futuro, esto comprobará el token de Supabase.
// Por ahora, simulamos un logueo simple guardado en el navegador.
export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('asadero_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (password: string) => {
    // Contraseña maestra temporal para la jefa (esto se cambiará en Supabase luego)
    if (password === 'Alameda2026') {
      localStorage.setItem('asadero_admin_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('asadero_admin_auth');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
};
