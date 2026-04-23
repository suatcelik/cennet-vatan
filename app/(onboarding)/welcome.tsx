import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/ui/AnimatedPressable';
import { colors } from '../../constants/colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-paper px-5 py-4" edges={['top', 'bottom']}>
      {/* Progress Bar */}
      <View className="flex-row justify-between items-center mb-8">
        <View className="flex-row gap-1.5">
          <View className="w-8 h-1.5 bg-terracotta rounded-full" />
          <View className="w-4 h-1.5 bg-line rounded-full" />
          <View className="w-4 h-1.5 bg-line rounded-full" />
        </View>
        <AnimatedPressable onPress={() => router.push('/(onboarding)/theme')}>
          <Text className="text-muted text-xs font-medium">Geç</Text>
        </AnimatedPressable>
      </View>

      {/* Lottie/Görsel Alanı */}
      <View className="bg-paperWarm rounded-3xl h-64 items-center justify-center mb-8 border-[0.5px] border-line">
        <Text className="text-6xl mb-4">🏔️</Text>
        <Text className="text-ink text-lg font-outfit font-medium">Cennet Vatan</Text>
      </View>

      <Text className="text-ink text-3xl font-outfit font-medium mb-2">Keşfetmeye Başla</Text>
      <Text className="text-muted text-sm leading-6 mb-8">
        Türkiye'nin eşsiz doğal ve tarihi güzelliklerini keşfetmek için ilk adımı at.
      </Text>

      {/* İleri Butonu */}
      <View className="flex-1 justify-end">
        <AnimatedPressable
          onPress={() => router.push('/(onboarding)/language')}
          className="bg-midnight py-4 rounded-xl items-center justify-center flex-row"
        >
          <Text className="text-paper text-sm font-medium mr-2">Başla</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.paper} />
        </AnimatedPressable>
      </View>
    </SafeAreaView>
  );
}