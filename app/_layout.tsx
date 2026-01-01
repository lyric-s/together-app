import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomNavBar from '@/components/MobileNavigationBar';
import { StatusBar } from 'expo-status-bar';
import { usePathname } from 'expo-router';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const { width } = useWindowDimensions();

  // Routes where the navbar should be hidden
  const hideNavbarRoutes = ['/login', '/signup', '/ProfilAssos'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(pathname);
  
  const isMobile = width < 768;

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>

        {shouldShowNavbar && isMobile && (
            <View>
              <BottomNavBar />
            </View>
          )}
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );

}
