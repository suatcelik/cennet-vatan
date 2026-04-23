// hooks/useVisits.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/auth-store';

export function useVisits() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['visits', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('visits')
        .select(`
          created_at,
          locations (id, name_tr, city, categories(color))
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        // V2 için planlandığından tablo henüz yoksa sessizce boş dizi dön
        console.warn('Visits tablosu henüz oluşturulmamış olabilir:', error.message);
        return [];
      }

      return data;
    },
    enabled: !!user,
  });
}