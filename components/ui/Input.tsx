import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../../constants/colors';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Border rengini duruma göre belirliyoruz
  const borderColor = error ? 'border-terracotta' : isFocused ? 'border-midnight' : 'border-line';
  const bgColor = isFocused ? 'bg-paper' : 'bg-cream';

  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-[11px] font-medium text-ink mb-1.5 ml-1">
          {label}
        </Text>
      )}
      
      <View 
        className={`flex-row items-center min-h-[48px] px-3 rounded-xl border-[0.5px] ${borderColor} ${bgColor}`}
      >
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        
        <TextInput
          className="flex-1 text-[13px] text-ink font-inter py-3"
          placeholderTextColor={colors.muted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        
        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </View>

      {error && (
        <Text className="text-[10px] text-terracotta mt-1 ml-1 font-medium">
          {error}
        </Text>
      )}
    </View>
  );
};