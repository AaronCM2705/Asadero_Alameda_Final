import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { FileText, FileSpreadsheet, Image as ImageIcon, TrendingUp, ShoppingCart, DollarSign } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import type { Order } from '../../types';

interface ChartDataItem {
  date: string;
  ganancias: number;
}

export const FinanceDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ totalSales: 0, totalOrders: 0, avgTicket: 0 });
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const calculateStats = useCallback((data: Order[]) => {
    const total = data.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
    setStats({
      totalSales: total,
      totalOrders: data.length,
      avgTicket: data.length > 0 ? total / data.length : 0
    });
  }, []);

  const processChartData = useCallback((data: Order[]) => {
    const grouped = data.reduce((acc: Record<string, number>, order) => {
      const date = new Date(order.created_at).toLocaleDateString();
      acc[date] = (acc[date] || 0) + (Number(order.total) || 0);
      return acc;
    }, {});

    const formatted: ChartDataItem[] = Object.keys(grouped).map(date => ({
      date,
      ganancias: grouped[date]
    }));
    setChartData(formatted);
  }, []);

  const fetchOrders = useCallback(async () => {
    return await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: true });
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetchOrders().then(({ data, error }) => {
      if (isMounted && !error && data) {
        setOrders(data);
        calculateStats(data);
        processChartData(data);
      }
    });

    return () => { isMounted = false; };
  }, [fetchOrders, calculateStats, processChartData]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(orders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pedidos_Alameda");
    XLSX.writeFile(wb, `Reporte_Financiero_${new Date().toLocaleDateString()}.xlsx`);
  };

  const exportToPDF = async () => {
    if (!dashboardRef.current) return;
    const canvas = await html2canvas(dashboardRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Reporte_Alameda_${new Date().toLocaleDateString()}.pdf`);
  };

  const exportToImage = async () => {
    if (!dashboardRef.current) return;
    const canvas = await html2canvas(dashboardRef.current);
    const link = document.createElement('a');
    link.download = `Captura_Finanzas_${new Date().toLocaleDateString()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-8 animate-fade-in-scale">
      {/* Botones de Acción */}
      <div className="flex flex-wrap gap-4">
        <button onClick={exportToPDF} className="flex items-center gap-2 bg-red-500/30 text-red-500 border border-red-500/40 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
          <FileText size={14} /> Descargar PDF
        </button>
        <button onClick={exportToExcel} className="flex items-center gap-2 bg-green-500/30 text-green-500 border border-green-500/40 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all">
          <FileSpreadsheet size={14} /> Exportar Excel
        </button>
        <button onClick={exportToImage} className="flex items-center gap-2 bg-primary/30 text-primary border border-primary/40 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all">
          <ImageIcon size={14} /> Captura PNG
        </button>
      </div>

      <div ref={dashboardRef} className="space-y-8 p-4 bg-background rounded-3xl">
        {/* Tarjetas de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-8 rounded-3xl border-primary/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <DollarSign size={48} className="text-primary" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-2">Ventas Totales</p>
            <h3 className="text-4xl font-headline italic text-primary">{stats.totalSales.toFixed(2)}€</h3>
            <div className="mt-4 flex items-center gap-2 text-green-400 text-[10px] font-black uppercase">
              <TrendingUp size={12} /> +12% vs ayer
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <ShoppingCart size={48} className="text-on-surface" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-on-surface/80 font-black mb-2">Pedidos Realizados</p>
            <h3 className="text-4xl font-headline italic text-on-surface">{stats.totalOrders}</h3>
            <p className="mt-4 text-[10px] text-on-surface/60 uppercase font-black">Últimas 24 horas</p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <TrendingUp size={48} className="text-on-surface" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-on-surface/80 font-black mb-2">Ticket Medio</p>
            <h3 className="text-4xl font-headline italic text-on-surface">{stats.avgTicket.toFixed(2)}€</h3>
            <p className="mt-4 text-[10px] text-on-surface/60 uppercase font-black">Eficiencia de venta</p>
          </div>
        </div>

        {/* Gráfica de Ganancias */}
        <div className="glass-panel p-8 rounded-3xl border-primary/5 h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Evolución de Ingresos</h4>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorGanancias" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#ffffff40" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#ffffff40" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => `${val}€`} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#121212', border: '1px solid #D4AF3740', borderRadius: '12px', fontSize: '10px' }}
                itemStyle={{ color: '#D4AF37' }}
              />
              <Area 
                type="monotone" 
                dataKey="ganancias" 
                stroke="#D4AF37" 
                fillOpacity={1} 
                fill="url(#colorGanancias)" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
