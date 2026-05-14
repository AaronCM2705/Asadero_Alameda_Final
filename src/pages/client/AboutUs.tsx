import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { MapPin, Clock, Phone, Award, Flame, Users } from 'lucide-react';

export const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-body text-on-surface">
      <Navbar />

      {/* Hero Section - Estilo Editorial */}
      <header className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <Award size={500} className="mx-auto text-primary" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Flame size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Nuestra Esencia</span>
          </div>
          <h1 className="text-fluid-h1 font-headline italic gold-gradient-text uppercase mb-8">El Secreto de la Alameda</h1>
          <p className="text-sm md:text-base text-on-surface/60 uppercase tracking-[0.2em] leading-relaxed">
            Más de dos décadas perfeccionando el arte del asado tradicional a la leña.
          </p>
        </div>
      </header>

      {/* Historia y Valores */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-headline italic text-primary">Tradición Familiar</h2>
            <p className="text-on-surface/70 leading-relaxed">
              Asadero Alameda nació de un sueño familiar: llevar el sabor auténtico del campo a la ciudad. 
              Lo que comenzó como un pequeño puesto local se ha convertido en un referente de calidad, 
              manteniendo intacta la receta que nos dio nombre.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-6 rounded-2xl border-primary/10">
              <Users className="text-primary mb-4" size={24} />
              <h4 className="font-headline italic text-lg mb-2">Comunidad</h4>
              <p className="text-[10px] uppercase tracking-widest text-on-surface/40">Crecemos junto a nuestros vecinos, ofreciendo siempre lo mejor.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-primary/10">
              <Award className="text-primary mb-4" size={24} />
              <h4 className="font-headline italic text-lg mb-2">Calidad</h4>
              <p className="text-[10px] uppercase tracking-widest text-on-surface/40">Solo trabajamos con proveedores locales certificados.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border border-primary/20">
            <img 
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800" 
              alt="Maestro Asador" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Badge flotante */}
          <div className="absolute -bottom-10 -left-10 glass-panel p-8 rounded-full border-primary/30 animate-pulse-slow">
            <span className="block text-3xl font-black text-primary">20+</span>
            <span className="text-[8px] uppercase tracking-widest text-on-surface/60 font-black">Años de Sabor</span>
          </div>
        </div>
      </section>

      {/* Ubicación y Contacto */}
      <section className="py-32 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-12">
            <div>
              <h3 className="text-2xl font-headline italic text-primary mb-8">Encuéntranos</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary mt-1" size={20} />
                  <div>
                    <p className="text-xs uppercase tracking-widest font-black mb-1">Dirección</p>
                    <p className="text-sm text-on-surface/60">Calle de la Alameda, 12<br/>28014, Madrid</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-primary mt-1" size={20} />
                  <div>
                    <p className="text-xs uppercase tracking-widest font-black mb-1">Horario</p>
                    <p className="text-sm text-on-surface/60">Martes a Domingo<br/>12:00 - 16:30</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-primary mt-1" size={20} />
                  <div>
                    <p className="text-xs uppercase tracking-widest font-black mb-1">Contacto</p>
                    <p className="text-sm text-on-surface/60">+34 912 345 678</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full py-4 bg-primary text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-xl hover:bg-yellow-400 transition-all shadow-xl shadow-primary/10">
              Cómo llegar con Google Maps
            </button>
          </div>

          <div className="lg:col-span-2 h-[500px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-700">
            {/* Simulación de Mapa - En producción aquí iría el Iframe de Google Maps */}
            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin size={48} className="text-primary mx-auto animate-bounce" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-on-surface/30 font-black">Mapa Interactivo Cargando...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
