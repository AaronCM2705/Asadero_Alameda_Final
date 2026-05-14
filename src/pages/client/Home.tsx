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
                  <span className="block text-[10px] font-black text-primary uppercase tracking-widest">Dirección Exacta</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-on-surface/80">Calle Alameda, 14, 04800 Albox, Almería</span>
                </div>
              </div>
              <div className="pt-4">
                <a 
                  href="https://maps.app.goo.gl/5siyh7yZKjJchJFL8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-colors"
                >
                  Abrir en Google Maps <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 h-[400px] glass-panel rounded-3xl overflow-hidden relative group animate-fade-in-up-smooth delay-300 border border-white/5 shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.8772974002754!2d-1.9481632885549938!3d37.392733971967715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd652ef43ceaaaeb%3A0xe2eda39ce1d098bd!2sAsadero%20Alameda!5e0!3m2!1ses-419!2ses!4v1778762842963!5m2!1ses-419!2ses" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9) hue-rotate(180deg)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="opacity-80 hover:opacity-100 transition-opacity duration-500"
            ></iframe>
            <div className="absolute top-4 right-4 z-20">
              <div className="p-3 glass-panel rounded-full bg-black/60 border-primary/20">
                <MapPin size={20} className="text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
