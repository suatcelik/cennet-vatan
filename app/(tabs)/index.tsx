import { Link } from 'expo-router';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel'; // Carousel eklendi
import { SafeAreaView } from 'react-native-safe-area-context';
import { SkeletonCard } from '../../components/feedback/SkeletonCard';
import { AnimatedPressable } from '../../components/ui/AnimatedPressable';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { colors } from '../../constants/colors';
import { useCategories } from '../../hooks/useCategories';
import { usePopularLocations } from '../../hooks/usePopularLocations';
import { useAuthStore } from '../../stores/auth-store';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { user } = useAuthStore();
  const displayName = user?.user_metadata?.full_name?.split(' ')[0] || 'Gezgin';

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: popularLocations, isLoading: isLocationsLoading } = usePopularLocations();

  // Carousel için örnek öne çıkanlar verisi (İleride Supabase'den çekilebilir)
  const featuredItems = [
    { id: '1', title: 'Kaçkar Dağları', subtitle: 'Rize • Doğu Karadeniz', tag: 'ÖNE ÇIKAN', color: 'bg-aegean' },
    { id: '2', title: 'Nemrut Dağı', subtitle: 'Adıyaman • G.Doğu Anadolu', tag: 'POPÜLER', color: 'bg-terracottaDeep' },
    { id: '3', title: 'Efes Antik Kenti', subtitle: 'İzmir • Ege', tag: 'UNESCO', color: 'bg-olive' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={['top', 'left', 'right']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="flex-1 px-5 pt-2"
      >
        
        {/* 1. Header (Greeting) */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-muted text-[11px]">Merhaba {displayName}</Text>
            <Text className="text-ink text-2xl font-outfit font-medium">Keşfet 🏔️</Text>
          </View>
          <View className="w-10 h-10 bg-terracotta rounded-full items-center justify-center">
            <Text className="text-paper text-lg font-medium">{displayName.charAt(0).toUpperCase()}</Text>
          </View>
        </View>

        {/* 2. Region Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 h-10">
          <View className="flex-row gap-2">
            <Chip label="Tümü" isActive={true} />
            <Chip label="Karadeniz" />
            <Chip label="Ege" />
            <Chip label="Akdeniz" />
            <Chip label="Marmara" />
            <Chip label="İç Anadolu" />
            <Chip label="Doğu Anadolu" />
            <Chip label="G.Doğu Anadolu" />
          </View>
        </ScrollView>

        {/* 3. Hero Carousel (Hareketli Hale Getirildi) */}
        <View className="mb-6 h-44 rounded-2xl overflow-hidden">
          <Carousel
            loop
            width={width - 40} // Ekran genişliği - (px-5 padding x 2)
            height={150} 
            autoPlay={true}
            data={featuredItems}
            scrollAnimationDuration={3000}
            renderItem={({ item }) => (
              <AnimatedPressable className="flex-1 bg-midnight relative justify-end p-4">
                <View className={`absolute top-0 bottom-0 left-0 right-0 ${item.color} opacity-30`} />
                <View className="absolute top-3 left-3 bg-saffron rounded px-2 py-1">
                  <Text className="text-ink text-[10px] font-bold">{item.tag}</Text>
                </View>
                <Text className="text-paper text-lg font-outfit font-medium">{item.title}</Text>
                <Text className="text-paper/70 text-xs">{item.subtitle}</Text>
              </AnimatedPressable>
            )}
          />
        </View>

        {/* 4. Categories Grid */}
        <Text className="text-ink text-sm font-medium mb-3">Kategoriler</Text>
        <View className="flex-row flex-wrap gap-2 mb-8 justify-between">
          {isCategoriesLoading ? (
            [1, 2, 3, 4].map((i) => (
              <View key={i} className="w-[23%] aspect-square bg-cream border-[0.5px] border-line rounded-xl items-center justify-center opacity-50" />
            ))
          ) : categories?.slice(0, 4).map((cat) => (
            <AnimatedPressable key={cat.id} className="w-[23%] aspect-square bg-cream border-[0.5px] border-line rounded-xl items-center justify-center">
              <Text className="text-2xl mb-1">{cat.icon || '📍'}</Text>
              <Text className="text-ink text-[10px]">{cat.name_tr}</Text>
            </AnimatedPressable>
          ))}
        </View>

        {/* 5. Popular List */}
        <Text className="text-ink text-sm font-medium mb-3">Popüler</Text>
        <View className="flex-col gap-3">
          {isLocationsLoading ? (
            [1, 2, 3].map((i) => <SkeletonCard key={i} />)
          ) : popularLocations?.map((location) => (
            <Link key={location.id} href={`/location/${location.id}`} asChild>
              <AnimatedPressable>
                <Card className="flex-row items-center p-2 rounded-xl">
                  <View 
                    className="w-12 h-12 rounded-lg mr-3" 
                    style={{ backgroundColor: location.categories?.color || colors.terracottaDeep }} 
                  />
                  <View className="flex-1">
                    <Text className="text-ink text-[13px] font-medium" numberOfLines={1}>{location.name_tr}</Text>
                    <Text className="text-muted text-[10px]">{location.city}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-saffron text-xs mr-1">★</Text>
                    <Text className="text-ink text-xs font-medium mr-2">{location.rating}</Text>
                  </View>
                </Card>
              </AnimatedPressable>
            </Link>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}