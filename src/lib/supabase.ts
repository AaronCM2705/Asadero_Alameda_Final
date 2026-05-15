import { createClient } from '@supabase/supabase-js';

// @ts-expect-error - Compatibilidad Vite/Node
const supabaseUrl = (import.meta.env?.VITE_SUPABASE_URL || (globalThis as unknown as { process: { env: Record<string, string> } }).process?.env?.VITE_SUPABASE_URL)?.trim();
// @ts-expect-error - Compatibilidad Vite/Node
const supabaseKey = (import.meta.env?.VITE_SUPABASE_ANON_KEY || (globalThis as unknown as { process: { env: Record<string, string> } }).process?.env?.VITE_SUPABASE_ANON_KEY)?.trim();

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase URL o Anon Key no encontradas en .env');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseKey || 'placeholder'
);

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseKey;
