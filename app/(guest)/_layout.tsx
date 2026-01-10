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
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home/index" />
          <Stack.Screen name="search/index" />
        </Stack>
      </View>

      {!isWeb && (
        <BottomNavBar />
      )}
      
    </View>
  );
}