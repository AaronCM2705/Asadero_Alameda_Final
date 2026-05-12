import { type FC } from 'react';
import { MapPin, Clock, AlertTriangle, CheckCircle, X } from 'lucide-react';
import type { Order } from '../../types';

interface OrderTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export const OrderTicketModal: FC<OrderTicketModalProps> = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  // Enlace a Google Maps (Ejemplo de coordenadas/dirección)
  const mapsLink = "https://maps.google.com/?q=Asadero+Alameda";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-scale">
      {/* El "Ticket" */}
      <div className="relative w-full max-w-sm bg-[#faf8f5] text-black shadow-2xl rounded-t-xl rounded-b-sm overflow-hidden flex flex-col">
        
        {/* Cabecera del Ticket */}
        <div className="bg-primary p-6 text-center text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white">
            <X size={24} />
          </button>
          <div className="flex justify-center mb-2">
            <CheckCircle size={40} className="text-white drop-shadow-md" />
          </div>
          <h2 className="text-xl font-headline font-black uppercase tracking-widest">Pedido Confirmado</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">¡Gracias por confiar en nosotros!</p>
        </div>

        {/* Cuerpo del Ticket (Efecto Papel Termal) */}
        <div className="p-6 flex-grow bg-white" style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
          backgroundSize: '100% 1.5rem'
        }}>
          
          <div className="text-center mb-6">
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Nº de Orden</p>
            <p className="text-3xl font-black font-headline tracking-tighter text-gray-900">
              #{order.id.slice(0, 5).toUpperCase()}
            </p>
          </div>

          <div className="border-t border-dashed border-gray-300 py-4 space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase text-gray-600">
              <span>Cliente:</span>
              <span className="text-black">{order.customer_name}</span>
            </div>
            <div className="flex justify-between text-xs font-bold uppercase text-gray-600">
              <span>Teléfono:</span>
              <span className="text-black">{order.user_phone}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 py-4">
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Resumen</p>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm font-bold text-gray-800 mb-1">
                <span>{item.quantity}x {item.name} {item.variant_name ? `(${item.variant_name})` : ''}</span>
                <span>€{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-gray-300 py-4 flex justify-between items-center">
            <span className="text-lg font-black uppercase text-gray-900">Total a Pagar</span>
            <span className="text-2xl font-black text-primary">€{order.total.toFixed(2)}</span>
          </div>

          {/* Advertencia de Recogida */}
          <div className="mt-4 bg-yellow-100 border border-yellow-300 rounded-sm p-3 flex gap-3 items-start">
            <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-black uppercase text-yellow-800 leading-tight">Solo Recogida en Local</p>
              <p className="text-[10px] font-bold text-yellow-700 mt-1">Este pedido no se envía a domicilio. El pago se realiza en el mostrador.</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">
            <Clock size={16} />
            <p className="text-xs font-bold uppercase tracking-wider">Listo en ~25 Minutos</p>
          </div>

        </div>

        {/* Botón de Mapa */}
        <a 
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-900 hover:bg-black text-white p-4 flex items-center justify-center gap-2 transition-colors cursor-pointer group"
        >
          <MapPin size={20} className="text-primary group-hover:scale-110 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Abrir en Google Maps</span>
        </a>

        {/* Borde dentado inferior simulando corte de ticket */}
        <div className="h-4 w-full bg-[radial-gradient(circle,transparent_4px,#111_5px)] bg-[length:12px_12px] bg-repeat-x rotate-180 -mt-1"></div>
      </div>
    </div>
  );
};
