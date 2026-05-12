import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { Megaphone, Plus, Trash2, Power, PowerOff } from 'lucide-react';
import type { Announcement } from '../../types';

export const AnnouncementManager = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', message: '' });

  const fetchAnnouncements = useCallback(async () => {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setAnnouncements(data);
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('announcements')
      .insert([formData]);
    
    if (!error) {
      setFormData({ title: '', message: '' });
      setIsAdding(false);
      fetchAnnouncements();
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    // Primero desactivamos todos (solo puede haber uno activo)
    await supabase.from('announcements').update({ is_active: false }).neq('id', id);
    
    // Luego activamos/desactivamos el seleccionado
    const { error } = await supabase
      .from('announcements')
      .update({ is_active: !currentStatus })
      .eq('id', id);
    
    if (!error) fetchAnnouncements();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Borrar este anuncio?')) return;
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    if (!error) fetchAnnouncements();
  };

  return (
    <div className="space-y-8 animate-fade-in-scale">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Megaphone className="text-primary" size={24} />
          <h3 className="text-xl font-headline italic text-primary">Tablón de Anuncios</h3>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-black px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2"
        >
          {isAdding ? 'Cerrar' : <><Plus size={14} /> Nuevo Anuncio</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="glass-panel p-8 rounded-2xl border-primary/20 space-y-6">
          <div className="space-y-4">
            <input 
              required
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="TÍTULO LLAMATIVO"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none"
            />
            <textarea 
              required
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              placeholder="Escribe aquí el mensaje para tus clientes..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none h-32 resize-none"
            />
          </div>
          <button type="submit" className="w-full bg-primary text-black py-4 rounded-xl font-black uppercase tracking-[0.4em] text-xs">
            Publicar Anuncio
          </button>
        </form>
      )}

      <div className="grid gap-6">
        {announcements.map((ann) => (
          <div key={ann.id} className={`p-6 rounded-2xl border transition-all ${ann.is_active ? 'bg-primary/5 border-primary/40 shadow-lg shadow-primary/5' : 'bg-white/5 border-white/5'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`text-[8px] font-black uppercase tracking-[0.3em] px-2 py-1 rounded ${ann.is_active ? 'bg-primary text-black' : 'bg-white/10 text-on-surface/40'}`}>
                  {ann.is_active ? 'Activo en la web' : 'Borrador'}
                </span>
                <h4 className={`text-xl font-headline italic mt-3 ${ann.is_active ? 'text-primary' : 'text-on-surface/60'}`}>{ann.title}</h4>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleActive(ann.id, ann.is_active)}
                  className={`p-2 rounded-lg transition-colors ${ann.is_active ? 'text-primary hover:bg-primary/10' : 'text-on-surface/20 hover:text-green-500'}`}
                  title={ann.is_active ? "Desactivar" : "Activar"}
                >
                  {ann.is_active ? <Power size={20} /> : <PowerOff size={20} />}
                </button>
                <button onClick={() => handleDelete(ann.id)} className="p-2 text-on-surface/20 hover:text-red-500 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <p className="text-sm text-on-surface/50 leading-relaxed">{ann.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
