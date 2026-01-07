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

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Provides the app's root layout: applies a theme based on the device color scheme and renders the navigation stack without headers.
 *
 * The component wraps content with safe-area handling and a ThemeProvider, then renders the app's main Stack screens and a status bar.
 *
 * @returns The root layout element containing theme provider, navigation stack, and status bar.
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='splash' />
          <Stack.Screen name="index" />
        </Stack>
        </View>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}