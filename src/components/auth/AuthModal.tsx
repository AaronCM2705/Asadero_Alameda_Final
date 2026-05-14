import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Lock, User, ArrowRight, X, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } }
        });
        if (error) throw error;
      }
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al procesar la solicitud';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md glass-panel p-8 rounded-3xl border-white/10 shadow-2xl overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>

        <button onClick={onClose} aria-label="Cerrar ventana" className="absolute top-4 right-4 p-2 text-on-surface/80 hover:text-primary transition-colors">
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-headline italic gold-gradient-text uppercase">
            {isLogin ? 'Bienvenido de Nuevo' : 'Únete a la Familia'}
          </h2>
          <p className="text-[10px] text-on-surface/80 uppercase tracking-[0.2em] mt-2">
            {isLogin ? 'Accede a tus pedidos y perfil' : 'Regístrate para mejores beneficios'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
              <input
                type="text"
                placeholder="Nombre Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-surface/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-primary/50 outline-none transition-colors text-on-surface"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-primary/50 outline-none transition-colors text-on-surface"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-surface/50 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-sm focus:border-primary/50 outline-none transition-colors text-on-surface"
            />
            <button
              type="button"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-on-surface/80 hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl text-xs">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-black font-black uppercase tracking-[0.2em] py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-yellow-400 transition-all disabled:opacity-50"
          >
            {loading ? 'Procesando...' : isLogin ? 'Entrar' : 'Registrarme'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] text-on-surface/80 uppercase tracking-widest hover:text-primary transition-colors"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate gratis' : '¿Ya eres miembro? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};
