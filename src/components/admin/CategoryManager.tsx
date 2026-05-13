import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, FolderPlus } from 'lucide-react';
import type { Category } from '../../types';

export const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data) setCategories(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const load = async () => {
      await fetchCategories();
    };
    load();
  }, [fetchCategories]);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    const { error } = await supabase
      .from('categories')
      .insert([{ name: newCategoryName, sort_order: categories.length }]);
    if (!error) {
      setNewCategoryName('');
      fetchCategories();
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('¿Seguro? Se borrará la categoría pero no los productos (quedarán sin categoría).')) return;
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) fetchCategories();
  };

  return (
    <div className="space-y-6 animate-fade-in-scale">
      <div className="flex items-center gap-3 mb-8">
        <FolderPlus className="text-primary" size={24} />
        <h3 className="text-xl font-headline italic text-primary">Gestión de Categorías</h3>
      </div>

      {/* Formulario Añadir */}
      <div className="flex gap-4">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Ej: Pollos Asados, Bebidas..."
          className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-colors"
        />
        <button
          onClick={handleAddCategory}
          className="bg-primary text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-yellow-400 transition-all"
        >
          <Plus size={16} /> Añadir
        </button>
      </div>

      {/* Lista de Categorías */}
      <div className="grid gap-3">
        {isLoading ? (
          <div className="text-center py-10 opacity-30 animate-pulse text-xs uppercase tracking-widest">Cargando categorías...</div>
        ) : categories.length === 0 ? (
          <div className="text-center py-10 text-on-surface/30 text-xs uppercase tracking-widest border border-dashed border-white/5 rounded-2xl">
            No hay categorías todavía.
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-primary/20 transition-all">
              <span className="font-body font-bold text-sm text-on-surface/80">{cat.name}</span>
              <button
                onClick={() => handleDeleteCategory(cat.id)}
                className="text-on-surface/20 hover:text-red-500 transition-colors p-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
