import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const AnimatedPressableComponent = Animated.createAnimatedComponent(Pressable);

export interface AnimatedPressableProps extends PressableProps {
  haptic?: boolean;
  scaleValue?: number;
  className?: string;
}

export const AnimatedPressable: React.FC<AnimatedPressableProps> = ({
  children,
  haptic = true,
  scaleValue = 0.96,
  onPressIn,
  onPressOut,
  onPress,
  style,
  ...rest
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (e: any) => {
    scale.value = withSpring(scaleValue, { damping: 15, stiffness: 300 });
    if (haptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    onPressOut?.(e);
  };

  return (
    <AnimatedPressableComponent
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      // NativeWind className ve Reanimated style'ını birleştiriyoruz
      style={[animatedStyle, style]}
      {...rest}
    >
      {children}
    </AnimatedPressableComponent>
  );
};