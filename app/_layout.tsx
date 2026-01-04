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
 * Provides the app's root layout: theme and safe-area wrappers, a stack navigator for the main and modal screens, and a mobile bottom navigation bar shown conditionally.
 *
 * The layout applies DarkTheme when the system color scheme is dark and DefaultTheme otherwise, wraps content with SafeAreaProvider, and renders a Stack navigator with "index" and "modal" screens (modal presented). It displays the BottomNavBar only on iOS/Android devices and only when the current pathname does not start with `/login`, `/signup`, or `/ProfilAssos`. The StatusBar is rendered with automatic styling.
 *
 * @returns The root JSX element containing theme provider, navigation stack, optional bottom navigation, and status bar.
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const { width } = useWindowDimensions();

  // Routes where the navbar should be hidden
  const hideNavbarRoutes = ['/login', '/signup', '/ProfilAssos'];
  const shouldShowNavbar = !hideNavbarRoutes.some(route => pathname.startsWith(route));
  
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>

        {shouldShowNavbar && isMobile && (
              <BottomNavBar />
          )}
        </View>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );

}