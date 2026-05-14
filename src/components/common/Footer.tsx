import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-primary/20 pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        
        {/* Info Marca */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img src="/assets/images/logo-gold.png" alt="Logo" className="h-10 w-auto" />
            <h3 className="font-headline text-xl text-primary italic">Asadero Alameda</h3>
          </div>
          <p className="text-on-surface/40 text-sm leading-relaxed font-body uppercase tracking-wider">
            La esencia del fuego y la tradición en cada bocado. <br/>
            Especialistas en asados artesanales desde hace generaciones.
          </p>
          <div className="flex gap-4">
            <a href="mailto:info@asaderoalameda.com" aria-label="Enviar correo electrónico" className="text-primary hover:text-white transition-colors"><Mail size={20} /></a>
          </div>
        </div>

        {/* Horarios */}
        <div className="space-y-6">
          <h4 className="text-primary font-headline uppercase tracking-widest text-sm flex items-center gap-2">
            <Clock size={16} /> Horarios de Brasas
          </h4>
          <ul className="space-y-3 text-xs uppercase tracking-widest text-on-surface/60 font-bold">
            <li className="flex justify-between"><span>Lunes - Jueves</span> <span className="text-on-surface">12:00 - 23:00</span></li>
            <li className="flex justify-between"><span>Viernes - Sábado</span> <span className="text-on-surface">12:00 - 00:30</span></li>
            <li className="flex justify-between"><span>Domingo</span> <span className="text-on-surface">11:30 - 22:30</span></li>
          </ul>
        </div>

        {/* Contacto / Ubicación */}
        <div className="space-y-6">
          <h4 className="text-primary font-headline uppercase tracking-widest text-sm flex items-center gap-2">
            <MapPin size={16} /> Encuéntranos
          </h4>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-on-surface/60 font-bold leading-loose">
              C. Juan XXIII, 12A <br/>
              04600 Huércal-Overa, Almería
            </p>
            <a href="tel:+34672803909" className="flex items-center gap-2 text-primary font-black text-lg">
              <Phone size={18} />
              +34 672 803 909
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] text-on-surface/60 uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} Asadero Alameda - Experiencia Premium
        </p>
      </div>
    </footer>
  );
};
