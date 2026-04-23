import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable } from '../../components/ui/AnimatedPressable';
import { colors } from '../../constants/colors';

export default function AboutScreen() {
  const router = useRouter();

  // İleride web siteniz hazır olduğunda bu linkler çalışacaktır
  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.log("URL açılamadı:", err));
  };

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="flex-row items-center px-5 pt-2 mb-6">
        <AnimatedPressable 
          onPress={() => router.back()} 
          className="w-10 h-10 items-center justify-center -ml-2 mr-2"
        >
          <Ionicons name="arrow-back" size={24} color={colors.ink} />
        </AnimatedPressable>
        <Text className="text-ink text-xl font-outfit font-medium">Hakkında</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
      >
        {/* Logo ve Uygulama Bilgisi */}
        <View className="items-center mb-8 mt-4">
          <View className="w-24 h-24 bg-midnight rounded-3xl items-center justify-center mb-4 relative overflow-hidden">
            {/* Hafif bir arkaplan deseni hissi */}
            <View className="absolute inset-0 bg-aegean opacity-20" />
            <Text className="text-saffron text-5xl">🌙</Text>
          </View>
          <Text className="text-ink text-2xl font-outfit font-medium mb-1">Cennet Vatan</Text>
          <Text className="text-muted text-xs tracking-widest mb-3">TÜRKİYE</Text>
          
          <View className="bg-cream px-3 py-1.5 rounded-lg border-[0.5px] border-line">
            <Text className="text-muted text-[10px] font-medium tracking-wider">SÜRÜM 1.0.0</Text>
          </View>
        </View>

        {/* Uygulama Açıklaması */}
        <View className="bg-cream border-[0.5px] border-line rounded-2xl p-5 mb-8">
          <Text className="text-ink text-sm leading-6 text-center">
            Türkiye'nin doğal, tarihi ve kültürel güzelliklerini keşfetmenizi sağlayan topluluk destekli bir seyahat rehberidir. Bildiğiniz gizli cennetleri paylaşarak bu haritayı büyütmemize yardımcı olabilirsiniz.
          </Text>
        </View>

        {/* İletişim ve Linkler Listesi */}
        <View className="flex-col gap-3 mb-10">
          <AnimatedPressable
            onPress={() => handleOpenLink('https://cennetvatan.app/gizlilik')}
            className="bg-paperWarm border-[0.5px] border-line rounded-2xl p-4 flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-olive/20 items-center justify-center mr-3">
                <Ionicons name="shield-checkmark-outline" size={16} color={colors.olive} />
              </View>
              <Text className="text-ink text-sm font-medium">Gizlilik Politikası</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.muted} />
          </AnimatedPressable>

          <AnimatedPressable
            onPress={() => handleOpenLink('https://cennetvatan.app/sartlar')}
            className="bg-paperWarm border-[0.5px] border-line rounded-2xl p-4 flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-aegean/20 items-center justify-center mr-3">
                <Ionicons name="document-text-outline" size={16} color={colors.aegean} />
              </View>
              <Text className="text-ink text-sm font-medium">Kullanım Koşulları</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.muted} />
          </AnimatedPressable>

          <AnimatedPressable
            onPress={() => handleOpenLink('mailto:iletisim@cennetvatan.app')}
            className="bg-paperWarm border-[0.5px] border-line rounded-2xl p-4 flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-terracotta/20 items-center justify-center mr-3">
                <Ionicons name="mail-outline" size={16} color={colors.terracotta} />
              </View>
              <Text className="text-ink text-sm font-medium">Bize Ulaşın</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.muted} />
          </AnimatedPressable>

          <AnimatedPressable
            className="bg-paperWarm border-[0.5px] border-line rounded-2xl p-4 flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-saffron/20 items-center justify-center mr-3">
                <Ionicons name="star-outline" size={16} color={colors.saffron} />
              </View>
              <Text className="text-ink text-sm font-medium">Uygulamayı Değerlendir</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.muted} />
          </AnimatedPressable>
        </View>

        {/* Footer */}
        <View className="items-center pb-6">
          <Ionicons name="heart" size={18} color={colors.terracotta} className="mb-2" />
          <Text className="text-muted text-[10px] text-center mb-1">
            Türkiye'de sevgiyle geliştirildi.
          </Text>
          <Text className="text-muted text-[10px] text-center font-medium">
            Geliştirici: arcodiba
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}