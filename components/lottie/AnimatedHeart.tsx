import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';

interface Props {
  isFavorite: boolean;
}

export default function AnimatedHeart({ isFavorite }: Props) {
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (isFavorite) {
      lottieRef.current?.play(30, 90); // Kalbin dolma animasyonu kareleri
    } else {
      lottieRef.current?.play(0, 5); // Boş kalp karesi
    }
  }, [isFavorite]);

  return (
    <View className="w-10 h-10 items-center justify-center">
      <LottieView
        ref={lottieRef}
        source={require('../../assets/lottie/heart.json')}
        style={{ width: 40, height: 40 }}
        loop={false}
        autoPlay={false}
      />
    </View>
  );
}