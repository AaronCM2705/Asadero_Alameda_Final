import { useState, useEffect } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { Search, Filter, Utensils } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Product, Category } from '../../types';

export const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Aquí es donde cargaremos los datos de Supabase cuando los rellenes
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col font-body text-on-surface">
      <Navbar cartCount={0} />

      {/* Header de la Carta */}
      <header className="pt-32 pb-16 px-6 text-center bg-gradient-to-b from-surface to-background">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <Utensils size={14} className="text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Nuestra Selección</span>
        </div>
        <h1 className="text-fluid-h2 font-headline italic gold-gradient-text uppercase mb-4">Sinfonía de Brasas</h1>
        <p className="max-w-2xl mx-auto text-xs md:text-sm text-on-surface/50 uppercase tracking-[0.2em] leading-relaxed">
          Cada plato es una obra maestra cocinada a fuego lento con leña de encina seleccionada.
        </p>
      </header>

      {/* Filtros y Búsqueda */}
      <section className="sticky top-[88px] z-30 glass-panel py-4 px-6 md:px-10 flex flex-col md:flex-row gap-4 items-center justify-between border-x-0">
        <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
            ${!selectedCategory ? 'bg-primary text-black' : 'bg-white/5 text-on-surface/60 hover:bg-white/10'}`}
          >
            Todos
          </button>
          {/* Aquí se generarán las categorías dinámicamente */}
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
              ${selectedCategory === cat.id ? 'bg-primary text-black' : 'bg-white/5 text-on-surface/60 hover:bg-white/10'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/30" size={16} />
          <input 
            type="text" 
            placeholder="BUSCAR DELICIA..." 
            className="w-full bg-black/40 border border-white/10 rounded-full py-2 pl-10 pr-4 text-[10px] uppercase tracking-widest focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </section>

      {/* Grill de Productos */}
      <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-4 text-primary/40">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Preparando las brasas...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="h-96 flex flex-col items-center justify-center gap-6 border-2 border-dashed border-white/5 rounded-3xl">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
              <Utensils size={32} className="text-on-surface/20" />
            </div>
            <div className="text-center">
              <p className="text-on-surface/60 font-headline italic text-xl mb-2">La brasa está lista</p>
              <p className="text-[10px] text-on-surface/30 uppercase tracking-[0.2em]">Esperando a que añadas los primeros manjares en el Panel de Control.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Aquí se renderizarán los productos */}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
