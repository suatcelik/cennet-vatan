import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/ui/AnimatedPressable';
import { colors } from '../../constants/colors';

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState('tr');

  return (
    <SafeAreaView className="flex-1 bg-paper px-5 py-4" edges={['top', 'bottom']}>
      {/* Progress Bar */}
      <View className="flex-row justify-between items-center mb-8">
        <View className="flex-row gap-1.5">
          <View className="w-4 h-1.5 bg-terracotta rounded-full" />
          <View className="w-8 h-1.5 bg-terracotta rounded-full" />
          <View className="w-4 h-1.5 bg-line rounded-full" />
        </View>
        <AnimatedPressable onPress={() => router.push('/(onboarding)/theme')}>
          <Text className="text-muted text-xs font-medium">Geç</Text>
        </AnimatedPressable>
      </View>

      <View className="bg-paperWarm rounded-3xl h-40 items-center justify-center mb-8 border-[0.5px] border-line">
        <Text className="text-6xl">🌍</Text>
      </View>

      <Text className="text-ink text-2xl font-outfit font-medium mb-2">Dilini seç</Text>
      <Text className="text-muted text-sm leading-6 mb-8">
        Uygulamayı hangi dilde kullanmak istersin?
      </Text>

      {/* Seçenekler */}
      <View className="flex-col gap-3">
        <AnimatedPressable
          onPress={() => setSelectedLang('tr')}
          className={`flex-row items-center p-4 rounded-2xl border-[0.5px] ${
            selectedLang === 'tr' ? 'bg-terracotta border-terracotta' : 'bg-cream border-line'
          }`}
        >
          <Text className="text-2xl mr-3">🇹🇷</Text>
          <Text className={`text-sm flex-1 ${selectedLang === 'tr' ? 'text-paper font-medium' : 'text-ink'}`}>Türkçe</Text>
          {selectedLang === 'tr' && <Ionicons name="checkmark" size={20} color={colors.paper} />}
        </AnimatedPressable>

        <AnimatedPressable
          onPress={() => setSelectedLang('en')}
          className={`flex-row items-center p-4 rounded-2xl border-[0.5px] ${
            selectedLang === 'en' ? 'bg-terracotta border-terracotta' : 'bg-cream border-line'
          }`}
        >
          <Text className="text-2xl mr-3">🇬🇧</Text>
          <Text className={`text-sm flex-1 ${selectedLang === 'en' ? 'text-paper font-medium' : 'text-ink'}`}>English</Text>
          {selectedLang === 'en' && <Ionicons name="checkmark" size={20} color={colors.paper} />}
        </AnimatedPressable>
      </View>

      <View className="flex-1 justify-end">
        <AnimatedPressable
          onPress={() => router.push('/(onboarding)/theme')}
          className="bg-midnight py-4 rounded-xl items-center justify-center flex-row"
        >
          <Text className="text-paper text-sm font-medium mr-2">Devam Et</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.paper} />
        </AnimatedPressable>
      </View>
    </SafeAreaView>
  );
}