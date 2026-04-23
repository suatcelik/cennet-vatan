import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { AnimatedPressable, AnimatedPressableProps } from './AnimatedPressable';

interface ButtonProps extends AnimatedPressableProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  title: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  title,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...rest
}) => {
  const baseClasses = "flex-row items-center justify-center rounded-xl";
  
  const variantClasses = {
    primary: "bg-terracotta active:bg-terracottaDeep",
    secondary: "bg-midnight active:bg-aegean",
    outline: "bg-transparent border border-line",
    ghost: "bg-transparent active:bg-paperWarm",
  };

  const sizeClasses = {
    sm: "px-3 py-2 min-h-[36px]",
    md: "px-5 py-3 min-h-[48px]",
    lg: "px-8 py-4 min-h-[56px]",
  };

  const textClasses = {
    primary: "text-paper font-medium",
    secondary: "text-paper font-medium",
    outline: "text-ink font-medium",
    ghost: "text-terracotta font-medium",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-[13px]", // Tasarımdaki standart form butonu metin boyutu
    lg: "text-base",
  };

  const opacityClass = disabled || isLoading ? "opacity-50" : "opacity-100";
  const indicatorColor = variant === 'outline' || variant === 'ghost' ? '#c55a2e' : '#f3ead7';

  return (
    <AnimatedPressable
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${opacityClass} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <>
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <Text className={`${textClasses[variant]} ${textSizeClasses[size]}`}>
            {title}
          </Text>
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </>
      )}
    </AnimatedPressable>
  );
};