import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { Search, Utensils, Flame, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useCart } from '../../hooks/useCart';
import type { Product, Category } from '../../types';

export const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        supabase.from('categories').select('*').order('sort_order', { ascending: true }),
        supabase.from('products').select('*').eq('is_available', true).order('created_at', { ascending: false })
      ]);

      if (catRes.error) throw catRes.error;
      if (prodRes.error) throw prodRes.error;

      if (catRes.data) setCategories(catRes.data);
      if (prodRes.data) setProducts(prodRes.data);
    } catch (err) {
      console.error("Error cargando el menú:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      await fetchData();
    };
    load();
  }, [fetchData]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      product_id: product.id,
      name: product.name,
      price: product.base_price,
      quantity: 1
    });
    
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory ? p.category_id === selectedCategory : true;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navbar />

      <main className="flex-1">
      {/* Header de la Carta */}
      <header className="pt-32 pb-16 px-6 text-center bg-gradient-to-b from-surface to-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
          <Flame size={400} className="mx-auto text-primary" />
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Utensils size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Nuestra Selección</span>
          </div>
          <h1 className="text-fluid-h2 font-headline italic gold-gradient-text uppercase mb-4">Sinfonía de Brasas</h1>
          <p className="max-w-2xl mx-auto text-xs md:text-sm text-on-surface/50 uppercase tracking-[0.2em] leading-relaxed">
            Cada plato es una obra maestra cocinada a fuego lento con leña de encina seleccionada.
          </p>
        </div>
      </header>

      {/* Filtros y Búsqueda */}
      <section className="sticky top-[88px] z-30 glass-panel py-4 px-6 md:px-10 flex flex-col md:flex-row gap-4 items-center justify-between border-x-0">
        <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
            ${!selectedCategory ? 'bg-primary text-black' : 'bg-white/5 text-on-surface/60 hover:bg-white/10'}`}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="BUSCAR DELICIA..." 
            className="w-full bg-black/40 border border-white/10 rounded-full py-2 pl-10 pr-4 text-[10px] uppercase tracking-widest focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </section>

      {/* Grill de Productos */}
      <div className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-4 text-primary/40">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Preparando las brasas...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="h-96 flex flex-col items-center justify-center gap-6 border-2 border-dashed border-white/5 rounded-3xl">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
              <Utensils size={32} className="text-on-surface/20" />
            </div>
            <div className="text-center">
              <p className="text-on-surface/60 font-headline italic text-xl mb-2">Nada por aquí aún</p>
              <p className="text-[10px] text-on-surface/30 uppercase tracking-[0.2em]">Prueba a cambiar el filtro o vuelve pronto.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => handleAddToCart(product)}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-3xl mb-6 relative shadow-2xl">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container flex items-center justify-center text-on-surface/10">
                      <Utensils size={48} />
                    </div>
                  )}
                  <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-primary/20">
                    <span className="text-primary font-black text-sm tracking-widest">{Number(product.base_price).toFixed(2)}€</span>
                  </div>
                </div>
                
                <h3 className="font-headline italic text-2xl text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-on-surface/40 uppercase tracking-widest leading-loose line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-6 flex items-center gap-2">
                  <div className="h-[1px] flex-grow bg-primary/20"></div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${addedId === product.id ? 'text-green-500' : 'text-primary'}`}>
                    {addedId === product.id ? (
                      <span className="flex items-center gap-2"><Check size={12} /> Añadido</span>
                    ) : (
                      'Añadir al pedido'
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
