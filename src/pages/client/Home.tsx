import { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { OrderTicketModal } from '../../components/client/OrderTicketModal';
import { ChevronRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Order } from '../../types';

export const ClientHome = () => {
  const [isTicketOpen, setIsTicketOpen] = useState(false);

  const dummyOrder: Order = {
    id: "ord_12345",
    user_phone: "672 803 909",
    customer_name: "Cliente Alameda",
    items: [{ product_id: '1', name: 'Pollo Asado', variant_name: 'Pollo Entero', quantity: 1, price: 12.50 }],
    total: 12.50,
    notes: "",
    status: 'pending',
    created_at: new Date().toISOString()
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-body text-on-surface">
      <Navbar onCartClick={() => setIsTicketOpen(true)} cartCount={0} />

      {/* Hero Section Cinematográfica P1 Style */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo con Overlay Gradiente */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/images/hero-bg-premium.png" 
            alt="Brasas Asadero" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 animate-fade-in">
            <Flame size={16} className="text-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Artesanos de la Brasa</span>
          </div>
          
          <h2 className="text-[40px] md:text-[80px] font-headline font-black leading-none uppercase italic mb-6 animate-fade-in-up">
            El <span className="gold-gradient-text">Fuego</span> que <br/> Alimenta el Alma
          </h2>
          
          <p className="text-sm md:text-lg text-on-surface/60 font-body uppercase tracking-[0.3em] mb-12 max-w-2xl mx-auto leading-relaxed">
            Descubra la sinfonía de sabores de nuestro asado tradicional, <br className="hidden md:block"/> 
            preparado con pasión y servido con elegancia.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/menu"
              className="px-10 py-5 bg-primary text-black font-black uppercase tracking-[0.3em] text-xs flex items-center gap-3 hover:bg-yellow-400 transition-all hover:scale-105 shadow-2xl shadow-primary/20"
            >
              Ver La Carta <ChevronRight size={16} />
            </Link>
            
            <button 
              onClick={() => setIsTicketOpen(true)}
              className="text-on-surface/80 hover:text-primary font-black uppercase tracking-[0.3em] text-[10px] border-b border-primary/30 pb-1 transition-colors"
            >
              Probar Demo de Pedido
            </button>
          </div>
        </div>
      </section>

      {/* Sección Informativa Rápida */}
      <section className="py-24 px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        <div className="glass-panel p-10 text-center space-y-4 rounded-xl border-primary/10">
          <h4 className="font-headline italic text-xl text-primary">Producto Local</h4>
          <p className="text-xs uppercase tracking-widest leading-loose text-on-surface/50">Seleccionamos las mejores piezas de la región para garantizar frescura absoluta.</p>
        </div>
        <div className="glass-panel p-10 text-center space-y-4 rounded-xl border-primary/10">
          <h4 className="font-headline italic text-xl text-primary">Leña de Encina</h4>
          <p className="text-xs uppercase tracking-widest leading-loose text-on-surface/50">El aroma inconfundible de nuestra leña seleccionada impregna cada fibra.</p>
        </div>
        <div className="glass-panel p-10 text-center space-y-4 rounded-xl border-primary/10">
          <h4 className="font-headline italic text-xl text-primary">Receta Secreta</h4>
          <p className="text-xs uppercase tracking-widest leading-loose text-on-surface/50">Un adobo transmitido de padres a hijos para un sabor inigualable.</p>
        </div>
      </section>

      <Footer />

      <OrderTicketModal 
        isOpen={isTicketOpen} 
        onClose={() => setIsTicketOpen(false)} 
        order={dummyOrder} 
      />
    </div>
  );
};
