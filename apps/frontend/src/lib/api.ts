import axios from 'axios';
import { supabase } from './supabase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token do Supabase automaticamente
api.interceptors.request.use(
  async (config) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    console.log('[API] Request to:', config.url);
    console.log('[API] Session exists:', !!session);
    console.log('[API] Token exists:', !!session?.access_token);
    
    // Adiciona o token de autenticação do Supabase ao cabeçalho
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
      console.log('[API] Token added to headers');
    } else {
      console.warn('[API] No token found - user may not be logged in');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado, tentar refresh
      const { data: { session }, error: refreshError } = await supabase.auth.refreshSession();
      
      if (refreshError || !session) {
        // Logout se refresh falhar
        await supabase.auth.signOut();
        window.location.href = '/login';
        return Promise.reject(error);
      }
      
      // Retry request com novo token
      error.config.headers.Authorization = `Bearer ${session.access_token}`;
      return api.request(error.config);
    }
    
    return Promise.reject(error);
  }
);

export default api;
