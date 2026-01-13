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
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/context/AuthContext';
import { StatusBar, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

/**
 * Provide the app's root layout with theming, authentication context, and the primary navigation stack.
 *
 * The active theme follows the device color scheme; the navigation stack renders screens without headers
 * and the StatusBar adapts its style and background to the selected theme.
 *
 * @returns The root JSX element containing SafeAreaView, ThemeProvider, AuthProvider, the navigation Stack (including the `index` screen), and a StatusBar
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? Colors.black : Colors.white;

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: Colors.black,
      card: Colors.black,
    },
  };

  const customLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.white,
      card: Colors.white,
    },
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['top', 'bottom']}>
      <ThemeProvider value={colorScheme === 'dark' ? customDarkTheme : customLightTheme}>
        <AuthProvider>
          <Stack 
            screenOptions={{ 
              headerShown: false, 
              contentStyle: { backgroundColor }, 
              animation: 'fade',
              animationDuration: 200,
            }}
          >
            <Stack.Screen name="index" />
          </Stack>
          <StatusBar 
            barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
            backgroundColor={backgroundColor}
          />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});