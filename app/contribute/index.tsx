import { Ionicons } from '@expo/vector-icons';
import { decode } from 'base64-arraybuffer';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable } from '../../components/ui/AnimatedPressable';
import { Chip } from '../../components/ui/Chip';
import { Input } from '../../components/ui/Input';
import { colors } from '../../constants/colors';
import { useCategories } from '../../hooks/useCategories';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/auth-store';

// Bölge Tipi
interface RegionType {
  id: string;
  name_tr: string;
}

export default function ContributeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  
  // Kategorileri Hook'umuzdan çekiyoruz
  const { data: categories } = useCategories();
  
  // Bölgeler için State
  const [regions, setRegions] = useState<RegionType[]>([]);

  // Form State'leri
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageObj, setImageObj] = useState<ImagePicker.ImagePickerAsset | null>(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sayfa yüklendiğinde bölgeleri Supabase'den çek
  useEffect(() => {
    const fetchRegions = async () => {
      const { data } = await supabase.from('regions').select('id, name_tr').order('name_tr');
      if (data) setRegions(data);
    };
    fetchRegions();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5, 
      base64: true, 
    });

    if (!result.canceled) {
      setImageObj(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    // Eksik alan kontrolüne bölge ve kategoriyi de ekledik
    if (!name || !city || !selectedRegion || !selectedCategory || !description || !imageObj) {
      Alert.alert('Eksik Bilgi', 'Lütfen bölge, kategori ve fotoğraf dahil tüm alanları doldurun.');
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;

      if (imageObj.base64) {
        const filePath = `${user?.id}/${Date.now()}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from('location-images')
          .upload(filePath, decode(imageObj.base64), {
            contentType: 'image/jpeg',
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('location-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const { error: dbError } = await supabase
        .from('locations')
        .insert({
          name_tr: name,
          city: city,
          region_id: selectedRegion,
          category_id: selectedCategory,
          description_tr: description,
          cover_image: imageUrl, 
          approval_status: 'pending',
        });

      if (dbError) throw dbError;

      Alert.alert('Teşekkürler!', 'Önerin başarıyla alındı ve onay sürecine girdi.', [
        { text: 'Tamam', onPress: () => router.back() }
      ]);
      
    } catch (error: any) {
      Alert.alert('Hata', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={['top', 'bottom']}>
      <View className="flex-row items-center px-5 py-4 border-b-[0.5px] border-line">
        <AnimatedPressable onPress={() => router.back()} className="mr-4 w-8 h-8 justify-center">
          <Ionicons name="arrow-back" size={24} color={colors.ink} />
        </AnimatedPressable>
        <Text className="text-ink text-lg font-outfit font-medium">Yeni Yer Öner</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5 pt-6">
        <Text className="text-muted text-sm mb-6">
          Keşfettiğin o gizli cenneti bizimle paylaş! Ekibin incelemesinden sonra haritada yerini alacak.
        </Text>

        <AnimatedPressable 
          onPress={pickImage}
          className="w-full h-48 bg-cream border border-dashed border-line rounded-2xl items-center justify-center mb-6 overflow-hidden"
        >
          {imageObj ? (
            <Image source={{ uri: imageObj.uri }} className="w-full h-full" resizeMode="cover" />
          ) : (
            <>
              <View className="w-12 h-12 rounded-full bg-saffron/20 items-center justify-center mb-2">
                <Ionicons name="camera" size={24} color={colors.saffron} />
              </View>
              <Text className="text-ink text-sm font-medium">Fotoğraf Ekle</Text>
            </>
          )}
        </AnimatedPressable>

        <View className="mb-4">
          <Text className="text-ink text-xs font-medium mb-2 ml-1">Mekanın Adı</Text>
          <Input placeholder="Örn: Salda Gölü" value={name} onChangeText={setName} />
        </View>

        <View className="mb-4">
          <Text className="text-ink text-xs font-medium mb-2 ml-1">Şehir</Text>
          <Input placeholder="Örn: Burdur" value={city} onChangeText={setCity} />
        </View>

        {/* YENİ EKLENEN: Bölge Seçimi */}
        <View className="mb-4">
          <Text className="text-ink text-xs font-medium mb-2 ml-1">Bölge</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible">
            <View className="flex-row gap-2 pb-2">
              {regions.map((region) => (
                <Pressable key={region.id} onPress={() => setSelectedRegion(region.id)}>
                  <Chip 
                    label={region.name_tr} 
                    isActive={selectedRegion === region.id} 
                  />
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* YENİ EKLENEN: Kategori Seçimi */}
        <View className="mb-4">
          <Text className="text-ink text-xs font-medium mb-2 ml-1">Kategori</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible">
            <View className="flex-row gap-2 pb-2">
              {categories?.map((cat) => (
                <Pressable key={cat.id} onPress={() => setSelectedCategory(cat.id)}>
                  <Chip 
                    label={cat.name_tr} 
                    isActive={selectedCategory === cat.id} 
                  />
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        <View className="mb-8 mt-2">
          <Text className="text-ink text-xs font-medium mb-2 ml-1">Açıklama & Neden Gitmeliyiz?</Text>
          <Input 
            placeholder="Mekanın özelliklerinden kısaca bahset..." 
            value={description} 
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            className="h-28 items-start py-3" 
          />
        </View>

        <AnimatedPressable 
          onPress={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl items-center justify-center mb-10 ${isSubmitting ? 'bg-terracotta/50' : 'bg-terracotta'}`}
        >
          <Text className="text-paper font-outfit text-lg font-medium">
            {isSubmitting ? 'Gönderiliyor...' : 'Öneriyi Gönder'}
          </Text>
        </AnimatedPressable>
      </ScrollView>
    </SafeAreaView>
  );
}