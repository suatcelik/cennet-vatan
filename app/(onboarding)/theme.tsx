import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/ui/AnimatedPressable';
import { colors } from '../../constants/colors';

export default function ThemeScreen() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState('system');

  // Faz 4: AsyncStorage flag'inin ayarlanması
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboarding_completed', 'true');
      // Auth akışına yönlendir
      router.replace('/(auth)/login');
    } catch (e) {
      console.error('Onboarding kaydedilemedi', e);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-paper px-5 py-4" edges={['top', 'bottom']}>
      {/* Progress Bar */}
      <View className="flex-row justify-between items-center mb-8">
        <View className="flex-row gap-1.5">
          <View className="w-4 h-1.5 bg-terracotta rounded-full" />
          <View className="w-4 h-1.5 bg-terracotta rounded-full" />
          <View className="w-8 h-1.5 bg-terracotta rounded-full" />
        </View>
      </View>

      <View className="bg-paperWarm rounded-3xl h-40 items-center justify-center mb-8 border-[0.5px] border-line">
        <Text className="text-6xl">🌗</Text>
      </View>

      <Text className="text-ink text-2xl font-outfit font-medium mb-2">Görünüm seç</Text>
      <Text className="text-muted text-sm leading-6 mb-8">
        Gözlerini yormayan modu seç. İstersen cihaz ayarlarına ayak uydurabiliriz.
      </Text>

      {/* Seçenekler */}
      <View className="flex-col gap-3">
        {['system', 'light', 'dark'].map((theme) => {
          const isSelected = selectedTheme === theme;
          const labels: Record<string, string> = {
            system: 'Sistem Teması (Otomatik)',
            light: 'Açık Mod',
            dark: 'Karanlık Mod'
          };
          const icons: Record<string, string> = {
            system: '⚙️',
            light: '☀️',
            dark: '🌙'
          };

          return (
            <AnimatedPressable
              key={theme}
              onPress={() => setSelectedTheme(theme)}
              className={`flex-row items-center p-4 rounded-2xl border-[0.5px] ${
                isSelected ? 'bg-terracotta border-terracotta' : 'bg-cream border-line'
              }`}
            >
              <Text className="text-2xl mr-3">{icons[theme]}</Text>
              <Text className={`text-sm flex-1 ${isSelected ? 'text-paper font-medium' : 'text-ink'}`}>
                {labels[theme]}
              </Text>
              {isSelected && <Ionicons name="checkmark" size={20} color={colors.paper} />}
            </AnimatedPressable>
          );
        })}
      </View>

      <View className="flex-1 justify-end">
        <AnimatedPressable
          onPress={completeOnboarding}
          className="bg-midnight py-4 rounded-xl items-center justify-center flex-row"
        >
          <Text className="text-paper text-sm font-medium mr-2">Uygulamaya Git</Text>
          <Ionicons name="checkmark-done" size={18} color={colors.paper} />
        </AnimatedPressable>
      </View>
    </SafeAreaView>
  );
}