import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { AnimatedPressable } from '../../components/ui/AnimatedPressable';
import { colors } from '../../constants/colors';

// Sabit Verilerimiz (İleride Supabase'den çekilebilir)
const REGIONS = ['Marmara', 'Ege', 'Akdeniz', 'Karadeniz', 'İç Anadolu', 'Doğu Anadolu', 'Güneydoğu Anadolu'];
const CATEGORIES = ['Dağ', 'Göl', 'Mağara', 'Antik Kent', 'Şelale', 'Plaj', 'Milli Park', 'Kanyon', 'Tarihi Eser', 'Orman'];

// Zod Form Şeması
const submitSchema = z.object({
  name: z.string().min(3, 'Yer adı en az 3 karakter olmalıdır.'),
  city: z.string().min(3, 'Şehir adı gereklidir.'),
  region: z.string().min(1, 'Lütfen bir bölge seçin.'),
  category: z.string().min(1, 'Lütfen bir kategori seçin.'),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalıdır.'),
});

type SubmitFormValues = z.infer<typeof submitSchema>;

export default function SubmitLocationScreen() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Picker Modalı için State
  const [activePicker, setActivePicker] = useState<'region' | 'category' | null>(null);

  const {
    control,
    handleSubmit,
    setValue, // Form değerini dışarıdan ayarlamak için setValue eklendi
    formState: { errors },
    reset,
  } = useForm<SubmitFormValues>({
    resolver: zodResolver(submitSchema),
    defaultValues: { name: '', city: '', region: '', category: '', description: '' },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) setSelectedImage(result.assets[0].uri);
  };

  const onSubmit = async (data: SubmitFormValues) => {
    if (!selectedImage) {
      Alert.alert('Eksik Bilgi', 'Lütfen en az bir fotoğraf ekleyin.');
      return;
    }
    setIsSubmitting(true);
    try {
      console.log('Gönderilen Veri:', data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      Alert.alert('Başarılı', 'Öneriniz inceleme için gönderildi.', [
        { text: 'Tamam', onPress: () => { reset(); setSelectedImage(null); router.back(); } }
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Gönderim sırasında bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Listeden eleman seçildiğinde çalışacak fonksiyon
  const handleSelectOption = (item: string) => {
    if (activePicker) {
      setValue(activePicker, item, { shouldValidate: true });
      setActivePicker(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="flex-row items-center px-5 pt-2 mb-4">
        <AnimatedPressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2 mr-2">
          <Ionicons name="arrow-back" size={24} color={colors.ink} />
        </AnimatedPressable>
        <Text className="text-ink text-lg font-outfit font-medium">Yer Öner</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>
        {/* ... (Diğer alanlar aynı) ... */}
        
        {/* Yer Adı */}
        <View className="mb-4">
          <Text className="text-muted text-[10px] mb-1 ml-1">Yer adı *</Text>
          <Controller
            control={control} name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput className={`bg-cream border-[0.5px] ${errors.name ? 'border-terracotta' : 'border-line'} rounded-xl px-4 py-3 text-ink text-sm`} placeholder="Örn: Yedigöller Milli Parkı" placeholderTextColor={colors.muted} onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
          />
          {errors.name && <Text className="text-terracotta text-[10px] mt-1 ml-1">{errors.name.message}</Text>}
        </View>

        {/* Şehir ve Bölge */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <Text className="text-muted text-[10px] mb-1 ml-1">Şehir *</Text>
            <Controller
              control={control} name="city"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput className={`bg-cream border-[0.5px] ${errors.city ? 'border-terracotta' : 'border-line'} rounded-xl px-4 py-3 text-ink text-sm`} placeholder="Örn: Bolu" placeholderTextColor={colors.muted} onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
            />
            {errors.city && <Text className="text-terracotta text-[10px] mt-1 ml-1">{errors.city.message}</Text>}
          </View>

          <View className="flex-1">
            <Text className="text-muted text-[10px] mb-1 ml-1">Bölge *</Text>
            <Controller
              control={control} name="region"
              render={({ field: { value } }) => (
                <AnimatedPressable 
                  onPress={() => setActivePicker('region')} // Tıklanınca Region modalını aç
                  className={`bg-cream border-[0.5px] ${errors.region ? 'border-terracotta' : 'border-line'} rounded-xl px-4 py-3 flex-row items-center justify-between`}
                >
                  <Text className={value ? "text-ink text-sm" : "text-muted text-sm"} numberOfLines={1}>
                    {value || "Seçiniz"}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color={colors.muted} />
                </AnimatedPressable>
              )}
            />
             {errors.region && <Text className="text-terracotta text-[10px] mt-1 ml-1">{errors.region.message}</Text>}
          </View>
        </View>

        {/* Kategori */}
        <View className="mb-4">
          <Text className="text-muted text-[10px] mb-1 ml-1">Kategori *</Text>
          <Controller
            control={control} name="category"
            render={({ field: { value } }) => (
              <AnimatedPressable 
                onPress={() => setActivePicker('category')} // Tıklanınca Category modalını aç
                className={`bg-cream border-[0.5px] ${errors.category ? 'border-terracotta' : 'border-line'} rounded-xl px-4 py-3 flex-row items-center justify-between`}
              >
                <Text className={value ? "text-ink text-sm" : "text-muted text-sm"}>
                  {value || "Kategori Seçiniz (Dağ, Göl vb.)"}
                </Text>
                <Ionicons name="chevron-down" size={16} color={colors.muted} />
              </AnimatedPressable>
            )}
          />
          {errors.category && <Text className="text-terracotta text-[10px] mt-1 ml-1">{errors.category.message}</Text>}
        </View>

        {/* Açıklama */}
        <View className="mb-5">
          <Text className="text-muted text-[10px] mb-1 ml-1">Açıklama *</Text>
          <Controller
            control={control} name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput className={`bg-cream border-[0.5px] ${errors.description ? 'border-terracotta' : 'border-line'} rounded-xl px-4 py-3 text-ink text-sm`} placeholder="Bu mekanın neyi meşhur?" placeholderTextColor={colors.muted} multiline textAlignVertical="top" onBlur={onBlur} onChangeText={onChange} value={value} style={{ minHeight: 100 }} />
            )}
          />
          {errors.description && <Text className="text-terracotta text-[10px] mt-1 ml-1">{errors.description.message}</Text>}
        </View>

        {/* Fotoğraf Alanı */}
        <View className="flex-row gap-3 mb-8">
          <AnimatedPressable onPress={pickImage} className="flex-1 border-[1.5px] border-dashed border-line rounded-xl py-6 items-center justify-center bg-cream">
            <Text className="text-terracotta text-2xl mb-1">＋</Text>
            <Text className="text-muted text-[10px]">Fotoğraf Seç</Text>
          </AnimatedPressable>
          {selectedImage ? (
            <View className="flex-1 rounded-xl overflow-hidden border-[0.5px] border-line">
              <Image source={{ uri: selectedImage }} className="w-full h-full" resizeMode="cover" />
              <AnimatedPressable onPress={() => setSelectedImage(null)} className="absolute top-2 right-2 w-6 h-6 bg-midnight/70 rounded-full items-center justify-center">
                <Ionicons name="close" size={14} color={colors.paper} />
              </AnimatedPressable>
            </View>
          ) : (
            <View className="flex-1 rounded-xl bg-paperWarm border-[0.5px] border-line items-center justify-center">
              <Ionicons name="image-outline" size={24} color={colors.line} />
            </View>
          )}
        </View>

        {/* Gönder Butonu */}
        <AnimatedPressable onPress={handleSubmit(onSubmit)} disabled={isSubmitting} className={`py-4 rounded-xl items-center justify-center flex-row ${isSubmitting ? 'bg-terracotta/70' : 'bg-terracotta'}`}>
          {isSubmitting ? <ActivityIndicator size="small" color={colors.paper} className="mr-2" /> : null}
          <Text className="text-paper text-sm font-medium">{isSubmitting ? 'Gönderiliyor...' : 'Gönder'}</Text>
        </AnimatedPressable>
      </ScrollView>

      {/* SEÇİM (PICKER) MODALI */}
      <Modal visible={activePicker !== null} transparent={true} animationType="slide">
        <View className="flex-1 justify-end bg-ink/50">
          <TouchableOpacity className="flex-1" onPress={() => setActivePicker(null)} />
          
          <View className="bg-paper rounded-t-3xl pt-2 pb-8 max-h-[70%]">
            <View className="w-12 h-1.5 bg-line rounded-full self-center mb-4 mt-2" />
            
            <View className="px-5 pb-3 border-b-[0.5px] border-line flex-row justify-between items-center">
              <Text className="text-ink text-lg font-medium">
                {activePicker === 'region' ? 'Bölge Seçin' : 'Kategori Seçin'}
              </Text>
              <TouchableOpacity onPress={() => setActivePicker(null)}>
                <Text className="text-muted font-medium">Kapat</Text>
              </TouchableOpacity>
            </View>

            <ScrollView className="px-5 pt-2" showsVerticalScrollIndicator={false}>
              {(activePicker === 'region' ? REGIONS : CATEGORIES).map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  onPress={() => handleSelectOption(item)}
                  className="py-4 border-b-[0.5px] border-line border-opacity-30"
                >
                  <Text className="text-ink text-base">{item}</Text>
                </TouchableOpacity>
              ))}
              <View className="h-20" />
            </ScrollView>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}