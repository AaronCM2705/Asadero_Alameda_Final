import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { MapPin, Clock, Phone, Award, Flame, Users } from 'lucide-react';

export const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-body text-on-surface">
      <Navbar />

      <main className="flex-1">
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
            <div className="glass-panel bg-[#1E1E1E] p-6 rounded-2xl border-primary/10">
              <Users className="text-primary mb-4" size={24} />
              <h3 className="font-headline italic text-lg mb-2">Comunidad</h3>
              <p className="text-[10px] uppercase tracking-widest text-white/90">Crecemos junto a nuestros vecinos, ofreciendo siempre lo mejor.</p>
            </div>
            <div className="glass-panel bg-[#1E1E1E] p-6 rounded-2xl border-primary/10">
              <Award className="text-primary mb-4" size={24} />
              <h3 className="font-headline italic text-lg mb-2">Calidad</h3>
              <p className="text-[10px] uppercase tracking-widest text-white/90">Solo trabajamos con proveedores locales certificados.</p>
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
                    <p className="text-sm text-on-surface/60">C. Juan XXIII, 12A<br/>04600 Huércal-Overa, Almería</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-primary mt-1" size={20} />
                  <div>
                    <p className="text-xs uppercase tracking-widest font-black mb-1">Horario</p>
                    <p className="text-sm text-on-surface/60">Martes a Domingo<br/>12:00 - 16:30 / 19:30 - 23:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-primary mt-1" size={20} />
                  <div>
                    <p className="text-xs uppercase tracking-widest font-black mb-1">Contacto</p>
                    <p className="text-sm text-on-surface/60">+34 672 803 909</p>
                  </div>
                </div>
              </div>
            </div>
            
            <a 
              href="https://maps.app.goo.gl/5siyh7yZKjJchJFL8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-center w-full py-4 bg-primary text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-xl hover:bg-yellow-400 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            >
              Cómo llegar con Google Maps
            </a>
          </div>

          <div className="lg:col-span-2 h-[500px] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative">
            <iframe 
              title="Mapa de ubicación Asadero Alameda"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.8772974002754!2d-1.9481632885549938!3d37.392733971967715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd652ef43ceaaaeb%3A0xe2eda39ce1d098bd!2sAsadero%20Alameda!5e0!3m2!1ses-419!2ses!4v1778762842963!5m2!1ses-419!2ses" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) contrast(1.1) invert(0.9) hue-rotate(180deg)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="opacity-70 hover:opacity-100 transition-opacity duration-700 pointer-events-auto"
            ></iframe>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};
