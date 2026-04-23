import * as Haptics from 'expo-haptics';
import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { colors } from '../../constants/colors';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ 
  value, 
  onValueChange, 
  disabled = false 
}) => {
  // Animasyon değeri: 0 (kapalı) -> 1 (açık)
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(value ? 1 : 0, {
      mass: 1,
      damping: 15,
      stiffness: 120,
      overshootClamping: false,
    });
  }, [value]);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.line, colors.terracotta] // Kapalıyken gri, açıkken terracotta
    );
    return { backgroundColor };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateX = progress.value * 14; // İç topun hareket edeceği piksel
    return { transform: [{ translateX }] };
  });

  const handlePress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onValueChange(!value);
  };

  return (
    <Pressable onPress={handlePress} disabled={disabled} className="justify-center">
      <Animated.View
        style={[trackAnimatedStyle]}
        className={`w-8 h-4 rounded-full justify-center px-[2px] ${disabled ? 'opacity-50' : 'opacity-100'}`}
      >
        <Animated.View
          style={[thumbAnimatedStyle]}
          className="w-3 h-3 bg-paper rounded-full shadow-sm"
        />
      </Animated.View>
    </Pressable>
  );
};