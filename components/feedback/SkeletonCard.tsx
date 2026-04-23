import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';

export const SkeletonCard = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="bg-cream border-[0.5px] border-line rounded-xl p-3 mb-4 flex-row">
      <Animated.View 
        style={[animatedStyle]} 
        className="w-16 h-16 bg-line rounded-lg mr-3" 
      />
      <View className="flex-1 justify-center">
        <Animated.View 
          style={[animatedStyle]} 
          className="w-3/4 h-3 bg-line rounded mb-2" 
        />
        <Animated.View 
          style={[animatedStyle]} 
          className="w-1/2 h-2 bg-line rounded" 
        />
      </View>
    </View>
  );
};