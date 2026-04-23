import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'flat';
}

export const Card: React.FC<CardProps> = ({
  variant = 'flat',
  className = '',
  children,
  ...rest
}) => {
  const baseClasses = "rounded-[10px] p-2";
  
  const variantClasses = {
    // Mockup'taki standart çerçeveli kartlar
    flat: "bg-cream border-[0.5px] border-line",
    // Gölgeli ve ana arka plana sahip kartlar (Android elevation dahil)
    elevated: "bg-paper shadow-sm shadow-ink/10 elevation-2", 
  };

  return (
    <View className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...rest}>
      {children}
    </View>
  );
};