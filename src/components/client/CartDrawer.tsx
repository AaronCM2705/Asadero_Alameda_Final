import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { X, ShoppingBag, Trash2, Plus, Minus, Send, Phone, User, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { sendOrderNotification } from '../../lib/telegram';
import type { Order } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const [customer, setCustomer] = useState({ name: '', phone: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsSubmitting(true);
    
    const orderData = {
      customer_name: customer.name,
      user_phone: customer.phone,
      notes: customer.notes,
      total: total,
      items: cart,
      status: 'pending'
    };

    const { error } = await supabase
      .from('orders')
      .insert([orderData]);

    if (!error) {
      // Disparamos la notificación a Telegram en segundo plano
      sendOrderNotification(orderData as Order).catch(console.error);
      
      setIsSuccess(true);
      clearCart();
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setCustomer({ name: '', phone: '', notes: '' });
      }, 3000);
    } else {
      alert('Error al enviar pedido. Inténtalo de nuevo.');
    }
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] animate-fade-in" onClick={onClose}></div>
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-background border-l border-primary/20 z-[101] flex flex-col shadow-2xl transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-primary" size={24} />
            <h2 className="text-xl font-headline italic text-on-surface">Tu Selección</h2>
          </div>
          <button onClick={onClose} className="p-2 text-on-surface/40 hover:text-primary transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-8">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in-scale">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <Send className="text-primary animate-bounce" size={40} />
              </div>
              <h3 className="text-2xl font-headline italic text-primary">¡Pedido Recibido!</h3>
              <p className="text-xs text-on-surface/40 uppercase tracking-widest leading-loose">
                Estamos preparando tus brasas.<br/>En breve recibirás noticias nuestras.
              </p>
            </div>
          ) : cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
              <ShoppingBag size={64} />
              <p className="text-sm uppercase tracking-[0.3em] font-black">El carrito está vacío</p>
            </div>
          ) : (
            <>
              {/* Lista de Items */}
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={`${item.product_id}-${item.variant_id || idx}`} className="glass-panel p-4 rounded-2xl border-white/5 flex gap-4 group">
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-on-surface mb-1">{item.name}</h4>
                      {item.variant_name && (
                        <p className="text-[10px] text-primary/60 uppercase font-black mb-2">{item.variant_name}</p>
                      )}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/5">
                          <button 
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1, item.variant_id)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1, item.variant_id)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-xs font-mono text-on-surface/40">{(Number(item.price) * item.quantity).toFixed(2)}€</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product_id, item.variant_id)}
                      className="text-red-500/40 hover:text-red-500 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Formulario Cliente */}
              <div className="space-y-6 pt-8 border-t border-white/5">
                <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Tus Datos de Recogida</h5>
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/20" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="NOMBRE COMPLETO"
                      value={customer.name}
                      onChange={e => setCustomer({...customer, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-[10px] uppercase tracking-widest focus:border-primary/50 outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/20" size={18} />
                    <input 
                      required
                      type="tel" 
                      placeholder="TELÉFONO DE CONTACTO"
                      value={customer.phone}
                      onChange={e => setCustomer({...customer, phone: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-[10px] uppercase tracking-widest focus:border-primary/50 outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-on-surface/20" size={18} />
                    <textarea 
                      placeholder="NOTAS ADICIONALES (ALERGIAS, PETICIONES...)"
                      rows={3}
                      value={customer.notes}
                      onChange={e => setCustomer({...customer, notes: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-[10px] uppercase tracking-widest focus:border-primary/50 outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!isSuccess && cart.length > 0 && (
          <div className="p-8 bg-surface-container border-t border-primary/10 space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-on-surface/40">Total del Pedido</span>
              <span className="text-3xl font-headline italic text-primary">{Number(total).toFixed(2)}€</span>
            </div>
            <button 
              onClick={handleSubmitOrder}
              disabled={isSubmitting || !customer.name || !customer.phone}
              className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all
                ${isSubmitting || !customer.name || !customer.phone 
                  ? 'bg-white/5 text-on-surface/20 cursor-not-allowed' 
                  : 'bg-primary text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] active:scale-95'}`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
              ) : (
                <>Confirmar Pedido <Send size={18} /></>
              )}
            </button>
            <p className="text-[8px] text-center text-on-surface/20 uppercase tracking-widest leading-loose">
              El pago se realiza en efectivo o tarjeta al recoger tu pedido en nuestro local.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
