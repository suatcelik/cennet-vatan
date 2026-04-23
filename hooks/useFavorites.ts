import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/auth-store';

export function useFavorites() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  // 1. Kullanıcının tüm favori ID'lerini getir
  const { data: favoriteIds = [] } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('favorites')
        .select('location_id');
      
      if (error) throw error;
      return data.map(f => f.location_id);
    },
    enabled: !!user,
  });

  // 2. Favori Ekleme/Çıkarma İşlemi (Mutation)
  const toggleFavorite = useMutation({
    mutationFn: async (locationId: string) => {
      if (!user) throw new Error('Giriş yapmalısın');

      const isFav = favoriteIds.includes(locationId);

      if (isFav) {
        // Favoriden çıkar
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('location_id', locationId);
        if (error) throw error;
      } else {
        // Favoriye ekle
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: user.id, location_id: locationId });
        if (error) throw error;
      }
    },
    // İşlem bitince veriyi tazele (Optimistic UI da yapılabilir ama şimdilik basit tutalım)
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] });
    },
  });

  return { favoriteIds, toggleFavorite };
}