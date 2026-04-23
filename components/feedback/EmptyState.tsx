import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <View className={`flex-1 items-center justify-center p-6 ${className}`}>
      {/* İleride buraya Lottie bileşenini entegre edeceğiz */}
      <View className="w-20 h-20 bg-paperWarm rounded-2xl items-center justify-center mb-6">
        {icon || <Text className="text-3xl">🏜️</Text>}
      </View>
      
      <Text className="text-lg font-outfit font-medium text-ink text-center mb-2">
        {title}
      </Text>
      
      <Text className="text-xs text-muted text-center leading-5 mb-6 px-4">
        {description}
      </Text>
      
      {actionLabel && onAction && (
        <Button 
          variant="outline" 
          title={actionLabel} 
          onPress={onAction} 
          className="min-w-[120px]"
        />
      )}
    </View>
  );
};