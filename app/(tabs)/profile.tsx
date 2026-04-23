import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable } from '../../components/ui/AnimatedPressable';
import { Card } from '../../components/ui/Card';
import { colors } from '../../constants/colors';
import { useFavorites } from '../../hooks/useFavorites';
import { useAuthStore } from '../../stores/auth-store';

export default function ProfileScreen() {
  const { user } = useAuthStore();
  const { favoriteIds } = useFavorites();
  
  // Supabase'den gelen kullanıcı adı veya e-posta bilgisi
  const displayName = user?.user_metadata?.full_name || 'Gezgin';
  const email = user?.email || 'geziyorum@cennetvatan.app';

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={['top', 'left', 'right']}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 100 }} 
        className="px-5 pt-4"
      >
        
        {/* Üst Kısım: Başlık ve Ayarlar */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-ink text-xl font-outfit font-medium">Profil</Text>
          
          {/* Link eklendi: Ayarlar sayfasına yönlendirir */}
          <Link href="/settings" asChild>
            <AnimatedPressable className="w-8 h-8 rounded-full border-[0.5px] border-line items-center justify-center bg-cream">
              <Ionicons name="settings-outline" size={18} color={colors.ink} />
            </AnimatedPressable>
          </Link>
        </View>

        {/* Kullanıcı Bilgi Kartı */}
        <View className="bg-midnight rounded-2xl p-4 flex-row items-center mb-4">
          <View className="w-12 h-12 rounded-full bg-terracotta items-center justify-center mr-4">
            <Text className="text-paper text-xl font-medium">
              {displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-paper text-[15px] font-medium">{displayName}</Text>
            <Text className="text-paper/60 text-[11px] mt-0.5">{email}</Text>
          </View>
        </View>

        {/* İstatistikler */}
        <View className="flex-row justify-between mb-6">
          <Card className="flex-1 items-center py-3 mr-2 rounded-xl">
            <Text className="text-terracotta text-lg font-medium">0</Text>
            <Text className="text-muted text-[10px] mt-1">Ziyaret</Text>
          </Card>
          <Card className="flex-1 items-center py-3 mr-2 rounded-xl">
            {/* Favori sayısı dinamik hale getirildi */}
            <Text className="text-terracotta text-lg font-medium">{favoriteIds.length}</Text>
            <Text className="text-muted text-[10px] mt-1">Favori</Text>
          </Card>
          <Card className="flex-1 items-center py-3 rounded-xl">
            <Text className="text-terracotta text-lg font-medium">0</Text>
            <Text className="text-muted text-[10px] mt-1">Öneri</Text>
          </Card>
        </View>

        {/* Menü Listesi */}
        <View className="flex-col gap-2 mb-8">
          
          {/* Yer Öner Linki */}
          <Link href="/contribute" asChild>
            <AnimatedPressable>
              <Card className="flex-row items-center p-4 rounded-2xl">
                <Text className="text-terracotta text-lg mr-3">＋</Text>
                <Text className="text-ink text-sm flex-1">Yer Öner</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.muted} />
              </Card>
            </AnimatedPressable>
          </Link>
          
          <AnimatedPressable>
            <Card className="flex-row items-center p-4 rounded-2xl">
              <Text className="text-olive text-lg mr-3">📍</Text>
              <Text className="text-ink text-sm flex-1">Önerilerim</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.muted} />
            </Card>
          </AnimatedPressable>

          <AnimatedPressable>
            <Card className="flex-row items-center p-4 rounded-2xl">
              <Text className="text-saffron text-lg mr-3">ⓘ</Text>
              <Text className="text-ink text-sm flex-1">Hakkında</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.muted} />
            </Card>
          </AnimatedPressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}