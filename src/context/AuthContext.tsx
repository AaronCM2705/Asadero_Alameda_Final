import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(() => {
    // Recuperar estado admin de localStorage al cargar para evitar parpadeos
    return localStorage.getItem('asadero_is_admin') === 'true';
  });

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (!error && data) {
        const isUserAdmin = data.role === 'admin';
        setIsAdmin(isUserAdmin);
        localStorage.setItem('asadero_is_admin', String(isUserAdmin));
      } else {
        setIsAdmin(false);
        localStorage.removeItem('asadero_is_admin');
      }
    } catch (err) {
      console.error("Error cargando perfil:", err);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // 1. Verificar sesión actual al cargar
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        await fetchUserProfile(currentUser.id);
      } else {
        setIsAdmin(false);
        localStorage.removeItem('asadero_is_admin');
        setLoading(false);
      }
    };

    initAuth();

    // 2. Escuchar cambios en la autenticación (Login, Logout, Token renovado)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth Event:", event);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        await fetchUserProfile(currentUser.id);
      } else {
        setIsAdmin(false);
        localStorage.removeItem('asadero_is_admin');
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserProfile]);

  const signOut = async () => {
    try {
      setLoading(true);
      
      // 1. Borrar explícitamente las claves de Supabase de localStorage PRIMERO
      // Así aseguramos que el usuario "desaparece" localmente al instante
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
      
      setUser(null);
      setIsAdmin(false);
      localStorage.removeItem('asadero_is_admin');

      // 2. Notificar al servidor en segundo plano (si falla no importa, ya estamos fuera localmente)
      supabase.auth.signOut().then(({ error }) => {
        if (error) console.error("Error devuelto por Supabase al salir:", error);
      });

    } catch (error) {
      console.error("Excepción al cerrar sesión:", error);
    } finally {
      setLoading(false);
      // Forzar recarga de página dura al final del proceso
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
