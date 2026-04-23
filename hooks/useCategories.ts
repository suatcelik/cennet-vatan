import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface CategoryType {
  id: string;
  slug: string;
  name_tr: string;
  icon: string | null;
  color: string | null;
}

export function useCategories() {
  return useQuery<CategoryType[], Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name_tr', { ascending: true });
      
      if (error) throw new Error(error.message);
      return data;
    }
  });
}