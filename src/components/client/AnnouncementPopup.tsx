import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { X, Megaphone, Bell } from 'lucide-react';
import type { Announcement } from '../../types';

export const AnnouncementPopup = () => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchActiveAnnouncement = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();
      
      if (error) throw error;
      if (data) {
        setAnnouncement(data);
        setTimeout(() => setIsVisible(true), 1500);
      }
    } catch (err) {
      console.error("Error fetching announcement:", err);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      await fetchActiveAnnouncement();
    };
    load();
  }, [fetchActiveAnnouncement]);

  if (!announcement || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel p-10 rounded-3xl border-primary/30 shadow-2xl shadow-primary/10 animate-fade-in-scale">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-6 right-6 text-on-surface/40 hover:text-primary transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-8 relative">
            <Megaphone size={32} className="text-primary" />
            <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20"></div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-black text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            <Bell size={12} /> Aviso Importante
          </div>

          <h3 className="text-3xl font-headline italic gold-gradient-text mb-6">
            {announcement.title}
          </h3>

          <p className="text-sm md:text-base text-on-surface/70 leading-relaxed font-body mb-8">
            {announcement.message}
          </p>

          <button 
            onClick={() => setIsVisible(false)}
            className="w-full py-4 bg-primary text-black font-black uppercase tracking-[0.4em] text-xs rounded-xl hover:brightness-110 transition-all shadow-xl shadow-primary/20"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
