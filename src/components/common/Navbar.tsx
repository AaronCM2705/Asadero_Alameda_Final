import { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { CartDrawer } from '../client/CartDrawer';
import { Link, useLocation } from 'react-router-dom';
import { isSupabaseConfigured } from '../../lib/supabase';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isHome ? 'bg-transparent' : 'bg-background/80 backdrop-blur-md border-b border-white/5'}`}>
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
              <span className="text-[8px] uppercase tracking-[0.4em] text-on-surface/40 font-black">Fuego & Tradición</span>
            </div>
          </Link>

          {/* Nav Links Desktop */}
          <div className="hidden md:flex items-center gap-12">
            <Link to="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/60 hover:text-primary transition-colors">Inicio</Link>
            <Link to="/menu" className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/60 hover:text-primary transition-colors">La Carta</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-8">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-on-surface/80 hover:text-primary transition-colors group"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-black text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-fade-in border-2 border-background">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-on-surface/40"><X size={32} /></button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
