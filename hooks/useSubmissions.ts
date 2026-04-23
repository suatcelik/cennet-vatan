// hooks/useSubmissions.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/auth-store';

export function useSubmissions() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['submissions', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('locations')
        .select(`
          id, 
          name_tr, 
          city, 
          approval_status, 
          rejected_reason, 
          created_at,
          categories (name_tr, color, icon),
          regions (name_tr)
        `)
        .eq('submitted_by', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Öneriler çekilirken hata:', error.message);
        throw error;
      }

      return data;
    },
    enabled: !!user, // Sadece kullanıcı giriş yapmışsa çalıştır
  });
}