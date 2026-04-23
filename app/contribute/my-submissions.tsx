import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/ui/AnimatedPressable';
import { colors } from '../../constants/colors';
import { useSubmissions } from '../../hooks/useSubmissions';

export default function MySubmissionsScreen() {
  const router = useRouter();
  
  // Önerileri veritabanından çekiyoruz
  const { data: submissions, isLoading } = useSubmissions();

  // Duruma göre renk ve etiket çevirici fonksiyon
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'approved':
        return { label: 'ONAYLANDI', bgColor: 'bg-olive', textColor: 'text-paper' };
      case 'pending':
        return { label: 'BEKLİYOR', bgColor: 'bg-saffron', textColor: 'text-ink' };
      case 'rejected':
        return { label: 'REDDEDİLDİ', bgColor: 'bg-terracottaDeep', textColor: 'text-paper' };
      default:
        return { label: 'BİLİNMİYOR', bgColor: 'bg-muted', textColor: 'text-paper' };
    }
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
        <Text className="text-ink text-xl font-outfit font-medium">Önerilerim</Text>
      </View>

      {/* İçerik */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      >
        {isLoading ? (
          <View className="py-10 items-center">
            <ActivityIndicator size="large" color={colors.terracotta} />
            <Text className="text-muted mt-4 text-xs">Önerileriniz yükleniyor...</Text>
          </View>
        ) : !submissions || submissions.length === 0 ? (
          <View className="py-20 items-center">
            <Ionicons name="map-outline" size={64} color={colors.muted} className="opacity-50" />
            <Text className="text-ink text-base font-medium mt-4 mb-2">Henüz bir öneriniz yok</Text>
            <Text className="text-muted text-center text-xs px-10 leading-5">
              Bildiğiniz güzel yerleri önererek topluluğa katkıda bulunabilirsiniz.
            </Text>
          </View>
        ) : (
          <View className="flex-col gap-4">
            {submissions.map((item) => {
              const statusDisplay = getStatusDisplay(item.approval_status);

              return (
                <View key={item.id} className="bg-cream border-[0.5px] border-line rounded-2xl p-4">
                  <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1 pr-2">
                      <Text className="text-ink text-sm font-medium mb-1">{item.name_tr}</Text>
                      <Text className="text-muted text-[11px]">
                        📍 {item.city} • {item.categories?.name_tr || 'Genel'}
                      </Text>
                    </View>
                    
                    {/* Durum Rozeti */}
                    <View className={`${statusDisplay.bgColor} px-2 py-1 rounded`}>
                      <Text className={`${statusDisplay.textColor} text-[9px] font-bold tracking-wider`}>
                        {statusDisplay.label}
                      </Text>
                    </View>
                  </View>

                  {/* Eğer reddedildiyse sebebini göster */}
                  {item.approval_status === 'rejected' && item.rejected_reason && (
                    <View className="mt-3 bg-paperWarm p-3 rounded-xl border border-terracotta/20">
                      <Text className="text-terracottaDeep text-[10px] font-medium mb-1">Reddedilme Nedeni:</Text>
                      <Text className="text-ink text-[11px] leading-4">{item.rejected_reason}</Text>
                    </View>
                  )}
                  
                  <Text className="text-muted text-[9px] mt-3 text-right">
                    {new Date(item.created_at).toLocaleDateString('tr-TR')}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}