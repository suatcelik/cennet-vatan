import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface SearchResultType {
  id: string;
  name_tr: string;
  city: string;
  rating: number;
  categories: { name_tr: string; color: string | null } | null;
}

export function useSearch(searchQuery: string) {
  return useQuery<SearchResultType[], Error>({
    // Arama kelimesi değiştikçe queryKey değişir ve yeni istek atılır
    queryKey: ['search', searchQuery], 
    queryFn: async () => {
      // 2 harften kısaysa veritabanını yorma, boş liste dön
      if (!searchQuery || searchQuery.length < 2) return [];

      const { data, error } = await supabase
        .from('locations')
        .select('id, name_tr, city, rating, categories(name_tr, color)')
        .eq('approval_status', 'approved')
        // İsimde VEYA şehirde arama yapıyoruz (ilike = büyük/küçük harf duyarsız)
        .or(`name_tr.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%`)
        .limit(10); // En fazla 10 sonuç getir

      if (error) throw new Error(error.message);
      return data as unknown as SearchResultType[];
    },
    // Sadece arama kelimesi 2 harften uzunsa çalıştır
    enabled: searchQuery.length >= 2, 
  });
}