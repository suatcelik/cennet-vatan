import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { colors } from '../../constants/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.saffron,
        tabBarInactiveTintColor: 'rgba(243,234,215,0.5)', // paper renginin %50 saydamı
        tabBarStyle: {
          backgroundColor: colors.midnight,
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
          height: 60,
          borderRadius: 20,
          paddingBottom: 0, // iOS için alt boşluğu sıfırla
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center pt-2">
              <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
              {focused && <View className="w-1 h-1 bg-saffron rounded-full mt-1" />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center pt-2">
              <Ionicons name={focused ? "search" : "search-outline"} size={24} color={color} />
              {focused && <View className="w-1 h-1 bg-saffron rounded-full mt-1" />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center pt-2">
              <Ionicons name={focused ? "heart" : "heart-outline"} size={24} color={color} />
              {focused && <View className="w-1 h-1 bg-saffron rounded-full mt-1" />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center pt-2">
              <Ionicons name={focused ? "person" : "person-outline"} size={22} color={color} />
              {focused && <View className="w-1 h-1 bg-saffron rounded-full mt-1" />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}