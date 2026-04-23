import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../constants/colors';
import { storage } from '../lib/storage';
import { useAuthStore } from '../stores/auth-store';

export default function Index() {
  //return <Redirect href="/(tabs)" />;
  const { session, isLoading, initializeAuth } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Uygulama açılışında Supabase oturumunu doğrula
    const prepare = async () => {
      try {
        await initializeAuth();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    };

    prepare();
  }, [initializeAuth]);

  // Oturum kontrolü devam ederken yükleme göstergesi
  if (!isReady || isLoading) {
    return (
      <View className="flex-1 bg-paper items-center justify-center">
        <ActivityIndicator size="large" color={colors.terracotta} />
      </View>
    );
  }

  // 1. Durum: Kullanıcı giriş yapmışsa direkt ana sekmelere
  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  // 2. Durum: Giriş yoksa Onboarding tamamlanmış mı kontrol et
  const hasCompletedOnboarding = storage.getBoolean('onboarding_completed');

  if (!hasCompletedOnboarding) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  // 3. Durum: Onboarding bitmiş ama oturum yoksa Login ekranına
  return <Redirect href="/(auth)/login" />;
}