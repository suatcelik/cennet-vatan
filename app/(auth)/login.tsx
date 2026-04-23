
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { supabase } from '../../lib/supabase';

export default function LoginScreen() {
    const router = useRouter(); // Yönlendirme motorunu başlatıyoruz
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleLogin = async () => {
      if (!email || !password) {
        Alert.alert('Hata', 'Lütfen e-posta ve şifrenizi girin.');
        return;
      }
  
      setIsLoading(true);
      // data nesnesini de (oturum bilgilerini) hatanın yanına ekliyoruz
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setIsLoading(false);
  
      if (error) {
        Alert.alert('Giriş Başarısız', error.message);
      } else if (data.session) {
        // İŞTE EKSİK OLAN PARÇA BURASI: Giriş başarılıysa Ana Sekmelere gönder!
        router.replace('/(tabs)');
      }
    };

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
          
          <View className="items-center mb-10">
            {/* Logo Placeholder */}
            <View className="w-16 h-16 border-2 border-terracotta rounded-full items-center justify-center mb-4">
              <Text className="text-2xl">🌙</Text>
            </View>
            <Text className="text-2xl font-outfit font-medium text-ink mb-1">Hoş geldin</Text>
            <Text className="text-xs text-muted">Keşfe devam etmek için giriş yap</Text>
          </View>

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
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View className="items-end mb-6">
            <Text className="text-xs text-muted font-medium py-2">Şifremi unuttum</Text>
          </View>

          <Button 
            title="Giriş Yap" 
            onPress={handleLogin} 
            isLoading={isLoading} 
            className="mb-8"
          />

          {/* Social Login Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-[0.5px] bg-line" />
            <Text className="mx-4 text-[10px] text-muted">veya</Text>
            <View className="flex-1 h-[0.5px] bg-line" />
          </View>

          <View className="flex-row gap-4 mb-8">
            <Button variant="outline" title="G Google" className="flex-1" />
            <Button variant="outline" title=" Apple" className="flex-1" />
          </View>

          <View className="flex-row justify-center mt-auto">
            <Text className="text-xs text-muted">Hesabın yok mu? </Text>
            <Link href="/(auth)/register" asChild>
              <Text className="text-xs text-terracotta font-medium">Kayıt Ol</Text>
            </Link>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}