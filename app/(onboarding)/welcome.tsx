import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { storage } from '../../lib/storage';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleCompleteOnboarding = () => {
    // 1. Storage'a kullanıcının onboarding'i bitirdiğini yaz
    storage.set('onboarding_completed', true);
    
    // 2. Kullanıcıyı giriş ekranına yönlendir
    router.replace('/(auth)/login');
  };

  return (
    <View className="flex-1 bg-paper items-center justify-center p-5">
      <Text className="font-outfit text-ink text-2xl mb-8">Cennet Vatan'a Hoş Geldin</Text>
      
      <Button 
        title="Onboarding'i Geç -> Giriş Yap" 
        onPress={handleCompleteOnboarding} 
        className="w-full"
      />
    </View>
  );
}