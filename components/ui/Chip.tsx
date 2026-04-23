import React from 'react';
import { Text } from 'react-native';
import { AnimatedPressable } from './AnimatedPressable';

interface ChipProps {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({ 
  label, 
  isActive = false, 
  onPress, 
  className = '' 
}) => {
  const baseContainer = "px-[10px] py-[4px] rounded-full flex-row items-center justify-center";
  const activeContainer = "bg-midnight";
  const inactiveContainer = "bg-cream border-[0.5px] border-line";

  const baseText = "text-[10px] font-medium";
  const activeText = "text-paper";
  const inactiveText = "text-ink";

  return (
    <AnimatedPressable
      onPress={onPress}
      haptic={true}
      scaleValue={0.95}
      className={`${baseContainer} ${isActive ? activeContainer : inactiveContainer} ${className}`}
    >
      <Text className={`${baseText} ${isActive ? activeText : inactiveText}`}>
        {label}
      </Text>
    </AnimatedPressable>
  );
};