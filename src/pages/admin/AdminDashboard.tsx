import { useState } from 'react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Utensils, Megaphone, LogOut, Menu as MenuIcon, X } from 'lucide-react';

export const AdminDashboard = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { id: 'dashboard', label: 'Finanzas', icon: LayoutDashboard },
    { id: 'menu', label: 'Gestor de Menú', icon: Utensils },
    { id: 'announcements', label: 'Tablón de Anuncios', icon: Megaphone },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-body">
      
      {/* Topbar móvil */}
      <div className="md:hidden glass-panel h-16 px-4 flex items-center justify-between sticky top-0 z-40">
        <h1 className="text-primary font-headline font-black uppercase tracking-widest text-sm">Admin Pro</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-on-surface">
          {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Overlay Móvil */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/80 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar Oculto/Adaptable */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen z-40 w-64 glass-panel border-r border-white/5 flex flex-col
        transition-transform duration-300 ease-in-out md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-white/5 hidden md:block">
          <h1 className="text-primary font-headline font-black uppercase tracking-widest text-lg">Admin Pro</h1>
          <p className="text-[9px] text-on-surface/50 uppercase tracking-[0.2em] mt-1">Asadero Alameda</p>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-10 md:mt-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all uppercase tracking-widest text-[10px] font-bold
                ${activeTab === item.id 
                  ? 'bg-primary text-black shadow-[0_0_15px_rgba(184,134,11,0.2)]' 
                  : 'text-on-surface/60 hover:bg-white/5 hover:text-primary'}
              `}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white rounded-sm transition-colors text-[10px] uppercase font-black tracking-widest"
          >
            <LogOut size={14} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h2 className="text-2xl font-headline font-black text-on-surface uppercase tracking-tight">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
            <p className="text-[10px] text-primary uppercase tracking-[0.2em] mt-1">Modo Edición Activado</p>
          </header>

          {/* Aquí irán los submódulos (Formularios de edición, gráficas, etc.) */}
          <div className="glass-panel p-8 rounded-sm min-h-[500px] flex items-center justify-center border-dashed border-2 border-white/10">
            <p className="text-on-surface/40 uppercase tracking-widest text-xs font-bold text-center">
              Aquí irá el formulario para editar {activeTab}. <br/>
              (El sistema se auto-expandirá cuando añadas datos)
            </p>
          </div>
        </div>
      </main>

    </div>
  );
};
