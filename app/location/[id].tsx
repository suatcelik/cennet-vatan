import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/ui/AnimatedPressable';
import { colors } from '../../constants/colors';
import { useFavorites } from '../../hooks/useFavorites'; // Favoriler Hook'umuz eklendi
import { useLocationDetail } from '../../hooks/useLocationDetail';

export default function LocationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Supabase'den mekan detay verisini çekiyoruz
  const { data: location, isLoading, isError } = useLocationDetail(id as string);

  // Favoriler verisini ve toggle fonksiyonunu çekiyoruz
  const { favoriteIds, toggleFavorite } = useFavorites();
  
  // Bu ID'nin kullanıcının favoriler listesinde olup olmadığını kontrol ediyoruz
  const isFavorite = favoriteIds.includes(id as string);

  const handleShare = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable && location) {
        // İleride gerçek URL formatına dönüştürülecek
        await Sharing.shareAsync(`https://cennetvatan.app/keşfet/${location.slug || id}`); 
      }
    } catch (error) {
      console.log('Paylaşım hatası:', error);
    }
  };

  // Yüklenme Durumu
  if (isLoading) {
    return (
      <View className="flex-1 bg-paper items-center justify-center">
        <ActivityIndicator size="large" color={colors.terracotta} />
      </View>
    );
  }

  // Hata veya Veri Bulunamama Durumu
  if (isError || !location) {
    return (
      <View className="flex-1 bg-paper items-center justify-center px-5">
        <Text className="text-ink text-lg font-medium text-center mb-4">Mekân bilgisi yüklenemedi.</Text>
        <AnimatedPressable 
          className="bg-midnight px-6 py-3 rounded-xl"
          onPress={() => router.back()}
        >
          <Text className="text-paper font-medium">Geri Dön</Text>
        </AnimatedPressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-paper">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* 1. Hero Image & Header */}
        <View className="h-72 w-full relative" style={{ backgroundColor: location.categories?.color || colors.terracottaDeep }}>
          {/* İleride Cover Image buraya gelecek */}
          
          <LinearGradient
            colors={['rgba(15,36,56,0.8)', 'transparent', 'rgba(26,22,18,0.8)']}
            className="absolute inset-0"
          />

          <View 
            className="absolute left-0 right-0 flex-row justify-between px-4"
            style={{ top: Math.max(insets.top, 20) }}
          >
            <AnimatedPressable 
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-midnight/60 items-center justify-center backdrop-blur-md"
            >
              <Ionicons name="arrow-back" size={20} color={colors.paper} />
            </AnimatedPressable>

            <View className="flex-row gap-3">
              <AnimatedPressable 
                onPress={() => toggleFavorite.mutate(id as string)}
                disabled={toggleFavorite.isPending} // İstek atılırken butonu dondur
                className="w-10 h-10 rounded-full bg-midnight/60 items-center justify-center backdrop-blur-md"
              >
                <Ionicons 
                  name={isFavorite ? "heart" : "heart-outline"} 
                  size={20} 
                  color={isFavorite ? colors.terracotta : colors.paper} 
                />
              </AnimatedPressable>

              <AnimatedPressable 
                onPress={handleShare}
                className="w-10 h-10 rounded-full bg-midnight/60 items-center justify-center backdrop-blur-md"
              >
                <Ionicons name="share-outline" size={20} color={colors.paper} />
              </AnimatedPressable>
            </View>
          </View>

          <View className="absolute bottom-4 left-5 bg-saffron px-2.5 py-1 rounded">
            <Text className="text-ink text-[10px] font-bold tracking-widest">
              {(location.categories?.name_tr || 'GENEL').toUpperCase()}
            </Text>
          </View>
        </View>

        {/* 2. Content Area */}
        <View className="px-5 pt-5">
          <Text className="text-ink text-2xl font-outfit font-medium mb-1">{location.name_tr}</Text>
          <Text className="text-muted text-xs mb-5">
            📍 {location.city}, {location.regions?.name_tr}
          </Text>

          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-cream border-[0.5px] border-line rounded-xl p-3">
              <Text className="text-muted text-[10px] mb-1">Yükseklik</Text>
              <Text className="text-ink text-sm font-medium">{location.altitude_m ? `${location.altitude_m} m` : '-'}</Text>
            </View>
            <View className="flex-1 bg-cream border-[0.5px] border-line rounded-xl p-3">
              <Text className="text-muted text-[10px] mb-1">Puan</Text>
              <Text className="text-ink text-sm font-medium">★ {location.rating || '0.0'}</Text>
            </View>
          </View>

          <Text className="text-ink text-sm leading-6 mb-8">
            {location.description_tr || 'Bu mekân için henüz bir açıklama girilmemiş.'}
          </Text>

          {location.latitude && location.longitude && (
            <AnimatedPressable className="bg-midnight rounded-2xl p-4 flex-row items-center">
              <View className="w-10 h-10 rounded-xl bg-terracotta items-center justify-center mr-3">
                <Ionicons name="navigate" size={18} color={colors.paper} />
              </View>
              <View className="flex-1">
                <Text className="text-paper/60 text-[11px] mb-0.5">Haritada göster</Text>
                <Text className="text-paper text-sm font-medium">{location.latitude.toFixed(2)}° K, {location.longitude.toFixed(2)}° D</Text>
              </View>
            </AnimatedPressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}