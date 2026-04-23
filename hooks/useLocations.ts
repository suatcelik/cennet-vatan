import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select(`
          *,
          regions (name_tr),
          categories (name_tr, icon, color)
        `)
        .eq('approval_status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    }
  });
}