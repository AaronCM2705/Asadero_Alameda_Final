import { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, User as UserIcon, LogOut, ShieldCheck } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../context/AuthContext';
import { CartDrawer } from '../client/CartDrawer';
import { AuthModal } from '../auth/AuthModal';
import { Link, useLocation } from 'react-router-dom';
import { isSupabaseConfigured } from '../../lib/supabase';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { cartCount } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Verificar estado inicial al cargar
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    
    await signOut();
  };

  const navBackgroundClass = (isHome && !isScrolled) 
    ? 'bg-transparent py-2' 
    : 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-0';

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navBackgroundClass}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 md:h-24 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img src="/assets/images/logo-gold.png" alt="Asadero Alameda" className="h-8 md:h-10 w-auto group-hover:scale-110 transition-transform" />
              {!isSupabaseConfigured && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" title="Error de conexión"></span>
              )}
              {isSupabaseConfigured && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full opacity-40" title="Conectado"></span>
              )}
            </div>
            <div className="hidden md:block">
              <span className="block font-headline italic text-lg text-primary leading-none">Asadero Alameda</span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-on-surface/60 font-black">Fuego & Tradición</span>
            </div>
          </Link>

          {/* Nav Links Desktop */}
          <div className="hidden md:flex items-center gap-12">
            <Link to="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/60 hover:text-primary transition-colors">Inicio</Link>
            <Link to="/menu" className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/60 hover:text-primary transition-colors">La Carta</Link>
            <Link to="/sobre-nosotros" className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/60 hover:text-primary transition-colors">Sobre Nosotros</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-8">
            <button 
              onClick={() => setIsCartOpen(true)}
              aria-label="Abrir carrito"
              className="relative p-2 text-on-surface/80 hover:text-primary transition-colors group"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-black text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-fade-in border-2 border-background">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Access Real */}
            <div className="relative">
              {!user ? (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="hidden md:flex items-center gap-2 p-2 text-on-surface/80 hover:text-primary transition-colors group"
                >
                  <UserIcon size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Entrar</span>
                </button>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="hidden md:flex items-center gap-2 p-2 text-primary hover:text-yellow-400 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <UserIcon size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest max-w-[80px] truncate">
                      {user.user_metadata.full_name || user.email?.split('@')[0]}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-4 w-48 glass-panel border-white/10 rounded-2xl p-2 shadow-2xl animate-fade-in-up z-[100]">
                      {isAdmin && (
                        <Link 
                          to="/admin" 
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <ShieldCheck size={16} /> Panel Admin
                        </Link>
                      )}
                      <button 
                        onClick={(e) => {
                          console.log("Cerrando sesión...");
                          handleSignOut(e);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                      >
                        <LogOut size={16} /> Salir
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
              className="md:hidden text-primary p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden fixed inset-0 bg-background z-[60] flex flex-col items-center justify-center gap-12 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="text-2xl font-headline italic gold-gradient-text">Inicio</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/menu" className="text-2xl font-headline italic gold-gradient-text">La Carta</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/sobre-nosotros" className="text-2xl font-headline italic gold-gradient-text">Sobre Nosotros</Link>
          
          {!user ? (
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setIsAuthModalOpen(true); }}
              className="mt-8 bg-primary text-black px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest"
            >
              Entrar
            </button>
          ) : (
            <div className="flex flex-col items-center gap-6">
              {isAdmin && <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-black uppercase tracking-widest text-xs">Ir al Panel Admin</Link>}
              <button onClick={handleSignOut} className="text-red-400 font-black uppercase tracking-widest text-xs">Cerrar Sesión</button>
            </div>
          )}
          
          <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Cerrar menú" className="absolute top-8 right-8 text-on-surface/40 hover:text-white transition-colors"><X size={32} /></button>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
