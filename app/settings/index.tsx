import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable } from '../../components/ui/AnimatedPressable';
import { colors } from '../../constants/colors';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/auth-store';

export default function SettingsScreen() {
  const router = useRouter();
  const { setSession } = useAuthStore();

  // Switch (Toggle) durumları (Şimdilik görsel olarak çalışacak)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotifications, setIsNotifications] = useState(true);

  // Çıkış Yapma Fonksiyonu (Profil'den buraya taşıdık)
  const handleSignOut = async () => {
    Alert.alert(
      "Çıkış Yap",
      "Hesabınızdan çıkmak istediğinize emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        { 
          text: "Çıkış Yap", 
          style: "destructive",
          onPress: async () => {
            await supabase.auth.signOut();
            setSession(null);
            router.replace('/(auth)/login');
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={['top', 'bottom']}>
      {/* Üst Bar */}
      <View className="flex-row items-center px-5 py-4 mb-2">
        <AnimatedPressable onPress={() => router.back()} className="mr-3 w-8 h-8 justify-center">
          <Ionicons name="arrow-back" size={24} color={colors.ink} />
        </AnimatedPressable>
        <Text className="text-ink text-lg font-outfit font-medium">Ayarlar</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5">
        
        {/* GÖRÜNÜM BÖLÜMÜ */}
        <Text className="text-muted text-[10px] tracking-widest mb-2 ml-1 mt-2">GÖRÜNÜM</Text>
        
        <View className="bg-cream border-[0.5px] border-line rounded-xl px-3 py-1.5 mb-2 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 py-1.5">
            <Text className="text-saffron text-lg">🌙</Text>
            <Text className="text-ink text-sm">Karanlık mod</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: colors.line, true: colors.terracotta }}
            thumbColor={colors.paper}
          />
        </View>

        <AnimatedPressable className="bg-cream border-[0.5px] border-line rounded-xl px-3 py-3.5 mb-6 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Text className="text-olive text-lg">🌐</Text>
            <Text className="text-ink text-sm">Dil</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-muted text-xs">Türkçe</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.muted} />
          </View>
        </AnimatedPressable>

        {/* BİLDİRİM BÖLÜMÜ */}
        <Text className="text-muted text-[10px] tracking-widest mb-2 ml-1">BİLDİRİM</Text>
        
        <View className="bg-cream border-[0.5px] border-line rounded-xl px-3 py-1.5 mb-6 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 py-1.5">
            <Text className="text-terracotta text-lg">🔔</Text>
            <Text className="text-ink text-sm">Bildirimler</Text>
          </View>
          <Switch
            value={isNotifications}
            onValueChange={setIsNotifications}
            trackColor={{ false: colors.line, true: colors.olive }}
            thumbColor={colors.paper}
          />
        </View>

        {/* HESAP BÖLÜMÜ */}
        <Text className="text-muted text-[10px] tracking-widest mb-2 ml-1">HESAP</Text>
        
        <AnimatedPressable className="bg-cream border-[0.5px] border-line rounded-xl px-3 py-3.5 mb-2 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Text className="text-midnight text-lg">👤</Text>
            <Text className="text-ink text-sm">Profili düzenle</Text>
          </View>
          <Ionicons name="chevron-forward" size={14} color={colors.muted} />
        </AnimatedPressable>

        {/* Çıkış Yap Butonu */}
        <AnimatedPressable 
          onPress={handleSignOut}
          className="bg-cream border-[0.5px] border-terracotta rounded-xl px-3 py-3.5 mb-8 flex-row items-center gap-3"
        >
          <Ionicons name="log-out-outline" size={20} color={colors.terracotta} />
          <Text className="text-terracotta text-sm font-medium">Çıkış yap</Text>
        </AnimatedPressable>

        {/* Versiyon Bilgisi */}
        <Text className="text-center text-muted text-[10px] mt-4 mb-10">v1.0.0 • Cennet Vatan</Text>

      </ScrollView>
    </SafeAreaView>
  );
}