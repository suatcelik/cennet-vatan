import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Cennet Vatan',
  slug: 'cennet-vatan',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.arcodiba.cennetvatan'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#0f2438'
    },
    package: 'com.arcodiba.cennetvatan',
    edgeToEdgeEnabled: true 
  },
  plugins: [
    'expo-router',
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/Outfit-Regular.ttf',
          './assets/fonts/Inter-Regular.ttf',
          './assets/fonts/JetBrainsMono-Regular.ttf'
        ]
      }
    ]
  ],
  experiments: {
    typedRoutes: true
  }
});