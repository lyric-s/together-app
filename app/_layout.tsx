/**
 * @file _layout.tsx
 * @description Root layout component that wraps the entire application.
 *
 * This file defines the root navigation structure using Expo Router's Stack navigator.
 * It applies the appropriate theme (dark or light) based on the device's color scheme
 * and sets up the main navigation screens including splash, index, login, and register.
 *
 * All screens are configured without headers by default.
 */

import { Stack } from 'expo-router';
import { View } from 'react-native';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * RootLayout component that serves as the top-level layout wrapper.
 *
 * Provides theme context to all child components and configures the navigation stack
 * with the application's main screens. The theme automatically switches between
 * dark and light modes based on the device's color scheme preference.
 *
 * @returns {JSX.Element} The themed navigation stack with status bar configuration.
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='splash' />
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}