import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get credentials from environment variables or persistent storage
export const getSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const storedUrl = localStorage.getItem('kinetic_supabase_url');
  const storedKey = localStorage.getItem('kinetic_supabase_anon_key');

  const supabaseUrl = storedUrl || envUrl || '';
  const supabaseAnonKey = storedKey || envKey || '';

  return {
    url: supabaseUrl.trim(),
    anonKey: supabaseAnonKey.trim(),
    isConfigured: Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')),
  };
};

let cachedClient: SupabaseClient | null = null;
let lastUsedUrl = '';
let lastUsedKey = '';

export const getSupabaseClient = (): SupabaseClient | null => {
  const config = getSupabaseConfig();

  if (!config.isConfigured) {
    return null;
  }

  if (cachedClient && lastUsedUrl === config.url && lastUsedKey === config.anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    lastUsedUrl = config.url;
    lastUsedKey = config.anonKey;
    return cachedClient;
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
    return null;
  }
};

export const setSupabaseConfig = (url: string, anonKey: string) => {
  if (url && anonKey) {
    localStorage.setItem('kinetic_supabase_url', url.trim());
    localStorage.setItem('kinetic_supabase_anon_key', anonKey.trim());
  } else {
    localStorage.removeItem('kinetic_supabase_url');
    localStorage.removeItem('kinetic_supabase_anon_key');
  }
  cachedClient = null;
  window.dispatchEvent(new CustomEvent('kinetic_database_update', { detail: { target: 'config' } }));
};

export const testSupabaseConnection = async (): Promise<{ success: boolean; message: string }> => {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, message: 'Supabase URL or Anon Key is missing or invalid.' };
  }

  try {
    const { error } = await client.from('website_settings').select('count', { count: 'exact', head: true });
    if (error) {
      if (error.code === '42P01') {
        return {
          success: false,
          message: 'Connected to Supabase project, but tables are not created yet. Run supabase-schema.sql in the SQL Editor.',
        };
      }
      return { success: false, message: `Supabase error: ${error.message}` };
    }
    return { success: true, message: 'Successfully connected to Supabase database!' };
  } catch (err: any) {
    return { success: false, message: `Connection failed: ${err.message || 'Unknown network error'}` };
  }
};
