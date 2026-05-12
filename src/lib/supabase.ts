import { createClient } from '@supabase/supabase-js';

// Usamos variables de entorno para no exponer las claves
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tu-proyecto.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'tu-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const isSupabaseConfigured = 
  supabaseUrl !== 'https://tu-proyecto.supabase.co' && 
  supabaseKey !== 'tu-anon-key';
