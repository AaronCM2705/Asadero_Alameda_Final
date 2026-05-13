import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { ShoppingBag, Clock, XCircle, Phone, MessageSquare } from 'lucide-react';
import type { Order } from '../../types';

export const OrderManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<Order['status'] | 'all'>('pending');

  const fetchOrders = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      await fetchOrders();
    };
    load();

    // Suscripción en tiempo real para nuevos pedidos
    const subscription = supabase
      .channel('orders_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: Order['status']) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);
    
    if (!error) fetchOrders();
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20';
      case 'preparing': return 'bg-blue-500/20 text-blue-500 border-blue-500/20';
      case 'ready': return 'bg-green-500/20 text-green-500 border-green-500/20';
      case 'delivered': return 'bg-gray-500/20 text-gray-400 border-gray-500/20';
      case 'cancelled': return 'bg-red-500/20 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const filterOptions: (Order['status'] | 'all')[] = ['pending', 'preparing', 'ready', 'delivered', 'all'];

  return (
    <div className="space-y-8 animate-fade-in-scale">
      {/* Filtros Rápidos */}
      <div className="flex flex-wrap gap-3">
        {filterOptions.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border
              ${filter === s ? 'bg-primary text-black border-primary' : 'bg-surface text-on-surface/40 border-white/5 hover:border-primary/30'}`}
          >
            {s === 'pending' && 'Pendientes'}
            {s === 'preparing' && 'En Cocina'}
            {s === 'ready' && 'Listos'}
            {s === 'delivered' && 'Entregados'}
            {s === 'all' && 'Todos'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.length === 0 ? (
          <div className="lg:col-span-2 text-center py-20 bg-surface rounded-3xl border border-dashed border-white/5">
            <ShoppingBag className="mx-auto text-on-surface/10 mb-4" size={48} />
            <p className="text-on-surface/40 uppercase tracking-[0.3em] text-xs">No hay pedidos en esta sección</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="glass-panel p-8 rounded-3xl border-white/5 space-y-6 relative overflow-hidden group">
              {/* Indicador de Estado */}
              <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-2xl text-[8px] font-black uppercase tracking-widest border-b border-l ${getStatusColor(order.status)}`}>
                {order.status}
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-2xl font-headline italic text-primary mb-1">{order.customer_name}</h4>
                  <div className="flex items-center gap-4 text-xs text-on-surface/40 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Clock size={14} /> {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="flex items-center gap-1 text-primary"><Phone size={14} /> {order.user_phone}</span>
                  </div>
                </div>
              </div>

              {/* Items del Pedido */}
              <div className="bg-black/20 rounded-2xl p-6 space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-on-surface/80 font-bold">
                      <span className="text-primary">{item.quantity}x</span> {item.name}
                      {item.variant_name && <span className="text-[10px] text-on-surface/40 ml-2">({item.variant_name})</span>}
                    </span>
                    <span className="text-on-surface/60 font-mono">{(item.price * item.quantity).toFixed(2)}€</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-widest text-on-surface/40">Total</span>
                  <span className="text-xl font-headline italic text-primary">{Number(order.total || 0).toFixed(2)}€</span>
                </div>
              </div>

              {order.notes && (
                <div className="flex gap-3 text-xs bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <MessageSquare size={16} className="text-primary shrink-0" />
                  <p className="text-on-surface/70 italic">"{order.notes}"</p>
                </div>
              )}

              {/* Acciones de Estado */}
              <div className="flex flex-wrap gap-2">
                {order.status === 'pending' && (
                  <button onClick={() => updateStatus(order.id, 'preparing')} className="flex-grow bg-blue-500 text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:brightness-110 transition-all">
                    Aceptar y Cocinar
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button onClick={() => updateStatus(order.id, 'ready')} className="flex-grow bg-green-500 text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:brightness-110 transition-all">
                    Marcar como Listo
                  </button>
                )}
                {order.status === 'ready' && (
                  <button onClick={() => updateStatus(order.id, 'delivered')} className="flex-grow bg-gray-700 text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:brightness-110 transition-all">
                    Entregado
                  </button>
                )}
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <button onClick={() => updateStatus(order.id, 'cancelled')} className="bg-red-500/10 text-red-500 p-3 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                    <XCircle size={18} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
