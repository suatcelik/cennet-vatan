import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { supabase } from '../../lib/supabase';

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !fullName) {
      Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurun.');
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    setIsLoading(false);

    if (error) {
      Alert.alert('Kayıt Başarısız', error.message);
    } else if (data.session) {
      // Çoğu durumda Supabase e-posta onayı ister (Email Confirmations açıksa).
      // Eğer kapalıysa direkt oturum açılır.
      Alert.alert('Başarılı', 'Aramıza hoş geldin!');
    } else {
      Alert.alert('Hesap Oluşturuldu', 'Lütfen e-posta adresinizi doğrulayın.');
      router.back();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          
          <View className="mt-4 mb-8">
            <Text className="text-2xl font-outfit font-medium text-ink mb-1">Aramıza Katıl</Text>
            <Text className="text-xs text-muted">Türkiye'nin güzelliklerini keşfetmeye başla.</Text>
          </View>

          <Input
            label="Ad Soyad"
            placeholder="Örn: Evliya Çelebi"
            autoCapitalize="words"
            value={fullName}
            onChangeText={setFullName}
          />

          <Input
            label="E-posta"
            placeholder="ornek@cennetvatan.app"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            label="Şifre"
            placeholder="En az 6 karakter"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button 
            title="Kayıt Ol" 
            onPress={handleRegister} 
            isLoading={isLoading} 
            className="mt-4 mb-8"
          />

          <View className="flex-row justify-center mt-auto">
            <Text className="text-xs text-muted">Zaten hesabın var mı? </Text>
            <Link href="/(auth)/login" asChild>
              <Text className="text-xs text-terracotta font-medium">Giriş Yap</Text>
            </Link>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}