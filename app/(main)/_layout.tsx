/**
 * @file _layout.tsx
 * @description Root layout component that wraps the entire application.
 *
 * This file defines the root navigation structure using Expo Router's Stack navigator.
 * It applies the appropriate theme (dark or light) based on the device's color scheme,
 * configures a modal screen, and conditionally renders a bottom navigation bar on mobile platforms.
 * 
 * All screens are configured without headers by default.
 */

import { Stack } from 'expo-router';
import { Platform, View } from 'react-native';
import BottomNavBar from '@/components/MobileNavigationBar';


/**
 * Root layout that renders the app's navigation stack and, on mobile devices, the bottom navigation bar.
 *
 * The stack is configured with headers hidden and includes a modal screen named "modal" presented modally.
 *
 * @returns The root JSX element containing the configured `Stack` and the `BottomNavBar` when running on iOS or Android.
 */
export default function RootLayout() {

  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  return (
    <View style={{ flex: 1 }}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    </Stack>

    {isMobile && (
      <BottomNavBar />
    )}
    </View>
  );
}