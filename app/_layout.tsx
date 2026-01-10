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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/context/AuthContext';
import { StatusBar } from 'react-native'
import { Colors } from '@/constants/colors';
/**
 * Root layout component that provides theming, authentication context, and the primary navigation stack.
 *
 * The theme switches between dark and light based on the device color scheme. All screens in the stack
 * are rendered without headers and the layout includes a StatusBar configured with automatic style.
 *
 * @returns The root JSX element composing SafeAreaProvider, ThemeProvider, AuthProvider, the navigation Stack
 *          (containing the `index` screen with headers hidden), and a StatusBar.
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.white }, animation: 'fade'}}>
                <Stack.Screen name="index" />
            </Stack>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}