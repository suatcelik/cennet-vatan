import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

// 1. TypeScript'e gelecek olan verinin şemasını (haritasını) öğretiyoruz
export interface LocationDetailType {
  id: string;
  slug: string | null;
  name_tr: string;
  city: string;
  description_tr: string | null;
  latitude: number | null;
  longitude: number | null;
  altitude_m: number | null;
  rating: number;
  cover_image: string | null;
  regions: {
    name_tr: string;
    name_en: string | null;
  } | null;
  categories: {
    name_tr: string;
    icon: string | null;
    color: string | null;
  } | null;
}

export function useLocationDetail(id: string) {
  // 2. useQuery'ye dönüş tipinin <LocationDetailType> olduğunu söylüyoruz
  return useQuery<LocationDetailType, Error>({
    queryKey: ['location', id], 
    queryFn: async () => {
      if (!id) throw new Error('ID gerekli');

      const { data, error } = await supabase
        .from('locations')
        .select(`
          *,
          regions (name_tr, name_en),
          categories (name_tr, icon, color)
        `)
        .eq('id', id)
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      // 3. Supabase'den gelen veriyi bizim belirlediğimiz tipe zorluyoruz (Type Assertion)
      return data as unknown as LocationDetailType;
    },
    enabled: !!id, 
  });
}