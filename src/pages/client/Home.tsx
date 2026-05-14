import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { ChevronRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ClientHome = () => {

  return (
    <div className="min-h-screen bg-background flex flex-col font-body text-on-surface">
      <Navbar />

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 animate-fade-in-up-smooth">
            <Flame size={16} className="text-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Artesanos de la Brasa</span>
          </div>
          
          <h2 className="text-[40px] md:text-[80px] font-headline font-black leading-none uppercase italic mb-6 animate-fade-in-up-smooth delay-100">
            El <span className="gold-gradient-text">Fuego</span> que <br/> Alimenta el Alma
          </h2>
          
          <p className="text-sm md:text-lg text-on-surface/60 font-body uppercase tracking-[0.3em] mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-smooth delay-200">
            Descubra la sinfonía de sabores de nuestro asado tradicional, <br className="hidden md:block"/> 
            preparado con pasión y servido con elegancia.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/menu"
              className="px-10 py-5 bg-primary text-black font-black uppercase tracking-[0.3em] text-xs flex items-center gap-3 hover:bg-[#F3D576] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] animate-fade-in-up-smooth delay-300 group"
            >
              Ver La Carta <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            
          </div>
        </div>
      </section>

      {/* Sección Informativa Rápida */}
      <section className="py-24 px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        <div className="glass-panel p-10 text-center space-y-4 rounded-xl border-primary/10 hover:border-primary/40 transition-colors duration-500 hover:-translate-y-2 animate-slide-in-right delay-100">
          <h4 className="font-headline italic text-xl text-primary">Producto Local</h4>
          <p className="text-xs uppercase tracking-widest leading-loose text-on-surface/50">Seleccionamos las mejores piezas de la región para garantizar frescura absoluta.</p>
        </div>
        <div className="glass-panel p-10 text-center space-y-4 rounded-xl border-primary/10 hover:border-primary/40 transition-colors duration-500 hover:-translate-y-2 animate-slide-in-right delay-300">
          <h4 className="font-headline italic text-xl text-primary">Leña de Encina</h4>
          <p className="text-xs uppercase tracking-widest leading-loose text-on-surface/50">El aroma inconfundible de nuestra leña seleccionada impregna cada fibra.</p>
        </div>
        <div className="glass-panel p-10 text-center space-y-4 rounded-xl border-primary/10 hover:border-primary/40 transition-colors duration-500 hover:-translate-y-2 animate-slide-in-right delay-500">
          <h4 className="font-headline italic text-xl text-primary">Receta Secreta</h4>
          <p className="text-xs uppercase tracking-widest leading-loose text-on-surface/50">Un adobo transmitido de padres a hijos para un sabor inigualable.</p>
        </div>
      </section>

      {/* Sección Ubicación / Mapa */}
      <section className="py-24 px-6 md:px-10 bg-surface/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 space-y-8 animate-fade-in-up-smooth">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Nuestra Sede Central</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-headline italic text-primary">Donde ocurre la magia</h2>
            <p className="text-on-surface/50 text-sm uppercase tracking-widest leading-loose">
              Visítanos para recoger tus pedidos recién salidos de la brasa. <br/>
              Estamos ubicados en el corazón de la ciudad, listos para servirte.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-primary uppercase tracking-widest">Dirección</span>
                  <span className="text-sm font-bold uppercase tracking-wider">Av. Alameda de la Victoria, 45</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 h-[400px] glass-panel rounded-3xl overflow-hidden relative group animate-fade-in-up-smooth delay-300">
            {/* Aquí iría el mapa real, ponemos una imagen de referencia premium */}
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2000" 
              alt="Mapa Ubicación" 
              className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="p-6 glass-panel rounded-full animate-float">
                <MapPin size={32} className="text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
