import { useState, type FC } from 'react';
import { ShoppingBag, Menu, X, LayoutDashboard, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onCartClick?: () => void;
  cartCount?: number;
}

export const Navbar: FC<NavbarProps> = ({ onCartClick, cartCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-10 h-[88px] bg-background/95 backdrop-blur-md border-b border-primary/20 transition-all duration-300">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/assets/images/logo-gold.png" 
              alt="Logo Asadero Alameda" 
              className="h-12 w-auto object-contain group-hover:scale-110 transition-transform" 
            />
            <span className="font-headline text-[24px] text-primary italic hidden sm:block">Asadero Alameda</span>
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-primary font-bold font-body text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">Inicio</Link>
          <Link to="/menu" className="text-on-surface/60 font-bold font-body text-xs uppercase tracking-[0.2em] hover:text-primary transition-colors">La Carta</Link>
          <Link to="/login-admin" className="text-on-surface/60 font-bold font-body text-xs uppercase tracking-[0.2em] hover:text-primary transition-colors flex items-center gap-2">
            <LayoutDashboard size={14} />
            Admin
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button 
            className="h-10 w-10 flex items-center justify-center text-on-surface/60 hover:text-primary transition-colors"
            title="Mi Cuenta"
          >
            <User size={20} />
          </button>
          
          <button 
            onClick={onCartClick} 
            className="h-12 w-12 flex items-center justify-center text-primary border border-primary/20 rounded-full hover:bg-primary/10 transition-all relative"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="md:hidden text-primary hover:opacity-80"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex flex-col p-10 animate-fade-in-scale">
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="absolute top-8 right-8 text-primary"
          >
            <X size={32} />
          </button>
          
          <div className="flex flex-col gap-8 mt-20 text-center">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-headline italic text-primary">Inicio</Link>
            <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-headline italic text-on-surface">La Carta</Link>
            <Link to="/login-admin" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-headline italic text-on-surface">Administración</Link>
          </div>
        </div>
      )}
    </>
  );
};
