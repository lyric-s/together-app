import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Platform } from 'react-native';

/**
 * Root layout component that provides the app theme and navigation stack.
 *
 * Selects and applies the current color scheme theme, renders a navigation stack
 * containing the "index" and "modal" routes (with the modal presented modally),
 * hides screen headers globally, and renders the status bar.
 *
 * @returns The root React element that supplies theme and navigation for the app.
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isWeb = Platform.OS === 'web';

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );

}
