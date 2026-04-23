import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface PopularLocationType {
  id: string;
  name_tr: string;
  city: string;
  rating: number;
  categories: { color: string | null } | null;
}

export function usePopularLocations() {
  return useQuery<PopularLocationType[], Error>({
    queryKey: ['locations', 'popular'],
    queryFn: async () => {
      // En yüksek puanlı 5 onaylanmış mekânı getiriyoruz
      const { data, error } = await supabase
        .from('locations')
        .select('id, name_tr, city, rating, categories(color)')
        .eq('approval_status', 'approved')
        .order('rating', { ascending: false })
        .limit(5);

      if (error) throw new Error(error.message);
      return data as unknown as PopularLocationType[];
    }
  });
}