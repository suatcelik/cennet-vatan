import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../components/ui/AnimatedPressable';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { Input } from '../../components/ui/Input';
import { colors } from '../../constants/colors';
import { useSearch } from '../../hooks/useSearch';

export default function SearchScreen() {
  const [inputText, setInputText] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Kullanıcı yazmayı bıraktıktan 500ms sonra arama tetiklenir (Debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputText.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [inputText]);

  // Supabase'den verileri çeken hook
  const { data: results, isLoading, isFetching } = useSearch(debouncedQuery);

  // Örnek hızlı aramalar için fonksiyon
  const handleQuickSearch = (term: string) => {
    setInputText(term);
    setDebouncedQuery(term);
  };

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={['top', 'left', 'right']}>
      <View className="flex-1 px-5 pt-4">
        <Text className="text-ink text-xl font-outfit font-medium mb-4">Ara</Text>
        
        {/* Arama Inputu */}
        <Input 
          placeholder="Örn: Kapadokya, Efes, İzmir..."
          value={inputText}
          onChangeText={setInputText}
          leftIcon={<Text className="text-muted text-lg">⌕</Text>}
          rightIcon={
            inputText.length > 0 ? (
              <Pressable onPress={() => { setInputText(''); setDebouncedQuery(''); }}>
                <Text className="text-muted text-sm">✕</Text>
              </Pressable>
            ) : null
          }
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          
          {/* Arama Yapılmıyorsa Önerileri Göster */}
          {debouncedQuery.length < 2 && (
            <View>
              <Text className="text-muted text-[10px] tracking-widest mb-3 mt-4">HIZLI ARAMALAR</Text>
              <View className="flex-row gap-2 flex-wrap mb-6">
                <Pressable onPress={() => handleQuickSearch('Dağ')}>
                  <Chip label="Dağ" />
                </Pressable>
                <Pressable onPress={() => handleQuickSearch('Antik')}>
                  <Chip label="Antik" />
                </Pressable>
                <Pressable onPress={() => handleQuickSearch('İzmir')}>
                  <Chip label="İzmir" />
                </Pressable>
              </View>
            </View>
          )}

          {/* Yükleniyor Göstergesi */}
          {(isLoading || isFetching) && debouncedQuery.length >= 2 && (
            <View className="mt-10 items-center">
              <ActivityIndicator color={colors.terracotta} />
            </View>
          )}

          {/* Sonuçlar */}
          {!isLoading && !isFetching && debouncedQuery.length >= 2 && (
            <View>
              <Text className="text-muted text-[10px] tracking-widest mb-3 mt-4">
                SONUÇLAR ({results?.length || 0})
              </Text>
              
              {results?.length === 0 ? (
                <View className="items-center py-10">
                  <Text className="text-muted font-outfit text-center">
                    "{debouncedQuery}" için bir sonuç bulunamadı.
                  </Text>
                </View>
              ) : (
                <View className="flex-col gap-3">
                  {results?.map((location) => (
                    <Link key={location.id} href={`/location/${location.id}`} asChild>
                      <AnimatedPressable>
                        <Card className="flex-row p-2 rounded-xl">
                          <View 
                            className="w-14 h-14 rounded-lg mr-3" 
                            style={{ backgroundColor: location.categories?.color || colors.terracottaDeep }} 
                          />
                          <View className="flex-1 justify-center">
                            <Text className="text-ink text-[13px] font-medium">{location.name_tr}</Text>
                            <Text className="text-muted text-[10px] mb-1">
                              {location.city} • {location.categories?.name_tr || 'Genel'}
                            </Text>
                            <View className="self-start bg-saffron px-2 py-0.5 rounded">
                              <Text className="text-ink text-[9px] font-medium">★ {location.rating || '0.0'}</Text>
                            </View>
                          </View>
                        </Card>
                      </AnimatedPressable>
                    </Link>
                  ))}
                </View>
              )}
            </View>
          )}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}