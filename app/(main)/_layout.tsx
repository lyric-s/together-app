/**
 * @file _layout.tsx
 * @description Root layout component that wraps the entire application.
 *
 * This file defines the root navigation structure using Expo Router's Stack navigator.
 * It applies the appropriate theme (dark or light) based on the device's color scheme,
 * configures a modal screen, and conditionally renders a bottom navigation bar on mobile platforms.
 * 
 * All screens are configured without headers by default. * All screens are configured without headers by default.
 */

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { Platform, View, useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomNavBar from '@/components/MobileNavigationBar';
import { StatusBar } from 'expo-status-bar';
import { usePathname } from 'expo-router';
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

  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>

        {isMobile && (
              <BottomNavBar />
          )}
        </View>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}