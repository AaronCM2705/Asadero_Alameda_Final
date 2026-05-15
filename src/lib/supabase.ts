import { createClient } from '@supabase/supabase-js';

// @ts-ignore - Compatibilidad entre Vite y Vercel (Node.js)
const supabaseUrl = (import.meta.env?.VITE_SUPABASE_URL || (globalThis as typeof globalThis & { process: any }).process?.env?.VITE_SUPABASE_URL)?.trim();
// @ts-ignore
const supabaseKey = (import.meta.env?.VITE_SUPABASE_ANON_KEY || (globalThis as typeof globalThis & { process: any }).process?.env?.VITE_SUPABASE_ANON_KEY)?.trim();

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase URL o Anon Key no encontradas en .env');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseKey || 'placeholder'
);

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseKey;
