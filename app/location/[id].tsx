import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedHeart from '../../components/lottie/AnimatedHeart'; // Yeni bileşen
import { AnimatedPressable } from '../../components/ui/AnimatedPressable';
import { colors } from '../../constants/colors';
import { useFavorites } from '../../hooks/useFavorites';
import { useLocationDetail } from '../../hooks/useLocationDetail';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 400;

export default function LocationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0); // Kaydırma miktarını tutan değer

  const { data: location, isLoading, isError } = useLocationDetail(id as string);
  const { favoriteIds, toggleFavorite } = useFavorites();
  const isFavorite = favoriteIds.includes(id as string);

  // Kaydırma olayını yakalayan handler
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // Resim alanı için Parallaks ve Zoom animasyonu
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0],
            [2, 1],
            'clamp'
          ),
        },
      ],
    };
  });

  if (isLoading) return <View className="flex-1 bg-paper items-center justify-center"><ActivityIndicator size="large" color={colors.terracotta} /></View>;

  return (
    <View className="flex-1 bg-paper">
      {/* 1. Parallaks Header Alanı */}
      <Animated.View 
        style={[headerAnimatedStyle, { height: HEADER_HEIGHT, width: width, position: 'absolute' }]}
        className="bg-midnight"
      >
        {/* İleride expo-image ile buraya gerçek resim gelecek */}
        <View 
          className="flex-1 opacity-60" 
          style={{ backgroundColor: location?.categories?.color || colors.terracottaDeep }} 
        />
        <View className="absolute bottom-10 left-5 bg-saffron px-2.5 py-1 rounded">
          <Text className="text-ink text-[10px] font-bold tracking-widest">
            {(location?.categories?.name_tr || 'GENEL').toUpperCase()}
          </Text>
        </View>
      </Animated.View>

      {/* 2. Kaydırılabilir İçerik */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
      >
        <View className="bg-paper rounded-t-[32px] -mt-8 px-5 pt-8 pb-32 min-h-screen">
          <Text className="text-ink text-3xl font-outfit font-medium mb-1">{location?.name_tr}</Text>
          <Text className="text-muted text-sm mb-6">📍 {location?.city}, {location?.regions?.name_tr}</Text>

          <View className="flex-row gap-3 mb-8">
            <View className="flex-1 bg-cream border-[0.5px] border-line rounded-2xl p-4">
              <Text className="text-muted text-[11px] mb-1">Yükseklik</Text>
              <Text className="text-ink text-base font-medium">{location?.altitude_m ? `${location?.altitude_m} m` : '-'}</Text>
            </View>
            <View className="flex-1 bg-cream border-[0.5px] border-line rounded-2xl p-4">
              <Text className="text-muted text-[11px] mb-1">Puan</Text>
              <Text className="text-ink text-base font-medium">★ {location?.rating || '0.0'}</Text>
            </View>
          </View>

          <Text className="text-ink text-base leading-7 mb-10">
            {location?.description_tr || 'Bu mekân için henüz bir açıklama girilmemiş.'}
          </Text>
          
          {/* Harita ve diğer bileşenler buraya eklenebilir */}
        </View>
      </Animated.ScrollView>

      {/* 3. Sabit Üst Butonlar (Floating Header) */}
      <View 
        className="absolute left-0 right-0 flex-row justify-between px-4"
        style={{ top: Math.max(insets.top, 20) }}
      >
        <AnimatedPressable onPress={() => router.back()} className="w-11 h-11 rounded-full bg-midnight/40 items-center justify-center backdrop-blur-lg">
          <Ionicons name="arrow-back" size={22} color={colors.paper} />
        </AnimatedPressable>

        <View className="flex-row gap-3">
          <AnimatedPressable 
            onPress={() => toggleFavorite.mutate(id as string)}
            className="w-11 h-11 rounded-full bg-midnight/40 items-center justify-center backdrop-blur-lg"
          >
            <AnimatedHeart isFavorite={isFavorite} />
          </AnimatedPressable>
        </View>
      </View>
    </View>
  );
}