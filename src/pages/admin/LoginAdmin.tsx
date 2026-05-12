import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { Lock, ShieldAlert } from 'lucide-react';

export const LoginAdmin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Luces de fondo estilo premium */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-96 bg-primary/10 blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-sm glass-panel p-8 rounded-lg border border-primary/20 z-10 shadow-2xl shadow-primary/5">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-surface border border-primary/30 flex items-center justify-center mb-4">
            <Lock className="text-primary" size={28} />
          </div>
          <h1 className="text-xl font-headline gold-gradient-text uppercase tracking-widest text-center">
            Acceso Autorizado
          </h1>
          <p className="text-[10px] text-on-surface/50 uppercase tracking-widest mt-2">Área de Administración</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="Contraseña Maestra"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-on-surface/10 rounded-sm px-4 py-3 text-center text-on-surface font-body tracking-[0.2em] focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 text-red-500 bg-red-500/10 py-2 rounded-sm text-[10px] uppercase font-bold tracking-wider">
              <ShieldAlert size={14} />
              Acceso Denegado
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary/90 hover:bg-primary text-black font-black uppercase tracking-[0.3em] text-xs py-4 rounded-sm transition-all hover:shadow-[0_0_20px_rgba(184,134,11,0.4)]"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};
