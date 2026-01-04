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
 * Root-level layout component that provides safe-area handling, theme selection, and the app navigation stack; it also conditionally shows a bottom navigation bar on mobile devices.
 *
 * The bottom navigation bar is hidden for the routes `/login`, `/signup`, and `/ProfilAssos`.
 *
 * @returns A React element containing the SafeAreaProvider, ThemeProvider (selected from the current color scheme), the navigation Stack, and the BottomNavBar when running on iOS/Android and the current route allows it.
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const { width } = useWindowDimensions();

  // Routes where the navbar should be hidden
  const hideNavbarRoutes = ['/login', '/signup', '/ProfilAssos'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(pathname);
  
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