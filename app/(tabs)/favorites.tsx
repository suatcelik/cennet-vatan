import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/ui/AnimatedPressable';
import { Card } from '../../components/ui/Card';
import { colors } from '../../constants/colors';
import { useFavorites } from '../../hooks/useFavorites';
import { supabase } from '../../lib/supabase';

export default function FavoritesScreen() {
  const { favoriteIds } = useFavorites();

  // Favorilenmiş mekanların detaylarını getir
  const { data: favoriteLocations, isLoading } = useQuery({
    queryKey: ['favorite-locations', favoriteIds],
    queryFn: async () => {
      if (favoriteIds.length === 0) return [];
      const { data, error } = await supabase
        .from('locations')
        .select('*, categories(color)')
        .in('id', favoriteIds);
      
      if (error) throw error;
      return data;
    },
    enabled: favoriteIds.length >= 0,
  });

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={['top', 'left', 'right']}>
      <View className="flex-1 px-5 pt-4">
        <Text className="text-ink text-xl font-outfit font-medium mb-1">Favorilerim</Text>
        <Text className="text-muted text-xs mb-6">{favoriteIds.length} yer kaydedildi</Text>

        {isLoading ? (
          <ActivityIndicator color={colors.terracotta} />
        ) : favoriteIds.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-muted font-outfit">Henüz bir yer favorilemedin.</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
            <View className="flex-col gap-3">
              {favoriteLocations?.map((loc) => (
                <Link key={loc.id} href={`/location/${loc.id}`} asChild>
                  <AnimatedPressable>
                    <Card className="flex-row p-2.5 rounded-xl items-center">
                      <View 
                        className="w-16 h-16 rounded-lg mr-3" 
                        style={{ backgroundColor: loc.categories?.color || colors.terracottaDeep }} 
                      />
                      <View className="flex-1">
                        <Text className="text-ink text-sm font-medium">{loc.name_tr}</Text>
                        <Text className="text-muted text-[10px]">{loc.city}</Text>
                      </View>
                      <Text className="text-terracotta text-2xl mr-2">♥</Text>
                    </Card>
                  </AnimatedPressable>
                </Link>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}