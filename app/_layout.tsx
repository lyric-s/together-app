import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

/**
 * Provides the app's root navigation layout, applying the current color scheme and mounting global UI elements.
 *
 * Renders a themed navigation stack with the main "(tabs)" screen and a "modal" screen, and includes a toast container and status bar.
 *
 * @returns A React element containing the themed navigation stack, a Toast container, and the StatusBar
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <Toast />
      <StatusBar style="auto" />
    </ThemeProvider>
  );

}