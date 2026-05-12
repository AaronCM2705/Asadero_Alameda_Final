import { useState } from 'react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { useNavigate } from 'react-router-dom';
import { Utensils, Megaphone, LogOut, Menu as MenuIcon, X, Wallet } from 'lucide-react';
import { CategoryManager } from '../../components/admin/CategoryManager';
import { ProductManager } from '../../components/admin/ProductManager';
import { FinanceDashboard } from '../../components/admin/FinanceDashboard';
import { AnnouncementManager } from '../../components/admin/AnnouncementManager';

export const AdminDashboard = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'finance' | 'menu' | 'announcements'>('finance');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-body text-on-surface">
      {/* Botón menú móvil */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed top-6 left-6 z-50 bg-primary p-3 rounded-xl text-black shadow-lg"
      >
        <MenuIcon size={24} />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-72 bg-surface border-r border-primary/10 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <img src="/assets/images/logo-gold.png" alt="Logo" className="h-8" />
              <h1 className="font-headline italic text-lg text-primary">Alameda Admin</h1>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-on-surface/40"><X size={20}/></button>
          </div>

          <nav className="flex-grow space-y-2">
            <button 
              onClick={() => { setActiveTab('finance'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all
              ${activeTab === 'finance' ? 'bg-primary text-black' : 'text-on-surface/40 hover:bg-white/5 hover:text-on-surface'}`}
            >
              <Wallet size={18} /> Finanzas
            </button>
            <button 
              onClick={() => { setActiveTab('menu'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all
              ${activeTab === 'menu' ? 'bg-primary text-black' : 'text-on-surface/40 hover:bg-white/5 hover:text-on-surface'}`}
            >
              <Utensils size={18} /> Gestor Menú
            </button>
            <button 
              onClick={() => { setActiveTab('announcements'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all
              ${activeTab === 'announcements' ? 'bg-primary text-black' : 'text-on-surface/40 hover:bg-white/5 hover:text-on-surface'}`}
            >
              <Megaphone size={18} /> Anuncios
            </button>
          </nav>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-red-500/60 hover:bg-red-500/10 transition-all mt-auto"
          >
            <LogOut size={18} /> Salir
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-grow p-6 md:p-12 lg:p-20 overflow-y-auto">
        <header className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.5em] text-primary/60 font-black mb-2">Panel de Control</p>
          <h2 className="text-4xl font-headline italic text-on-surface">
            {activeTab === 'finance' && 'Resumen Financiero'}
            {activeTab === 'menu' && 'Gestor de la Carta'}
            {activeTab === 'announcements' && 'Tablón de Anuncios'}
          </h2>
        </header>

        {activeTab === 'finance' && <FinanceDashboard />}

        {activeTab === 'menu' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            <div className="xl:col-span-1 border-r border-white/5 pr-0 xl:pr-12">
              <CategoryManager />
            </div>
            <div className="xl:col-span-2">
              <ProductManager />
            </div>
          </div>
        )}

        {activeTab === 'announcements' && <AnnouncementManager />}
      </main>
    </div>
  );
};
