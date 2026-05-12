import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Utensils, Package, Image as ImageIcon } from 'lucide-react';
import type { Product, Category } from '../../types';

export const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Formulario Nuevo Producto
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    base_price: '',
    category_id: '',
    image_url: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [prodRes, catRes] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('sort_order', { ascending: true })
    ]);

    if (prodRes.data) setProducts(prodRes.data);
    if (catRes.data) setCategories(catRes.data);
    setIsLoading(false);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category_id) return alert('Nombre y Categoría son obligatorios');

    const { error } = await supabase.from('products').insert([{
      name: formData.name,
      description: formData.description,
      base_price: parseFloat(formData.base_price) || 0,
      category_id: formData.category_id,
      image_url: formData.image_url
    }]);

    if (!error) {
      setIsAdding(false);
      setFormData({ name: '', description: '', base_price: '', category_id: '', image_url: '' });
      fetchData();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Borrar este manjar del menú?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetchData();
  };

  return (
    <div className="space-y-8 animate-fade-in-scale">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Utensils className="text-primary" size={24} />
          <h3 className="text-xl font-headline italic text-primary">Nuestros Manjares</h3>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-black px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
        >
          {isAdding ? 'Cerrar' : <><Plus size={14} /> Nuevo Producto</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddProduct} className="glass-panel p-8 rounded-2xl border-primary/20 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-black">Nombre del Plato</label>
              <input 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none"
                placeholder="Ej: Pollo Asado Alameda"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-black">Categoría</label>
              <select 
                required
                value={formData.category_id}
                onChange={e => setFormData({...formData, category_id: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none appearance-none"
              >
                <option value="">Seleccionar categoría...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-black">Precio Base (€)</label>
              <input 
                type="number" step="0.01"
                value={formData.base_price}
                onChange={e => setFormData({...formData, base_price: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none"
                placeholder="12.50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-black">URL de Imagen</label>
              <input 
                value={formData.image_url}
                onChange={e => setFormData({...formData, image_url: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none"
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-black">Descripción</label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none h-24 resize-none"
              placeholder="Describa el sabor tradicional..."
            />
          </div>
          <button type="submit" className="w-full bg-primary text-black py-4 rounded-xl font-black uppercase tracking-[0.4em] text-xs hover:brightness-110 transition-all shadow-xl shadow-primary/20">
            Guardar Producto
          </button>
        </form>
      )}

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-20 animate-pulse text-[10px] uppercase tracking-widest opacity-30">Escaneando la carta...</div>
        ) : products.length === 0 ? (
          <div className="col-span-full border-2 border-dashed border-white/5 rounded-3xl py-20 text-center">
            <Package className="mx-auto text-on-surface/10 mb-4" size={48} />
            <p className="text-[10px] uppercase tracking-widest text-on-surface/30">No hay productos. ¡Empieza a cocinar!</p>
          </div>
        ) : (
          products.map(product => (
            <div key={product.id} className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden group hover:border-primary/30 transition-all">
              <div className="aspect-video bg-black/40 relative overflow-hidden">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-on-surface/10"><ImageIcon size={32} /></div>
                )}
                <div className="absolute top-3 right-3 bg-primary text-black px-2 py-1 rounded-lg font-black text-[10px]">
                  {product.base_price}€
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-headline italic text-lg text-primary">{product.name}</h4>
                  <button onClick={() => handleDeleteProduct(product.id)} className="text-on-surface/20 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-[10px] text-on-surface/40 uppercase tracking-widest line-clamp-2 leading-relaxed">
                  {product.description || 'Sin descripción'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
