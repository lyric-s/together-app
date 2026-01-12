/**
 * @file _layout.tsx (GUEST)
 * @description Specific layout for the GUEST area (Web & Mobile).
 */

import { Href, Redirect, Stack, router } from 'expo-router';
import { Platform, View, ActivityIndicator } from 'react-native';
import BottomNavBar from '@/components/MobileNavigationBar';
import Sidebar from '@/components/SideBar';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/colors';

/**
 * Layout component for the guest area that adapts presentation for web and mobile.
 *
 * When authentication is loading, renders a centered loading indicator. Once loaded,
 * renders the guest UI: on web it displays a sidebar (with guest user info) alongside
 * the main content stack; on mobile it displays the main content stack with a bottom
 * navigation bar.
 *
 * @returns A React element representing the guest layout, including loading state,
 *          a Stack with "home/index" and "search/index" screens, an optional Sidebar
 *          on web, and an optional BottomNavBar on mobile.
 */
export default function GuestLayout() {
  const { user, isLoading } = useAuth();
  const isWeb = Platform.OS === 'web';
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.orange} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, flexDirection: isWeb ? 'row' : 'column' }}>
      {isWeb && (
        <Sidebar 
          userType="volunteer_guest" 
          userName={user?.username || 'Invité'} 
          onNavigate={(route) => {
             router.push(route as Href);
          }} 
        />
      )}

      <View style={{ flex: 1 }}>
        <Stack screenOptions={{
          headerShown: false,
          animation: 'fade', 
          animationDuration: 200,
        }}>
          <Stack.Screen name="home/index" />
          <Stack.Screen name="search/index" />
          <Stack.Screen name="search/mission/[id]" />
          <Stack.Screen name="search/association/[id]" />
          <Stack.Screen name="library/index" />
          <Stack.Screen name="profile/index" />
        </Stack>
      </View>

      {!isWeb && (
        <BottomNavBar />
      )}
      
    </View>
  );
}