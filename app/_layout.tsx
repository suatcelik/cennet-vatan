import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// TanStack Query & Persistence
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { clientPersister, queryClient } from '../lib/query-client';

// Global Styles & Localization
import '../global.css';
import '../lib/i18n';

// Fontlar ve varlıklar yüklenene kadar splash ekranını tut
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Outfit: require('../assets/fonts/Outfit-Regular.ttf'),
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
    Mono: require('../assets/fonts/JetBrainsMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: clientPersister }}
      >
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="location/[id]" options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name="contribute" />
          <Stack.Screen name="settings" />
        </Stack>
        <StatusBar style="auto" />
      </PersistQueryClientProvider>
    </GestureHandlerRootView>
  );
}